'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

export default function OrderSection({ pet }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  
  // Protective Fallback for legacy DB entries created before Schema Update
  const availableMethods = pet.allowedDeliveryMethods?.length > 0 
    ? pet.allowedDeliveryMethods 
    : ['Come and collect the product'];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState(availableMethods[0]);
  
  // Pricing & Promos
  const startingPrice = pet.discountedPrice || pet.basePrice || 0;
  const [quantity, setQuantity] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [isValidatingPromo, setIsValidatingPromo] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(null); // { code, breakdown, finalPrice, discountAmount }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleOrderClick = () => {
    if (status === 'unauthenticated') {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }
    setIsModalOpen(true);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const payload = {
        petId: pet._id,
        deliveryMethod,
        quantity,
        totalPrice: appliedDiscount ? appliedDiscount.finalPrice : (startingPrice * quantity),
      };

      if (appliedDiscount) {
        payload.appliedDiscountCode = appliedDiscount.code;
        payload.discountBreakdown = appliedDiscount.breakdown;
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to place order.');

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    setIsValidatingPromo(true);
    setError('');

    try {
      const res = await fetch('/api/offers/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoCode, cartValue: (startingPrice * quantity) })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Invalid code.');

      setAppliedDiscount({
        code: data.data.code,
        breakdown: data.data.breakdown,
        finalPrice: data.data.finalPrice,
        discountAmount: data.data.discountAmount
      });
      setPromoCode(''); // Clear input after success
    } catch (err) {
      setError(err.message);
      setAppliedDiscount(null);
    } finally {
      setIsValidatingPromo(false);
    }
  };

  const removePromoCode = () => {
    setAppliedDiscount(null);
  };

  if (!pet || pet.avail?.toLowerCase() !== 'available') {
    return (
      <div className="mt-6 w-[90%] bg-red-50 border border-red-200 p-4 rounded-xl text-red-700 font-bold text-center">
        Currently Out of Stock
      </div>
    );
  }

  return (
    <div className="mt-8 w-[90%]">
      <button 
        onClick={handleOrderClick}
        className="w-full bg-[var(--text-primary)] hover:bg-[#1E3A2F] text-white font-bold text-lg py-4 px-6 rounded-2xl shadow-lg transition-all active:scale-95 flex justify-center items-center gap-2"
      >
        <span>📦</span> Order this Pet
      </button>

      {isModalOpen && !success && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative overflow-y-auto max-h-[95vh] custom-scrollbar">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 bg-gray-100 p-2 rounded-full transition-colors"
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
               <span>🛍️</span> Complete Your Order
            </h2>

            <form onSubmit={handleSubmitOrder} className="space-y-5">
              
              <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200 pb-2">Shipping Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <p className="text-[11px] font-bold text-gray-400">Name</p>
                     <p className="text-[14px] font-bold text-gray-800 break-words">{session?.user?.name}</p>
                   </div>
                   <div>
                     <p className="text-[11px] font-bold text-gray-400">Phone</p>
                     <p className="text-[14px] font-bold text-gray-800 break-words">{session?.user?.phone || 'Not Provided'}</p>
                   </div>
                </div>
                
                <div>
                   <p className="text-[11px] font-bold text-gray-400">Address</p>
                   <p className="text-[14px] font-bold text-gray-800 break-words leading-tight">{session?.user?.address || 'Not Provided'}</p>
                </div>
                
                <p className="text-[10px] text-gray-400 font-semibold pt-1 italic">* You can update these details in your profile settings later. We will lock this snapshot for this order.</p>
              </div>

              {/* Promo Code Section */}
              <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-200/50 pb-2">Order Summary & Discounts</h3>
                
                <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-emerald-100">
                  <div className="space-y-1">
                    <span className="text-[13px] font-bold text-gray-700 block">Unit Price: ₹{startingPrice.toLocaleString('en-IN')}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-bold text-gray-500 uppercase">Quantity</span>
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                        <button 
                          type="button" 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-200 font-black transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-[13px] font-black text-[#1E3A2F] min-w-[30px] text-center border-x border-gray-200">
                          {quantity}
                        </span>
                        <button 
                          type="button" 
                          onClick={() => {
                             if (quantity < pet.stock) setQuantity(quantity + 1);
                          }}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-200 font-black transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                          disabled={quantity >= pet.stock}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Subtotal</span>
                    <span className="text-lg font-black text-emerald-800">₹{(startingPrice * quantity).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {appliedDiscount ? (
                  <div className="flex justify-between items-center text-[13px] font-black text-emerald-600 bg-emerald-100/50 px-3 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span>{appliedDiscount.breakdown}</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={removePromoCode}
                      className="text-red-500 hover:text-red-700 underline text-xs ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2 pt-1">
                    <input 
                      type="text" 
                      placeholder="Discount Code" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      className="flex-1 border-2 border-emerald-200 rounded-lg px-3 py-2 text-sm font-bold uppercase focus:outline-none focus:border-emerald-500 bg-white"
                    />
                    <button 
                      type="button"
                      onClick={handleApplyPromo}
                      disabled={isValidatingPromo || !promoCode}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors disabled:opacity-50"
                    >
                      {isValidatingPromo ? '...' : 'Apply'}
                    </button>
                  </div>
                )}

                <div className="flex justify-between items-center text-lg font-black text-gray-900 border-t border-emerald-200/50 pt-2 mt-2">
                  <span>Total Amount:</span>
                  <span>₹{(appliedDiscount ? appliedDiscount.finalPrice : (startingPrice * quantity)).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Delivery Method</label>
                <select 
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-[14px] px-4 py-3.5 text-[14px] font-bold text-gray-800 focus:outline-none focus:border-[#1E3A2F] transition-colors appearance-none cursor-pointer bg-white shadow-sm"
                >
                  {availableMethods.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#1E3A2F] hover:bg-[#152921] text-white font-bold py-4 rounded-xl shadow-[4px_4px_0px_#A3B18A] hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_#A3B18A]"
              >
                {isSubmitting ? 'Processing...' : 'Confirm Order'}
              </button>
            </form>
          </div>
        </div>
      )}

      {success && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-2xl font-black text-gray-900">Order Placed!</h2>
            <p className="text-gray-500 font-medium text-sm leading-relaxed">
              Your order for the <strong className="text-gray-800">{pet.name}</strong> has been received. Our admin will review it and initiate a chat with you shortly.
            </p>
            <button 
              onClick={() => {
                setSuccess(false);
                setIsModalOpen(false);
                router.push('/orders');
              }}
              className="mt-6 w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-black transition-colors"
            >
              View My Orders
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
