import { createServerFn } from "@tanstack/react-start";

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