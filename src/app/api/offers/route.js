import { NextResponse } from 'next/server';
import { getOffers, createOffer } from '@/services/offer.service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request) {
  console.log("Triggering HMR for GET /api/offers");
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') === 'true';
    
    // If public user is requesting, filter out inactive offers
    const query = activeOnly ? { isActive: true } : {};
    
    const offers = await getOffers(query);
    return NextResponse.json({ success: true, offers }, { status: 200 });
  } catch (error) {
    console.error('Offers API - GET Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch offers' }, { status: 500 });
  }
}

export async function POST(request) {
  console.log("Triggering HMR for POST /api/offers");
  try {
    // Only admins can create offers
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'superadmin'].includes(session.user.role)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const newOffer = await createOffer(body);
    
    return NextResponse.json({ success: true, offer: newOffer }, { status: 201 });
  } catch (error) {
    console.error('Offers API - POST Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Failed to create offer' 
    }, { status: 400 });
  }
}
