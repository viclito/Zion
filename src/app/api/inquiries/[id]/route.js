import { NextResponse } from 'next/server';
import { updateInquiryStatus, deleteInquiry } from '@/services/inquiry.service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function PUT(request, { params }) {
  console.log("Triggering HMR for PUT /api/inquiries/[id]");
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'superadmin'].includes(session.user.role)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { status } = await request.json();
    
    if (!['New', 'Read', 'Archived'].includes(status)) {
        return NextResponse.json({ success: false, message: 'Invalid status' }, { status: 400 });
    }

    const updatedInquiry = await updateInquiryStatus(id, status);
    
    if (!updatedInquiry) {
      return NextResponse.json({ success: false, message: 'Inquiry not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, inquiry: updatedInquiry }, { status: 200 });
  } catch (error) {
    console.error('Inquiries API - PUT Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update inquiry' }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'superadmin'].includes(session.user.role)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    
    const deletedInquiry = await deleteInquiry(id);
    
    if (!deletedInquiry) {
      return NextResponse.json({ success: false, message: 'Inquiry not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    console.error('Inquiries API - DELETE Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete inquiry' }, { status: 400 });
  }
}
