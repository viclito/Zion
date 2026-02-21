'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AlertModal from '@/components/AlertModal';

export default function UserOrders() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackHover, setFeedbackHover] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    let intervalId;
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchOrders();
      // Relaxed polling to 10 seconds, and only fetch if the tab is actively visible
      intervalId = setInterval(() => {
        if (!document.hidden) {
           fetchOrders(true);
        }
      }, 10000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [status, router]);

  const fetchOrders = async (silent = false) => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);

        if (silent) {
           setSelectedOrder(currentSelected => {
              if (!currentSelected) return null;
              const updated = data.orders.find(o => o._id === currentSelected._id);
              return updated || currentSelected;
           });
        }
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedOrder?.adminHasReplied) return;
    setSending(true);

    try {
      const res = await fetch(`/api/orders/${selectedOrder._id}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: replyText }),
      });
      
      const data = await res.json();
      if (data.success) {
        setSelectedOrder(data.order);
        setOrders(orders.map(o => o._id === data.order._id ? data.order : o));
        setReplyText('');
      } else {
        setAlertMsg(data.message || 'Failed to send message');
      }
    } catch (err) {
      console.error(err);
      setAlertMsg('Error sending message');
    } finally {
      setSending(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!selectedOrder) return;
    
    setCancelling(true);
    try {
      const res = await fetch(`/api/orders/${selectedOrder._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Cancelled' }),
      });
      
      const data = await res.json();
      if (data.success) {
        setSelectedOrder(data.order);
        setOrders(orders.map(o => o._id === data.order._id ? data.order : o));
        setShowCancelModal(false);
      } else {
        setAlertMsg(data.message || 'Failed to cancel order.');
      }
    } catch (err) {
      console.error(err);
      setAlertMsg('An error occurred while trying to cancel the order.');
    } finally {
      setCancelling(false);
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!selectedOrder || feedbackRating === 0) return;
    setSubmittingFeedback(true);

    try {
      const res = await fetch(`/api/orders/${selectedOrder._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: feedbackRating, feedback: feedbackText }),
      });
      
      const data = await res.json();
      if (data.success) {
        setSelectedOrder(data.order);
        setOrders(orders.map(o => o._id === data.order._id ? data.order : o));
        setAlertMsg('Thank you! Your feedback has been submitted successfully.');
      } else {
        setAlertMsg(data.message || 'Failed to submit feedback.');
      }
    } catch (err) {
      console.error(err);
      setAlertMsg('Error submitting feedback.');
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex flex-col justify-between font-[family-name:var(--font-nunito)]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center font-bold text-gray-400">Loading your orders...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between font-[family-name:var(--font-nunito)] bg-[#FDFBF7]">
      <Navbar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-[var(--text-primary)]">My Orders</h1>
          <p className="text-gray-500 font-semibold mt-2">Track your purchases and view messages from the breeder.</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white border-2 border-gray-100 rounded-3xl p-12 text-center shadow-sm">
             <span className="text-6xl mb-4 block">📦</span>
             <h2 className="text-xl font-bold text-gray-800">No orders yet</h2>
             <p className="text-gray-500 mt-2 font-medium">Head over to the breeds catalog to place your first order.</p>
             <button onClick={() => router.push('/')} className="mt-6 bg-[var(--text-primary)] hover:bg-[#1E3A2F] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md">
               Explore Birds
             </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order History List */}
            <div className="lg:col-span-1 space-y-4">
              {orders.map(order => (
                <div 
                  key={order._id}
                  onClick={() => setSelectedOrder(order)}
                  className={`p-5 rounded-2xl cursor-pointer border-2 transition-all ${
                    selectedOrder?._id === order._id 
                      ? 'border-[var(--text-primary)] bg-white shadow-[4px_4px_0px_var(--text-primary)] -translate-y-1' 
                      : 'border-gray-200 bg-white hover:border-[var(--text-primary)]/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-[11px] uppercase tracking-wider font-black px-2.5 py-1 rounded-md border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="text-xs font-bold text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  {/* ETA Display for Cards */}
                  {order.expectedDeliveryDate && ['Pending', 'Processing', 'Shipped'].includes(order.status) && (
                    <div className="mb-3 bg-blue-50 text-blue-700 text-[11px] font-bold px-3 py-1.5 rounded-lg inline-block border border-blue-100">
                       ETA: {new Date(order.expectedDeliveryDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4">
                    {order.petId?.mainImage ? (
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                        <Image src={order.petId.mainImage} alt="Pet" width={64} height={64} className="w-full h-full object-cover"/>
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-gray-100 border border-gray-200 shrink-0"></div>
                    )}
                    <div>
                      <p className="font-black text-gray-900 leading-tight">{order.petId?.name || 'Unknown Pet'}</p>
                      <p className="text-[12px] font-bold text-gray-500 mt-1 flex items-center gap-1.5 capitalize">
                         <span>🚚</span> {order.deliveryMethod}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat View */}
            <div className="lg:col-span-2">
              {!selectedOrder ? (
                <div className="h-full min-h-[400px] bg-white border-2 border-gray-100 rounded-3xl flex flex-col items-center justify-center text-gray-400 p-8 text-center shadow-sm">
                  <span className="text-5xl mb-4">💬</span>
                  <p className="font-bold text-lg text-gray-800">Order Communication</p>
                  <p className="font-medium mt-2">Select an order on the left to view the dedicated chat thread.</p>
                </div>
              ) : (
                <div className="bg-white border-2 border-gray-200 rounded-3xl flex flex-col h-[70vh] shadow-lg overflow-hidden relative">
                  {/* Chat Header */}
                  <div className="p-5 border-b-2 border-gray-100 flex items-center justify-between gap-4 bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--text-primary)] text-white flex items-center justify-center font-black text-xl">Z</div>
                      <div>
                        <h3 className="font-black text-gray-900 leading-tight">Zion Support</h3>
                        <p className="text-[12px] font-bold text-gray-500">Regarding: {selectedOrder.petId?.name}</p>
                        
                        {/* ETA Display in Header */}
                        {selectedOrder.expectedDeliveryDate && ['Pending', 'Processing', 'Shipped'].includes(selectedOrder.status) && (
                          <p className="text-[12px] font-bold text-blue-600 mt-1 flex items-center gap-1">
                             <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span> 
                             Expected Delivery: {new Date(selectedOrder.expectedDeliveryDate).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Cancellation Button Trigger */}
                    {['Pending', 'Processing'].includes(selectedOrder.status) && (
                       <button
                         onClick={() => setShowCancelModal(true)}
                         className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold px-4 py-2 rounded-xl text-sm transition-colors shadow-sm"
                       >
                         Cancel Order
                       </button>
                    )}
                  </div>

                  {/* Messages Window */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {selectedOrder.messages.length === 0 ? (
                      <div className="text-center py-12">
                         <span className="block text-4xl mb-3">🕒</span>
                         <p className="font-bold text-gray-700">Order Submitted Successfully</p>
                         <p className="text-sm font-medium text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
                           Our team is currently reviewing your order for the {selectedOrder.petId?.name}. 
                           We will initiate a chat with you here very soon!
                         </p>
                      </div>
                    ) : (
                      selectedOrder.messages.map((msg, i) => (
                        <div key={i} className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                          <div className={`px-5 py-3 rounded-2xl text-[14px] font-semibold leading-relaxed shadow-sm ${
                            msg.sender === 'user' 
                              ? 'bg-[var(--text-primary)] text-white rounded-br-sm' 
                              : 'bg-gray-100 border border-gray-200 text-gray-800 rounded-bl-sm'
                          }`}>
                            {msg.text}
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 mt-1.5 px-1">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Custom Input Area / Feedback System */}
                  <div className="p-4 bg-white border-t-2 border-gray-100">
                    
                    {/* Post-Delivery Feedback State */}
                    {['Delivered', 'Completed'].includes(selectedOrder.status) ? (
                      selectedOrder.rating ? (
                         // Feedback Already Submitted
                         <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center shadow-inner">
                           <div className="text-4xl mb-3 text-emerald-500">🎉</div>
                           <h4 className="font-black text-emerald-800 text-lg">Thank you for your feedback!</h4>
                           <div className="flex justify-center text-yellow-500 text-xl my-2">
                             {'★'.repeat(selectedOrder.rating)}{'☆'.repeat(5 - selectedOrder.rating)}
                           </div>
                           {selectedOrder.feedback && <p className="text-emerald-700 text-sm font-semibold italic mt-2">&quot;{selectedOrder.feedback}&quot;</p>}
                         </div>
                      ) : (
                         // Feedback Form
                         <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
                           <div className="text-center mb-4">
                             <h4 className="font-black text-gray-900 text-lg">How did we do?</h4>
                             <p className="text-sm font-semibold text-gray-500 mt-1">Your order has arrived! Please rate your experience.</p>
                           </div>
                           
                           <form onSubmit={handleSubmitFeedback} className="flex flex-col gap-4 max-w-sm mx-auto">
                             <div className="flex justify-center gap-2">
                               {[1, 2, 3, 4, 5].map((star) => (
                                 <button
                                   key={star}
                                   type="button"
                                   onClick={() => setFeedbackRating(star)}
                                   onMouseEnter={() => setFeedbackHover(star)}
                                   onMouseLeave={() => setFeedbackHover(0)}
                                   className="text-4xl focus:outline-none transition-transform hover:scale-110"
                                 >
                                   <span className={(feedbackHover || feedbackRating) >= star ? 'text-yellow-400 drop-shadow-md' : 'text-gray-300'}>
                                     ★
                                   </span>
                                 </button>
                               ))}
                             </div>
                             
                             <textarea
                               value={feedbackText}
                               onChange={(e) => setFeedbackText(e.target.value)}
                               placeholder="Tell us what you loved (optional)"
                               rows="2"
                               className="w-full border-2 border-white rounded-xl px-4 py-3 text-sm font-medium text-gray-700 focus:outline-none focus:border-blue-300 shadow-sm resize-none bg-blue-50/30"
                             />
                             
                             <button 
                               type="submit"
                               disabled={submittingFeedback || feedbackRating === 0}
                               className="w-full bg-[var(--text-primary)] text-white py-3 rounded-xl font-black hover:bg-[#1E3A2F] transition-all disabled:opacity-50 disabled:bg-gray-400 shadow-md active:translate-y-0.5"
                             >
                               {submittingFeedback ? 'Submitting...' : 'Submit Feedback'}
                             </button>
                           </form>
                         </div>
                      )
                    ) : selectedOrder.status === 'Cancelled' ? (
                       <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                          <p className="text-xs font-bold text-red-700">🚫 Information: This order has been cancelled. The chat is now closed.</p>
                       </div>
                    ) : !selectedOrder.adminHasReplied ? (
                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-center">
                         <p className="text-xs font-bold text-orange-700">🔒 Chat is locked until an administrator initiates contact.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSendReply} className="flex gap-3">
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your reply here..."
                          className="flex-1 border-2 border-gray-200 rounded-xl px-5 py-3 text-[14px] font-semibold text-gray-800 focus:outline-none focus:border-[var(--text-primary)] transition-colors shadow-sm"
                        />
                        <button 
                          type="submit"
                          disabled={sending || !replyText.trim()}
                          className="bg-[var(--text-primary)] text-white px-8 rounded-xl font-black hover:bg-[#1E3A2F] transition-all disabled:opacity-50 flex items-center gap-2 active:scale-95"
                        >
                          {sending ? '...' : 'Send'}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      
      
      {/* Custom Cancellation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCancelModal(false)}></div>
          
          {/* Modal Container */}
          <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border-4 border-[var(--text-primary)] transform transition-all animate-bounce-in">
             <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 font-black border-4 border-white shadow-md">
               !
             </div>
             
             <h3 className="text-2xl font-black text-center text-gray-900 mb-2">Cancel Order?</h3>
             <p className="text-center text-gray-600 font-semibold mb-8">
               Are you absolutely sure you want to cancel your order for the <span className="text-gray-900 font-bold">{selectedOrder?.petId?.name}</span>? This action cannot be undone.
             </p>
             
             <div className="flex flex-col gap-3">
               <button 
                 onClick={handleCancelOrder}
                 disabled={cancelling}
                 className="w-full bg-[var(--accent-coral)] text-white hover:bg-red-700 font-black py-4 rounded-xl transition-colors border-2 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] active:translate-y-1 active:shadow-none disabled:opacity-50 flex items-center justify-center gap-2"
               >
                 {cancelling ? 'Cancelling...' : 'Yes, Cancel Order'}
               </button>
               <button 
                 onClick={() => setShowCancelModal(false)}
                 disabled={cancelling}
                 className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 rounded-xl transition-colors disabled:opacity-50"
               >
                 No, Keep My Order
               </button>
             </div>
          </div>
        </div>
      )}

      {/* Global Alert Modal */}
      <AlertModal message={alertMsg} onClose={() => setAlertMsg('')} />

      <Footer />
    </div>
  );
}
