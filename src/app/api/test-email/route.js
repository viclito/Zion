import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  console.log("Testing email with user:", process.env.EMAIL_USER);
  
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.YOUR_EMAIL,
      subject: 'Test Email - Zion Pets SMTP',
      text: 'This is a test to verify Nodemailer and Gmail App Passwords.',
    });

    console.log('Test email sent successfully: %s', info.messageId);
    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Failed to send test email:', error);
    return NextResponse.json({ success: false, error: error.message, fullError: error }, { status: 500 });
  }
}
