import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import nodemailer from 'nodemailer';

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // Await params first per Next 15 standard
    const id = (await params).id;

    const body = await req.json();
    const { text } = body;

    if (!text || text.trim() === '') {
      return NextResponse.json({ success: false, message: 'Message cannot be empty.' }, { status: 400 });
    }

    const order = await Order.findById(id).populate('userId', 'email name');
    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    const isUser = session.user.role === 'user';
    const isAdmin = session.user.role === 'admin' || session.user.role === 'superadmin';

    // Permission Checks
    if (isUser && order.userId._id.toString() !== session.user.id) {
       return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    // Chat Lock Rules: User cannot send the FIRST message. Admin must reply first.
    if (isUser && !order.adminHasReplied) {
       return NextResponse.json({ success: false, message: 'You must wait for the Admin to initiate the chat.' }, { status: 403 });
    }

    // Add message
    const newMessage = {
      sender: isUser ? 'user' : 'admin',
      text: text.trim(),
    };

    order.messages.push(newMessage);

    // If Admin is the one replying and it's their FIRST reply, unlock the chat for the user
    // and notify the user via email.
    if (isAdmin && !order.adminHasReplied) {
      order.adminHasReplied = true;
      order.status = 'Processing'; // Automatically upgrade status from Pending when Admin replies
      
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        await transporter.sendMail({
          from: `"Zion Admin" <${process.env.EMAIL_USER}>`,
          to: order.userId.email,
          subject: `Update on your Order!`,
          html: `
            <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; color: #333;">
              <h2 style="color: #1E3A2F;">The Admin has responded to your order!</h2>
              <p>Hello ${order.userId.name},</p>
              <p>The admin has sent you a message regarding your recent pet order.</p>
              <div style="background-color: #f0fdf4; padding: 15px; border-left: 4px solid #16a34a; margin: 20px 0;">
                <p style="margin: 0; font-style: italic;">"${newMessage.text}"</p>
              </div>
              <p>You can now reply directly on your dashboard.</p>
              <a href="${process.env.NEXTAUTH_URL}/orders" 
                 style="display: inline-block; background-color: #1E3A2F; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold; margin-top: 15px;">
                View Chat & Reply
              </a>
            </div>
          `,
        });
      } catch (mailError) {
        console.error("User chat notification email failed:", mailError);
      }
    }

    await order.save();

    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (error) {
    console.error('Chat message error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
