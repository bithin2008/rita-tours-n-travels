const SITE_NAME = "RITA Tours N Travels";
const SITE_URL = process.env.NEXT_PUBLIC_BASE44_APP_BASE_URL || "https://rita-tours-n-travels.vercel.app";
const SUPPORT_EMAIL = "noreply.ritatravel@gmail.com";
const HERO_IMAGE = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80";
const LOGO_IMAGE = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=200&q=80";

const baseStyles = `
  body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f8fc;
    color: #0a1f44;
    line-height: 1.6;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 20px 45px -38px rgba(10, 31, 68, 0.65);
  }
  .hero {
    background: linear-gradient(135deg, #0a1f44 0%, #1e6bff 50%, #19c3b1 100%);
    padding: 40px 30px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -10%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(25, 195, 177, 0.15) 0%, transparent 70%);
    border-radius: 50%;
  }
  .hero h1 {
    color: #ffffff;
    margin: 0;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.02em;
    position: relative;
    z-index: 1;
  }
  .hero p {
    color: rgba(255, 255, 255, 0.85);
    margin: 10px 0 0;
    font-size: 14px;
    position: relative;
    z-index: 1;
  }
  .content {
    padding: 40px 30px;
  }
  .heading {
    font-size: 20px;
    font-weight: 700;
    color: #0a1f44;
    margin-bottom: 20px;
    letter-spacing: -0.01em;
  }
  .detail-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 16px;
    padding: 12px 16px;
    background-color: #f5f8fc;
    border-radius: 12px;
    border-left: 4px solid #1e6bff;
  }
  .detail-label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #1e6bff;
    min-width: 100px;
  }
  .detail-value {
    font-size: 14px;
    color: #0a1f44;
  }
  .message-box {
    background-color: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    margin: 24px 0;
  }
  .message-label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #1e6bff;
    margin-bottom: 10px;
  }
  .cta-button {
    display: inline-block;
    background: linear-gradient(135deg, #1e6bff 0%, #2563eb 100%);
    color: #ffffff !important;
    text-decoration: none;
    padding: 14px 32px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 14px;
    margin: 20px 0;
    box-shadow: 0 10px 25px -10px rgba(30, 107, 255, 0.4);
    transition: transform 0.2s;
  }
  .cta-button:hover {
    transform: translateY(-2px);
  }
  .divider {
    height: 1px;
    background-color: #e2e8f0;
    margin: 24px 0;
  }
  .footer {
    padding: 30px;
    background-color: #0a1f44;
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
    font-size: 12px;
  }
  .footer a {
    color: #1e6bff;
    text-decoration: none;
  }
  .badge {
    display: inline-block;
    background-color: rgba(25, 195, 177, 0.15);
    color: #19c3b1;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

export function enquiryNotificationTemplate({ name, email, topic, message, language, currency }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Enquiry - ${SITE_NAME}</title>
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="container">
        <div class="hero">
          <h1>New Journey Enquiry</h1>
          <p>A traveller is dreaming of their next European adventure</p>
        </div>

        <div class="content">
          <span class="badge">New Enquiry</span>

          <h2 class="heading">Trip Details</h2>

          <div class="detail-row">
            <span class="detail-label">Traveller</span>
            <span class="detail-value">${name}</span>
          </div>

          <div class="detail-row">
            <span class="detail-label">Email</span>
            <span class="detail-value">${email}</span>
          </div>

          <div class="detail-row">
            <span class="detail-label">Topic</span>
            <span class="detail-value">${topic}</span>
          </div>        

          <div class="message-box">
            <div class="message-label">Message</div>
            <div style="color: #0a1f44;">${message.replace(/\n/g, "<br>")}</div>
          </div>

          <a href="${SITE_URL}/tours" class="cta-button">View All Journeys</a>
        </div>

        <div class="footer">
          <p>© ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function autoReplyTemplate({ name, topic }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>We received your details - ${SITE_NAME}</title>
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="container">
        <div class="hero">
          <h1>Message Received</h1>
          <p>We have received your details — we will contact you very soon.</p>
        </div>

        <div class="content">
          <h2 class="heading">Hi ${name},</h2>

          <p>Thank you for reaching out to <strong>${SITE_NAME}</strong>. We have received your details and
          our planning team will contact you very soon.</p>

          <div class="detail-row">
            <span class="detail-label">Enquiry Topic</span>
            <span class="detail-value">${topic}</span>
          </div>

          <div class="divider"></div>

          <h3 class="heading">What happens next?</h3>
          <ul style="padding-left: 20px; color: #0a1f44;">
            <li style="margin-bottom: 10px;">Our planner reviews your enquiry</li>
            <li style="margin-bottom: 10px;">We craft a personalised itinerary just for you</li>
            <li style="margin-bottom: 10px;">We will contact you with route options and pricing</li>
          </ul>

          <a href="${SITE_URL}" class="cta-button">Explore Journeys</a>
        </div>

        <div class="footer">
          <p>© ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.</p>
          <p>Amsterdam, the Netherlands</p>
          <p><a href="${SITE_URL}/contact">Contact us</a> · <a href="${SITE_URL}/privacy-policy">Privacy Policy</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}
