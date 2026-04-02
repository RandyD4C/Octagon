import { sendEmail } from '../../backend/nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message, attachments, captchaToken } = req.body;

    if (!name || !email || !subject || !message || !captchaToken) {
      return res.status(400).json({ message: 'All fields and CAPTCHA are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // ============================
    // GET CLIENT IP
    // ============================
    const rawIp =
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.socket?.remoteAddress ||
      '127.0.0.1';

    let cleanIp = rawIp.replace(/^::ffff:/, '');

    // Fallback for localhost testing so Geo lookup works
    const isLocal = cleanIp === '::1' || cleanIp === '127.0.0.1';
    const geoIp = isLocal ? '1.9.0.0' : cleanIp;


    // ============================
    // RECAPTCHA VERIFICATION
    // ============================
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

      if (!secretKey) {
        console.error('RECAPTCHA_SECRET_KEY is not set');
        return res.status(500).json({ message: 'Server misconfiguration' });
      }

      try {
        const params = new URLSearchParams();
        params.append('secret', secretKey);
        params.append('response', captchaToken);
        params.append('remoteip', geoIp);

        const captchaRes = await fetch(
          'https://www.google.com/recaptcha/api/siteverify',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
          }
        );

        const captchaData = await captchaRes.json();

        if (!captchaData.success) {
          return res.status(400).json({
            message: 'reCAPTCHA validation failed',
            errors: captchaData['error-codes'] || [],
          });
        }

      } catch (error) {
        console.error('reCAPTCHA verification error:', error);
        return res.status(500).json({ message: 'Failed to verify reCAPTCHA' });
      }

    // ============================
    // GEOLOCATION LOOKUP
    // ============================
    let country = 'Unknown';
    let city = '';

    try {
      const geoRes = await fetch(`https://ipapi.co/${geoIp}/json/`);
      const geoData = await geoRes.json();

      country = geoData.country_name || 'Unknown';
      city = geoData.city || '';
    } catch (error) {
      console.error('Geo lookup failed:', error);
    }

    // ============================
    // TIMESTAMP (Malaysia)
    // ============================
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kuala_Lumpur',
      dateStyle: 'full',
      timeStyle: 'short'
    });

    // ============================
    // EMAIL CONTENT
    // ============================

    const attachmentList = attachments && attachments.length > 0
      ? `
        <div style="margin-top: 24px; padding: 20px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
          <h3 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px;">📎 Attachments (${attachments.length})</h3>
          <ul style="margin: 0; padding: 0; list-style: none;">
            ${attachments.map(a => `
              <li style="padding: 8px 0; border-bottom: 1px solid #edf2f7; color: #475569; font-size: 14px;">
                <span style="color: #64748b; margin-right: 8px;">📄</span> ${a.filename}
              </li>
            `).join('')}
          </ul>
        </div>
      `
      : '';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f9;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
          <!-- Header -->
          <tr>
            <td style="background-color: #154A9A; padding: 30px 40px; text-align: left;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">New Inquiry Received</h1>
              <p style="color: #bfdbfe; margin: 8px 0 0 0; font-size: 14px;">Octagon Web Portal Submission</p>
            </td>
          </tr>
          
          <!-- Content Body -->
          <tr>
            <td style="padding: 40px;">
              <!-- Sender Info -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding-bottom: 15px;">
                    <div style="text-transform: uppercase; color: #64748b; font-size: 11px; font-weight: 700; letter-spacing: 1px; margin-bottom: 4px;">From</div>
                    <div style="color: #1e293b; font-size: 16px; font-weight: 500;">${name}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 15px;">
                    <div style="text-transform: uppercase; color: #64748b; font-size: 11px; font-weight: 700; letter-spacing: 1px; margin-bottom: 4px;">Email Reference</div>
                    <div style="color: #154A9A; font-size: 15px;">${email}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 0;">
                    <div style="text-transform: uppercase; color: #64748b; font-size: 11px; font-weight: 700; letter-spacing: 1px; margin-bottom: 4px;">Subject</div>
                    <div style="color: #1e293b; font-size: 15px; font-weight: 600;">${subject}</div>
                  </td>
                </tr>
              </table>

              <!-- Message Section -->
              <div style="padding: 24px; background-color: #fcfdfe; border-left: 4px solid #154A9A; border-radius: 4px; border-top: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9;">
                <p style="margin: 0 0 10px 0; color: #64748b; font-size: 12px; font-weight: 600;">MESSAGE CONTENT:</p>
                <div style="margin: 0; color: #334155; line-height: 1.6; font-size: 15px; white-space: pre-wrap;">${message}</div>
              </div>

              ${attachmentList}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">Submitted from IP: ${cleanIp} (${city ? city + ', ' : ''}${country})</p>
              <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 12px;">Submitted on ${timestamp}</p>
              <p style="margin: 12px 0 0 0; color: #cbd5e1; font-size: 11px;">This is an automated notification from the Octagon website contact system.</p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const result = await sendEmail({
      to: process.env.RECEIVER_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      text: `
            NEW CONTACT INQUIRY
            ----------------------------
            FROM: ${name}
            EMAIL: ${email}
            SUBJECT: ${subject}

            SENDER INFO:
            IP Address: ${cleanIp}
            Location: ${city ? city + ', ' : ''}${country}
            Submitted: ${timestamp}

            MESSAGE:
            ${message}
            ----------------------------
            This is an automated notification from Octagon Precision Mold.
            `.trim(),
      html: htmlContent,
      attachments,
      replyTo: email
    });

    if (result.success) {
      return res.status(200).json({ message: 'Email sent successfully' });
    } else {
      return res.status(500).json({ message: 'Error sending email' });
    }
  } catch (err) {
    console.error('Unexpected error in contact API:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

