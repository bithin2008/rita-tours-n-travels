import featuredTours from "../data/featured-tours.json";

const SITE_NAME = "RITA Tours N Travels";
const SITE_URL = process.env.NEXT_PUBLIC_BASE44_APP_BASE_URL || "https://rita-tours-n-travels.vercel.app";
const SUPPORT_EMAIL = "noreply.ritatravel@gmail.com";
const HERO_IMAGE = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80";
const LOGO_IMAGE = "https://media.base44.com/images/public/6aec6c41ac98455faf00216e/c90b0b8bb_logo.png";

export function enquiryNotificationTemplate({ name, email, topic, message, language, currency }) {
  return `
    <!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>New Enquiry - ${SITE_NAME}</title></head>
    <body style="margin:0;padding:0;background-color:#eef3fa;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#eef3fa;"><tbody><tr><td align="center" style="padding:30px 12px 40px 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:22px;overflow:hidden;">
          <tbody>
            <tr><td style="height:5px;background-color:#1f69ff;font-size:0;line-height:0;">&nbsp;</td></tr>
            <tr><td style="padding:22px 34px;border-bottom:1px solid #edf2f9;"><div style="font-family:Poppins,Segoe UI,Arial,sans-serif;font-size:16.5px;font-weight:700;color:#0a1f44;">${SITE_NAME}</div></td></tr>
            <tr><td style="padding:32px 34px 0 34px;">
              <div style="font-family:Poppins,Segoe UI,Arial,sans-serif;font-size:24px;font-weight:700;color:#0a1f44;">New enquiry</div>
              <div style="font-family:Inter,Helvetica,Arial,sans-serif;font-size:14px;line-height:24px;color:#3f5578;padding-top:12px;"><strong>${name}</strong> (${email})<br>Topic: ${topic}<br>Language: ${language || "en"} · Currency: ${currency || "EUR"}</div>
              <div style="font-family:Inter,Helvetica,Arial,sans-serif;font-size:14px;line-height:24px;color:#3f5578;padding-top:12px;white-space:pre-wrap;">${message}</div>
            </td></tr>
          </tbody>
        </table>
      </td></tr></tbody></table>
    </body></html>
  `;
}

