import featuredTours from "../data/featured-tours.json";

const SITE_NAME = "RITA Tours N Travels";
const SITE_URL = process.env.NEXT_PUBLIC_BASE44_APP_BASE_URL || "https://rita-tours-n-travels.vercel.app";
const SUPPORT_EMAIL = "noreply.ritatravel@gmail.com";
const HERO_IMAGE = "https://rita-tours-n-travels.vercel.app/images/email-template/banner-01.jpg";
const LOGO_IMAGE = "https://rita-tours-n-travels.vercel.app/images/logo.jpg";


export function enquiryNotificationTemplate({ name, email, topic, message, language, currency, tour_title, destination, hero_image, tour_type }) {
  const ttitle = tour_title || topic || "";
  const dest = destination || "";
  const hero = hero_image || HERO_IMAGE;
  const type = tour_type || "";
  const msg = (message || "").replace(/\n/g, "<br>");
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><base target="_blank">
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>New tour enquiry: ${ttitle}</title>
<style type="text/css">
html, body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
* { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
table { border-collapse: collapse !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
img { border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; display: block; }
a { text-decoration: none; }
body, table, td, a { -webkit-font-smoothing: antialiased; }
@media only screen and (max-width: 620px) {
  .wrap { width: 100% !important; max-width: 100% !important; border-radius: 0 !important; }
  .pad { padding-left: 22px !important; padding-right: 22px !important; }
  .hero { height: 200px !important; }
  .band-title { font-size: 19px !important; line-height: 25px !important; }
  .h1 { font-size: 26px !important; line-height: 33px !important; }
  .body-text { font-size: 14.5px !important; line-height: 25px !important; }
  .hide-sm { display: none !important; }
  .row-label { display: block !important; width: 100% !important; padding-bottom: 2px !important; }
  .row-value { display: block !important; width: 100% !important; }
  .btn-td { width: 100% !important; }
  .btn-a { display: block !important; width: 100% !important; padding: 16px 0 !important; text-align: center !important; box-sizing: border-box !important; }
  .brand-name { font-size: 15px !important; }
}
@media only screen and (max-width: 400px) {
  .pad { padding-left: 18px !important; padding-right: 18px !important; }
  .hero { height: 170px !important; }
  .h1 { font-size: 23px !important; line-height: 30px !important; }
  .body-text { font-size: 14px !important; line-height: 24px !important; }
}
</style>
</head>
<body style="margin:0; padding:0; background-color:#eef3fa; width:100%;">
  <div style="display:none; font-size:1px; color:#eef3fa; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
    ${name} just enquired about ${ttitle} in ${dest}. Reply within one business day.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; background-color:#eef3fa;">
    <tbody><tr><td align="center" style="padding:30px 12px 40px 12px;">
      <table role="presentation" class="wrap" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px; background-color:#ffffff; border-radius:22px; overflow:hidden; box-shadow:0 28px 60px -34px rgba(10,31,68,0.5);">
        <tbody>
          <tr><td style="height:5px; background-color:#1f69ff; font-size:0; line-height:0;">&nbsp;</td></tr>
          <tr><td style="padding:22px 34px; border-bottom:1px solid #edf2f9;" class="pad">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tbody><tr>
              <td align="left" valign="middle" style="width:46px;"><img src="${LOGO_IMAGE}" width="40" height="40" alt="RITA Tours N Travels" style="width:40px; height:40px; border-radius:12px;"></td>
              <td align="left" valign="middle" style="padding-left:11px;">
                <div class="brand-name" style="font-family:'Poppins','Segoe UI',Arial,sans-serif; font-size:16.5px; font-weight:700; color:#0a1f44;">RITA Tours N Travels</div>
                
              </td>
              <td align="center" valign="middle" class="hide-sm" style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:10px; font-weight:700; letter-spacing:1.6px; text-transform:uppercase; color:#0a1f44; background-color:#f0f5ff; border-radius:20px; padding:7px 12px; white-space:nowrap;">${dest}</td>
            </tr></tbody></table>
          </td></tr>
          <tr><td style="padding:0; background-color:#0a1f44; line-height:0;"><img class="hero" src="${hero}" width="600" height="230" alt="${ttitle}" style="width:100%; max-width:600px; height:230px; object-fit:cover;"></td></tr>
          <tr><td style="background-color:#0a1f44; padding:20px 34px 22px 34px;" class="pad">
            <div style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:9.5px; font-weight:700; letter-spacing:2.1px; text-transform:uppercase; color:#19c3b1; padding-bottom:7px;">Journey of interest</div>
            <div class="band-title" style="font-family:'Poppins','Segoe UI',Arial,sans-serif; font-size:21px; line-height:27px; font-weight:600; color:#ffffff; letter-spacing:-0.2px;">${ttitle}</div>
            <div style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:12.5px; line-height:19px; color:#9fb0cc; padding-top:5px;">${dest}</div>
            
          </td></tr>
          <tr><td style="padding:30px 34px 0 34px;" class="pad">
            <div class="h1" style="font-family:'Poppins','Segoe UI',Arial,sans-serif; font-size:27px; line-height:34px; font-weight:700; color:#0a1f44; letter-spacing:-0.5px;">${name} wants to know more</div>
            <div class="body-text" style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:14.5px; line-height:25px; color:#3f5578; padding-top:10px;">A new enquiry has arrived from the tour page. Reply within one business day to keep the response time promise made on the website.</div>
          </td></tr>
          <tr><td style="padding:24px 34px 0 34px;" class="pad">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; background-color:#f7fafd; border:1px solid #e6ecf6; border-radius:18px;">
              <tbody><tr><td style="padding:6px 22px 20px 22px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tbody>
                  <tr><td class="row-label" style="padding:14px 0 4px 0; font-family:'Inter',Helvetica,Arial,sans-serif; font-size:9.5px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#93a5c0; width:38%;">Name</td>
                  <td class="row-value" style="padding:14px 0 4px 0; font-family:'Inter',Helvetica,Arial,sans-serif; font-size:14px; font-weight:600; color:#0a1f44;">${name}</td></tr>
                  <tr><td class="row-label" style="padding:4px 0; font-family:'Inter',Helvetica,Arial,sans-serif; font-size:9.5px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#93a5c0; width:38%;">Email</td>
                  <td class="row-value" style="padding:4px 0; font-family:'Inter',Helvetica,Arial,sans-serif; font-size:14px; color:#1f69ff; word-break:break-word;"><a href="mailto:${email}" style="color:#1f69ff;">${email}</a></td></tr>
                  ${type ? `<tr><td class="row-label" style="padding:4px 0 12px 0; font-family:'Inter',Helvetica,Arial,sans-serif; font-size:9.5px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#93a5c0; width:38%;">Tour type</td>
                  <td class="row-value" style="padding:4px 0 12px 0; font-family:'Inter',Helvetica,Arial,sans-serif; font-size:14px; color:#0a1f44;">${type}</td></tr>` : `<tr><td style="padding:4px 0 12px 0;"></td><td style="padding:4px 0 12px 0;"></td></tr>`}
                </tbody></table>
              </td></tr></tbody></table>
          </td></tr>
          <tr><td style="padding:24px 34px 0 34px;" class="pad">
            <div style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:9.5px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#1f69ff; padding-bottom:10px;">Their message</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;"><tbody><tr>
              <td style="width:3px; background-color:#1f69ff; border-radius:3px; font-size:0; line-height:0;">&nbsp;</td>
              <td style="padding-left:16px;" class="body-text">
                <div style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:14.5px; line-height:25px; color:#3f5578; word-break:break-word;">${msg}</div>
              </td>
            </tr></tbody></table>
          </td></tr>
          <tr><td style="padding:28px 34px 10px 34px;" class="pad">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tbody><tr>
              <td class="btn-td" align="left" bgcolor="#1f69ff" style="border-radius:26px; background-color:#1f69ff;">
                <a class="btn-a" href="mailto:${email}" style="display:inline-block; padding:15px 32px; font-family:'Inter',Helvetica,Arial,sans-serif; font-size:14px; font-weight:600; color:#ffffff; border-radius:26px; letter-spacing:0.1px;">Reply to ${name}</a>
              </td>
            </tr></tbody></table>
          </td></tr>
          
          <tr><td style="background-color:#f7fafd; border-top:1px solid #edf2f9; padding:20px 34px;" class="pad">
            <div style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:11.5px; line-height:19px; color:#6b7f9e;">Internal notification. The enquiry is also saved as a lead in the app. Nothing has been booked or charged, and no payment details were collected.</div>
          </td></tr>
          <tr><td style="background-color:#0a1f44; padding:24px 34px;" class="pad">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tbody><tr>
              <td align="left" valign="middle" style="width:38px;"><img src="${LOGO_IMAGE}" width="30" height="30" alt="" style="width:30px; height:30px; border-radius:9px;"></td>
              <td align="left" valign="middle" style="padding-left:10px;">
                <div style="font-family:'Poppins','Segoe UI',Arial,sans-serif; font-size:12.5px; font-weight:600; color:#ffffff; line-height:18px;">RITA Tours N Travels</div>
                <div style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:11px; color:#8092b0; line-height:17px;">Keizersgracht 100, Amsterdam, Netherlands</div>
              </td>
              <td align="right" valign="middle" class="hide-sm" style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:11px; line-height:18px;">
                <a href="mailto:hello@ritatoursandtravels.eu" style="color:#19c3b1;">hello@ritatoursandtravels.eu</a>
              </td>
            </tr></tbody></table>
          </td></tr>
        </tbody>
      </table>
    </td></tr></tbody></table>
</body></html>`;
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
  <div style="display:none; font-size:1px; color:#eef3fa; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
    Your enquiry about ${title} has reached our planning team. A named planner will reply within one business day.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; background-color:#eef3fa;">
    <tbody><tr>
      <td align="center" style="padding:30px 12px 40px 12px;">
        <table role="presentation" class="wrap" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px; background-color:#ffffff; border-radius:22px; overflow:hidden; box-shadow:0 28px 60px -34px rgba(10,31,68,0.5);">
          <tbody>
            <tr><td style="height:5px; background-color:#1f69ff; font-size:0; line-height:0;">&nbsp;</td></tr>
            <tr><td style="padding:22px 34px; border-bottom:1px solid #edf2f9;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tbody><tr>
                <td align="left" valign="middle" style="width:46px;"><img src="${LOGO_IMAGE}" width="40" height="40" alt="RITA Tours N Travels" style="width:40px; height:40px; border-radius:12px;"></td>
                <td align="left" valign="middle" style="padding-left:11px;">
                  <div style="font-family:'Poppins','Segoe UI',Arial,sans-serif; font-size:16.5px; font-weight:700; color:#0a1f44;">RITA Tours N Travels</div>
                </td>
                <td align="right" valign="middle" style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:10.5px; color:#93a5c0; white-space:nowrap;">Since 2026</td>
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
                    <div style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:9.5px; font-weight:700; letter-spacing:2.1px; text-transform:uppercase; color:#1f69ff; padding-bottom:8px;">${title}</div>
                    
                    <div style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:12.5px; line-height:19px; color:#6b7f9e; padding-top:4px;">${dest}</div>
                    <div style="border-top:1px solid #e6ecf6; margin:16px 0 14px 0; font-size:0; line-height:0;">&nbsp;</div>
                    <div style="font-family:'Inter',Helvetica,Arial,sans-serif; font-size:13.5px; line-height:23px; color:#3f5578; word-break:break-word;">${msg}</div>
                  </td>
                </tr></tbody></table>
            </td></tr>
            <tr><td style="padding:28px 34px 32px 34px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tbody><tr>
                <td align="left" bgcolor="#1f69ff" style="border-radius:26px; background-color:#1f69ff;">
                  <a href="${SITE_URL}/tours" style="display:inline-block; padding:15px 32px; font-family:'Inter',Helvetica,Arial,sans-serif; font-size:14px; font-weight:600; color:#ffffff; border-radius:26px;">Explore journeys</a>
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
                <strong style="color:#0a1f44;">RITA Tour N Travels Team</strong>
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