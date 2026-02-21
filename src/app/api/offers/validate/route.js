import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Offer from '@/models/Offer';

export async function POST(req) {
  try {
    await dbConnect();
    const { code, cartValue } = await req.json();

    if (!code) {
      return NextResponse.json({ success: false, message: 'Please provide a discount code.' }, { status: 400 });
    }

    const offer = await Offer.findOne({ discountCode: code.toUpperCase() });

    if (!offer) {
      return NextResponse.json({ success: false, message: 'Invalid or expired discount code.' }, { status: 404 });
    }

    if (!offer.isActive) {
      return NextResponse.json({ success: false, message: 'This discount code is no longer active.' }, { status: 400 });
    }

    if (offer.validUntil && new Date(offer.validUntil) < new Date()) {
      return NextResponse.json({ success: false, message: 'This discount code has expired.' }, { status: 400 });
    }

    const orderTotal = parseFloat(cartValue) || 0;
    if (offer.minOrderValue > 0 && orderTotal < offer.minOrderValue) {
      return NextResponse.json({ 
        success: false, 
        message: `This code requires a minimum order value of ₹${offer.minOrderValue.toLocaleString('en-IN')}.` 
      }, { status: 400 });
    }

    // Calculate Response Payload
    let discountAmount = 0;
    let finalPrice = orderTotal;
    let breakdown = '';

    if (offer.discountType === 'percentage') {
      discountAmount = (orderTotal * (offer.discountValue / 100));
      finalPrice = orderTotal - discountAmount;
      breakdown = `-₹${discountAmount.toLocaleString('en-IN', {maximumFractionDigits: 2})} (${offer.discountValue}% OFF)`;
    } else if (offer.discountType === 'fixed_amount') {
      discountAmount = offer.discountValue;
      finalPrice = Math.max(0, orderTotal - discountAmount);
      breakdown = `-₹${discountAmount.toLocaleString('en-IN', {maximumFractionDigits: 2})} (${code.toUpperCase()})`;
    } else if (offer.discountType === 'free_item') {
      breakdown = `Free Gift: ${offer.freeItemDescription}`;
    } else {
      breakdown = `Offer Applied: ${offer.title}`;
    }

    return NextResponse.json({
      success: true,
      data: {
        discountType: offer.discountType,
        discountValue: offer.discountValue,
        discountAmount,
        finalPrice,
        breakdown,
        code: offer.discountCode
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Validate Offer Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
