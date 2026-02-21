import { NextResponse } from 'next/server';
import { getInquiries } from '@/services/inquiry.service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request) {
  console.log("Triggering HMR for GET /api/inquiries");
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'superadmin'].includes(session.user.role)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const inquiries = await getInquiries();
    
    return NextResponse.json({ success: true, inquiries }, { status: 200 });
  } catch (error) {
    console.error('Inquiries API - GET Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch inquiries' }, { status: 500 });
  }
}
