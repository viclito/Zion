import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { hashPassword } from '@/lib/hash';
import { sendAdminApprovalEmail } from '@/lib/mail';

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const { name, email, password, role, address, phone, details } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Name, email, and password are required' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 422 });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Enforce valid roles
    const assignedRole = role === 'admin' ? 'admin' : 'user';

    // Build the user payload
    const userData = {
      name,
      email,
      password: hashedPassword,
      role: assignedRole,
      address: address || '',
      phone: phone || '',
      details: details || '',
    };

    if (assignedRole === 'admin') {
      // Admins require special email approval flow
      userData.isApproved = false;
      const approvalToken = crypto.randomBytes(32).toString('hex');
      userData.approvalToken = approvalToken;

      const newUser = await User.create(userData);

      // Attempt to send the approval email
      try {
        await sendAdminApprovalEmail(name, email, approvalToken);
      } catch (emailError) {
        console.error("Failed to send email, but user was created:", emailError);
        // We still return 201, but the superadmin will need to manually approve in DB if email fails permanently
      }

      return NextResponse.json(
        { message: 'Admin registered successfully. An approval email has been sent to the system owner.', user: { id: newUser._id, name, email, role: 'admin' } },
        { status: 201 }
      );
    } else {
      // Standard users are auto-approved
      userData.isApproved = true;
      const newUser = await User.create(userData);

      return NextResponse.json(
        { message: 'User registered successfully!', user: { id: newUser._id, name, email, role: 'user' } },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Registration API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
