import nodemailer from 'nodemailer';

export async function sendAdminApprovalEmail(adminName, adminEmail, token) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Standard configuration for Gmail
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Dynamically construct the base URL depending on the environment
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const approvalLink = `${baseUrl}/api/admin/approve?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.YOUR_EMAIL, // Send to the super admin/owner
      subject: 'New Admin Registration Request - Zion Pets',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2F5C4F;">New Admin Registration Request</h2>
          <p>A new user has requested administrative access to the Zion Pets dashboard.</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong>Name:</strong> ${adminName}</p>
            <p><strong>Email:</strong> ${adminEmail}</p>
          </div>
          <p>To approve this user and grant them dashboard access, please click the button below:</p>
          <a href="${approvalLink}" style="display: inline-block; padding: 12px 24px; background-color: #2F5C4F; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px;">
            Approve Admin Access
          </a>
          <p style="margin-top: 20px; font-size: 12px; color: #777;">If you do not recognize this request, you can simply ignore this email.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Approval email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending approval email:', error);
    throw new Error('Could not send approval email');
  }
}