export function autoReplyTemplate({ name, topic, first_name, tour_title, destination, message, hero_image }) {
  const fn = first_name || (name ? name.split(" ")[0] : "there");
  const title = tour_title || topic || "your enquiry";
  const dest = destination || topic || "";
  const hero = hero_image || HERO_IMAGE;
  const msg = (message || "").replace(/\n/g, "<br>");
  const tours = (featuredTours.items || []).slice(0, 3);
  const cells = tours.map((t, i) => `<td class="card-col" valign="top" style="width:33.33%;${i < 2 ? " padding-right:10px;" : ""}">
    <a href="${SITE_URL}/tours/${t.id}" style="text-decoration:none; display:block;">
      <img class="card-img" src="${SITE_URL}${t.image}" width="172" height="118" alt="${t.title}" style="width:100%; max-width:172px; height:118px; border-radius:12px; object-fit:cover;">
      <div class="card-title" style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:12.5px; font-weight:600; color:#0a1f44; line-height:18px; padding-top:9px;">${t.title}</div>
      <div style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:10.5px; font-weight:600; color:#1f69ff; line-height:16px; padding-top:2px;">${t.durationLabel} · ${t.country}</div>
    </a>
  </td>`).join("");
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>RITA Tours N Travels - Enquiry Confirmation</title></head>
<body style="margin:0; padding:0; background-color:#eef3fa; width:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; background-color:#eef3fa;">
    <tbody><tr><td align="center" style="padding:30px 12px 40px 12px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px; background-color:#ffffff; border-radius:22px; overflow:hidden; box-shadow:0 28px 60px -34px rgba(10,31,68,0.5);">
        <tbody>
          <tr><td style="height:5px; background-color:#1f69ff; font-size:0; line-height:0;">&nbsp;</td></tr>
          <tr><td style="padding:22px 34px; border-bottom:1px solid #edf2f9;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tbody><tr>
              <td align="left" valign="middle" style="width:46px;"><img src="${LOGO_IMAGE}" width="40" height="40" alt="RITA Tours N Travels" style="width:40px; height:40px; border-radius:12px;"></td>
              <td align="left" valign="middle" style="padding-left:11px;">
                <div style="font-family:'Poppins','Segoe UI',Arial,sans-serif; font-size:16.5px; font-weight:700; color:#0a1f44;">RITA Tours N Travels</div>
                <div style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:9.5px; font-weight:700; color:#1f69ff; letter-spacing:2.1px; text-transform:uppercase; padding-top:4px;">Curated European Journeys</div>
              </td>
              <td align="right" valign="middle" style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:10.5px; color:#93a5c0; white-space:nowrap;">Since 2009</td>
            </tr></tbody></table>
          </td></tr>
          <tr><td style="padding:0; background-color:#0a1f44; line-height:0;"><img src="${hero}" width="600" height="252" alt="${dest}" style="width:100%; max-width:600px; height:252px; object-fit:cover;"></td></tr>
          <tr><td style="padding:32px 34px 0 34px;">
            <div style="font-family:'Poppins','Segoe UI',Arial,sans-serif; font-size:30px; line-height:37px; font-weight:700; color:#0a1f44; letter-spacing:-0.6px;">Message received</div>
            <div style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:15px; line-height:26px; color:#3f5578; padding-top:14px;">
              Hi <strong style="color:#0a1f44;">${fn}</strong>, thank you for reaching out to RITA Tours N Travels. We have your details and a named planner is reading them now. Expect a reply within one business day.
            </div>
          </td></tr>
          <tr><td style="padding:26px 34px 0 34px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; background-color:#f7fafd; border:1px solid #e6ecf6; border-radius:18px;">
              <tbody><tr>
                <td style="width:3px; background-color:#1f69ff; border-radius:18px 0 0 18px; font-size:0; line-height:0;">&nbsp;</td>
                <td style="padding:20px 22px;">
                  <div style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:9.5px; font-weight:700; letter-spacing:2.1px; text-transform:uppercase; color:#1f69ff; padding-bottom:8px;">Your enquiry</div>
                  <div style="font-family:'Poppins','Segoe UI',Arial,sans-serif; font-size:17px; line-height:23px; font-weight:600; color:#0a1f44;">${title}</div>
                  <div style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:12.5px; line-height:19px; color:#6b7f9e; padding-top:4px;">${dest}</div>
                  <div style="border-top:1px solid #e6ecf6; margin:16px 0 14px 0; font-size:0; line-height:0;">&nbsp;</div>
                  <div style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:13.5px; line-height:23px; color:#3f5578; word-break:break-word;">${msg}</div>
                </td>
              </tr></tbody></table>
          </td></tr>
          <tr><td style="padding:28px 34px 32px 34px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tbody><tr>
              <td align="left" bgcolor="#1f69ff" style="border-radius:26px; background-color:#1f69ff;">
                <a href="https://rita-journey-flow.base44.app/tours" style="display:inline-block; padding:15px 32px; font-family:'Inter',Helvetica,Arial,sans-serif; font-size:14px; font-weight:600; color:#ffffff; border-radius:26px;">Explore journeys</a>
              </td>
            </tr></tbody></table>
            <div style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:12.5px; line-height:20px; color:#6b7f9e; padding-top:14px;">Want to add dates or travellers? Simply reply to this email, we read every response.</div>
          </td></tr>
          <tr><td style="background-color:#f7fafd; border-top:1px solid #edf2f9; padding:26px 34px 24px 34px;">
            <div style="font-family:'Poppins','Segoe UI',Arial,sans-serif; font-size:15px; line-height:21px; font-weight:600; color:#0a1f44; padding-bottom:16px;">A few journeys our travellers love</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tbody><tr>
              ${cells}
            </tr></tbody></table>
          </td></tr>
            <tr>
            <td style="padding:26px 34px 30px 34px;" class="pad">
              <div class="body-text" style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:14px; line-height:23px; color:#3f5578;">
                Warm regards,<br>
                <strong style="color:#0a1f44;">The RITA Tour N Travels Team</strong>
              </div>
            </td>
          </tr>
          <tr><td style="background-color:#0a1f44; padding:26px 34px;">
            <div style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:11px; color:#8092b0; line-height:17px;">You are receiving this email because you submitted an enquiry on our website. Nothing has been booked or charged.</div>
          </td></tr>
        </tbody>
      </table>
      <div style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:10.5px; color:#8a9bb5; padding-top:18px; text-align:center;">Journeys designed by people who travel them.</div>
    </td></tr></tbody></table>
</body>
</html>`;
}
