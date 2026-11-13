import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const BUSINESS_EMAIL = "hello@ritatoursandtravels.eu";

const CONTACT_TOPICS = [
  "New journey enquiry",
  "Existing booking",
  "Payments & invoices",
  "Visas & documents",
  "Press & partnerships",
];

const stripTags = (value) => value.replace(/[<>]/g, "");

export const getServerInfo = createServerFn({ method: "GET" }).handler(async () => ({
  renderedAt: new Date().toISOString(),
}));

export const listFaqs = createServerFn({ method: "GET" }).handler(async ({ context }) => {
  const page = await context
    .getBase44()
    .entities.Faq.filter({ published: true }, { sort: "sort_order", limit: 200 });
  return page.items;
});

export const listJobOpenings = createServerFn({ method: "GET" }).handler(async ({ context }) => {
  const page = await context
    .getBase44()
    .entities.JobOpening.filter({ published: true }, { sort: "-created_date", limit: 50 });
  return page.items;
});

// Confirmation to the visitor plus a copy of the enquiry to the team inbox.
export const sendContactEmails = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(1).max(80),
      email: z.string().email().max(160),
      topic: z.enum(CONTACT_TOPICS),
      message: z.string().min(1).max(2000),
      language: z.string().max(8).optional(),
      currency: z.string().max(8).optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const service = context.getBase44().asServiceRole;
    const name = stripTags(data.name).trim();
    const message = stripTags(data.message).trim();
    const topic = data.topic;

    const results = { visitor: "failed", team: "failed" };

    try {
      await service.integrations.Core.SendEmail({
        to: data.email,
        template_name: "EnquiryReceived",
        category: "transactional",
        variables: { first_name: name.split(" ")[0] || name, topic },
      });
      results.visitor = "sent";
    } catch {
      results.visitor = "failed";
    }

    try {
      const admins = await service.entities.User.list();
      const recipients = admins.filter((user) => user.role === "admin").map((user) => user.email);
      if (!recipients.includes(BUSINESS_EMAIL)) recipients.push(BUSINESS_EMAIL);

      const outcomes = await Promise.allSettled(
        recipients.map((to) =>
          service.integrations.Core.SendEmail({
            to,
            template_name: "EnquiryNotification",
            category: "transactional",
            variables: {
              name,
              email: data.email,
              topic,
              message,
              language: (data.language || "en").toUpperCase(),
              currency: data.currency || "EUR",
            },
          }),
        ),
      );
      results.team = outcomes.some((outcome) => outcome.status === "fulfilled") ? "sent" : "failed";
    } catch {
      results.team = "failed";
    }

    return results;
  });