import { NextResponse } from 'next/server';
import { updateOffer, deleteOffer, getOfferById } from '@/services/offer.service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function PUT(request, { params }) {
  console.log("Triggering HMR for PUT /api/offers/[id]");
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'superadmin'].includes(session.user.role)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    
    const updatedOffer = await updateOffer(id, body);
    
    if (!updatedOffer) {
      return NextResponse.json({ success: false, message: 'Offer not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, offer: updatedOffer }, { status: 200 });
  } catch (error) {
    console.error('Offers API - PUT Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update offer' }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  console.log("Triggering HMR for DELETE /api/offers/[id]");
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'superadmin'].includes(session.user.role)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    
    const deletedOffer = await deleteOffer(id);
    
    if (!deletedOffer) {
      return NextResponse.json({ success: false, message: 'Offer not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    console.error('Offers API - DELETE Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete offer' }, { status: 400 });
  }
}
