import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ message: 'Token is missing' }, { status: 400 });
    }

    await dbConnect();

    // Find the user with this approval token
    const user = await User.findOne({ approvalToken: token }).select('+approvalToken');
    
    if (!user) {
      return NextResponse.json({ message: 'Invalid or expired approval token' }, { status: 400 });
    }

    if (user.isApproved) {
      return NextResponse.json({ message: 'User is already approved' }, { status: 400 });
    }

    // Approve the user
    user.isApproved = true;
    user.approvalToken = undefined; // Clear the token so it can't be reused
    await user.save();

    // Redirect the superadmin/owner to a fancy success page or just return HTML
    return new NextResponse(`
      <html>
        <head>
          <title>Admin Approved | Zion Pets</title>
          <style>
            body { font-family: 'Inter', sans-serif; background-color: #F8F5EE; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .card { background: white; padding: 40px; border-radius: 16px; box-shadow: 8px 8px 0px #1E1E1E; border: 4px solid #1E1E1E; text-align: center; max-width: 400px; }
            h1 { color: #2F5C4F; margin-top: 0; }
            p { color: #555; line-height: 1.6; }
            .btn { display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #2F5C4F; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; border: 2px solid #1E1E1E; transition: transform 0.2s; }
            .btn:hover { transform: translateY(-2px); box-shadow: 4px 4px 0px #1E1E1E; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>✅ Admin Approved!</h1>
            <p>The account for <strong>${user.name}</strong> (${user.email}) has been successfully approved.</p>
            <p>They can now log into the Zion Pets Admin Dashboard.</p>
            <a href="/" class="btn">Return to Website</a>
          </div>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });

  } catch (error) {
    console.error('Approval API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
