import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createInquiry } from '@/services/inquiry.service';

export async function POST(request) {
  console.log("Triggering HMR for POST /api/contact");
  const { name, phone, address, dogName , category} = await request.json();

  try {
    // 1. Save to Database first
    await createInquiry({
      name,
      phone,
      subject: `Inquiry about ${dogName}`,
      message: `Address: ${address}`,
      category: category,
      type: 'Pet Inquiry',
    });

    // 2. Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // 3. Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.YOUR_EMAIL,
      subject: `New Inquiry About ${dogName}`,
      text: `
        Name: ${name}
        Phone: ${phone}
        Address: ${address}
        ${category}: ${dogName}
      `,
      html: `
        <h1>New ${category} Inquiry</h1>
        <p><strong>Variety:</strong> ${dogName}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
      `,
    };

    // 4. Send email alert
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
