import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Pet from '@/models/Pet';
import User from '@/models/User';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const body = await req.json();
    const { petId, deliveryMethod, quantity, totalPrice, appliedDiscountCode, discountBreakdown } = body;
    
    const parsedQuantity = quantity ? parseInt(quantity) : 1;

    // Verify Pet exists and is available
    const pet = await Pet.findById(petId);
    if (!pet) return NextResponse.json({ success: false, message: 'Pet not found' }, { status: 404 });
    
    // Auto "stock" logic or just track it? User just wants to order it. 
    // We won't block it completely if it says 'Out of Stock' under the hood just in case admin overrides, but we should check.
    if (pet.avail?.toLowerCase() !== 'available') {
       return NextResponse.json({ success: false, message: 'This pet is currently out of stock.' }, { status: 400 });
    }

    // Strict Inventory Validation
    if (pet.stock < parsedQuantity) {
       return NextResponse.json({ 
          success: false, 
          message: `Only ${pet.stock} unit(s) left in stock. Please reduce your quantity.` 
       }, { status: 400 });
    }

    // Deduct Stock Atomically
    pet.stock -= parsedQuantity;
    if (pet.stock === 0) {
       pet.avail = 'Out of Stock';
    }
    await pet.save();

    // Capture Customer Snapshot from DB (Session might be stale if they just updated it)
    const user = await User.findById(session.user.id);

    const newOrder = await Order.create({
      petId: pet._id,
      userId: user._id,
      customerSnapshot: {
        name: user.name,
        phone: user.phone || 'N/A',
        address: user.address || 'N/A',
        email: user.email,
        details: user.details || '',
      },
      deliveryMethod: deliveryMethod || 'Come and collect the product',
      quantity: parsedQuantity,
      totalPrice,
      appliedDiscountCode: appliedDiscountCode || '',
      discountBreakdown: discountBreakdown || '',
    });

    // Notify Admin via Email
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const adminEmail = process.env.YOUR_EMAIL;
      
      await transporter.sendMail({
        from: `"Zion Orders" <${process.env.EMAIL_USER}>`,
        to: adminEmail,
        subject: `[New Order] ${pet.name} ordered by ${user.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #1E3A2F; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Pet Order Received! 🐔</h2>
            <p><strong>Customer:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone || 'N/A'}</p>
            <p><strong> डिलीवरी Method:</strong> ${deliveryMethod}</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #555;">Product Information</h3>
              <p><strong>Name:</strong> ${pet.name}</p>
              <p><strong>Category:</strong> ${pet.category}</p>
              <p><strong>Quantity Ordered:</strong> ${parsedQuantity}</p>
            </div>

            <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #bbf7d0;">
              <h3 style="margin-top: 0; color: #166534;">Payment & Discount Ledger</h3>
              <p><strong>Total Price (₹):</strong> ₹${totalPrice}</p>
              ${appliedDiscountCode ? `<p><strong>Promo Code Used:</strong> <span style="background: #fef08a; padding: 2px 6px; border-radius: 4px;">${appliedDiscountCode}</span></p>` : ''}
              ${discountBreakdown ? `<p><strong>Discount Breakdown:</strong> ${discountBreakdown}</p>` : ''}
            </div>
            
            <a href="${process.env.NEXTAUTH_URL}/admin/orders" 
               style="display: inline-block; background-color: #1E3A2F; color: white; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-weight: bold; margin-top: 20px;">
              View Order Dashboard
            </a>
          </div>
        `,
      });
    } catch (mailError) {
      console.error("Order notification email failed:", mailError);
    }

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    // Sort logic (newest first)
    // If admin, show all orders. If user, show only their orders.
    const query = session.user.role === 'admin' || session.user.role === 'superadmin' 
        ? {} 
        : { userId: session.user.id };

    const orders = await Order.find(query)
      .populate('petId', 'name category mainImage')
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    console.error('Fetch orders error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
