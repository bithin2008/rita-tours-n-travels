import nodemailer from "nodemailer";
import {
  autoReplyTemplate,
  enquiryNotificationTemplate,
  tourPlanningThankYouTemplate,
} from "@/lib/email-templates";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, topic, message, language, currency, journeyType, destination, source } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || smtpUser;

    if (!smtpUser || !smtpPass) {
      return new Response(JSON.stringify({ error: "SMTP not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const toEmail = process.env.CONTACT_EMAIL || smtpUser;

    // Email to the business (notification of new enquiry)
    await transporter.sendMail({
      from: `"RITA Contact" <${smtpFrom}>`,
      to: toEmail,
      subject: `New enquiry: ${topic}`,
      text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\nLanguage: ${language || "en"}\nCurrency: ${currency || "EUR"}\n\nMessage:\n${message}`,
      html: enquiryNotificationTemplate({
        name,
        email,
        topic,
        message,
        language,
        currency,
        destination,
        tour_type: journeyType,
        isTourPlanning: source === "tour-planning",
      }),
    });

    const customerEmail =
      source === "tour-planning"
        ? {
            subject: "Thank you for submitting your tour plan — RITA Tours N Travels",
            text: `Hi ${name},\n\nThank you for submitting your tour-planning form. A named planner will review your request and reply within one business day.\n\nYour trip details:\n${message}\n\nBest regards,\nThe RITA team`,
            html: tourPlanningThankYouTemplate({ name, topic, destination, message }),
          }
        : {
            subject: "We received your message — RITA Tours N Travels",
            text: `Hi ${name},\n\nThank you for reaching out to RITA Tours N Travels. We've received your enquiry about "${topic}" and will get back to you within one business day.\n\nBest regards,\nThe RITA team`,
            html: autoReplyTemplate({ name, topic, destination, message }),
          };

    await transporter.sendMail({
      from: `"RITA Tours N Travels" <${smtpFrom}>`,
      to: email,
      ...customerEmail,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Contact email error:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
