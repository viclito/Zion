import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

export async function PUT(req, { params }) {
  console.log("Triggering HMR for PUT /api/orders/[id]");
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin = ['admin', 'superadmin'].includes(session.user.role);
    
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    
    // Deconstruct potential update fields
    const { status, expectedDeliveryDate, rating, feedback } = body;

    // 1. Fetch the existing order to verify ownership and current status
    const existingOrder = await Order.findById(id);
    if (!existingOrder) {
       return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    // Build standard update object
    let updatePayload = {};

    // 2. Strict User Permissions Check
    if (!isAdmin) {
       // A. If the user is trying to cancel...
       if (status === 'Cancelled') {
         if (existingOrder.userId.toString() !== session.user.id) {
           return NextResponse.json({ success: false, message: 'Forbidden: You do not own this order.' }, { status: 403 });
         }
         if (!['Pending', 'Processing'].includes(existingOrder.status)) {
           return NextResponse.json({ success: false, message: 'Too late to cancel: Order is being prepared for transit.' }, { status: 400 });
         }
         updatePayload.status = 'Cancelled';
       }
       // B. If the user is trying to leave a rating/feedback...
       else if (rating !== undefined) {
          if (existingOrder.userId.toString() !== session.user.id) {
            return NextResponse.json({ success: false, message: 'Forbidden: You do not own this order.' }, { status: 403 });
          }
          if (!['Delivered', 'Completed'].includes(existingOrder.status)) {
            return NextResponse.json({ success: false, message: 'Forbidden: You can only leave feedback on delivered orders.' }, { status: 400 });
          }
          if (existingOrder.rating) {
            return NextResponse.json({ success: false, message: 'Feedback has already been submitted.' }, { status: 400 });
          }
          updatePayload.rating = rating;
          if (feedback) updatePayload.feedback = feedback;
       }
       else {
         return NextResponse.json({ success: false, message: 'Forbidden: Invalid action for standard user.' }, { status: 403 });
       }
    } else {
      // 3. Admin Permissions Update
      if (status) {
        if (!['Pending', 'Processing', 'Shipped', 'Delivered', 'Completed', 'Cancelled'].includes(status)) {
           return NextResponse.json({ success: false, message: 'Invalid status' }, { status: 400 });
        }
        updatePayload.status = status;
      }
      
      // Update ETA
      if (expectedDeliveryDate !== undefined) {
        updatePayload.expectedDeliveryDate = expectedDeliveryDate;
      }
    }

    const order = await Order.findByIdAndUpdate(id, updatePayload, { new: true });

    return NextResponse.json({ success: true, order }, { status: 200 });

  } catch (error) {
    console.error('Order Status Update Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
