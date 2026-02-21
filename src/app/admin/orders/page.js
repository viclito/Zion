'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FiMessageSquare, FiClock, FiCheck, FiXCircle, FiTruck, FiSend } from 'react-icons/fi';
import AlertModal from '@/components/AlertModal';

export default function AdminOrders() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    fetchOrders();

    // Relaxed polling to 10 seconds, and only fetch if the tab is actively visible
    const intervalId = setInterval(() => {
      if (!document.hidden) {
         fetchOrders(true); 
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchOrders = async (silent = false) => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
        
        // If an order is currently selected, update its state silently so new messages appear
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
    if (!replyText.trim()) return;
    setSending(true);

    try {
      const res = await fetch(`/api/orders/${selectedOrder._id}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: replyText }),
      });
      
      const data = await res.json();
      if (data.success) {
        // Update local state to reflect new message and status change
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

  const handleStatusChange = async (newStatus) => {
    try {
      const res = await fetch(`/api/orders/${selectedOrder._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedOrder(data.order);
        setOrders(orders.map(o => o._id === data.order._id ? data.order : o));
      } else {
        setAlertMsg(data.message || 'Failed to update status');
      }
    } catch (err) {
      console.error(err);
      setAlertMsg('Error updating status');
    }
  };

  const handleUpdateETA = async (newDate) => {
    try {
      const res = await fetch(`/api/orders/${selectedOrder._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expectedDeliveryDate: newDate }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedOrder(data.order);
        setOrders(orders.map(o => o._id === data.order._id ? data.order : o));
      } else {
        setAlertMsg(data.message || 'Failed to update ETA');
      }
    } catch (err) {
      console.error(err);
      setAlertMsg('Error updating ETA');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return <div className="flex h-[60vh] items-center justify-center font-bold text-gray-400">Loading Orders...</div>;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto custom-scrollbar">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Order Management</h1>
          <p className="text-sm text-gray-500 font-semibold mt-1">Review incoming purchases and chat with buyers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh]">
        {/* Order List */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Recent Orders
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {orders.length === 0 ? (
              <div className="text-center p-6 text-gray-400 text-sm font-semibold">No orders found.</div>
            ) : (
              orders.map(order => (
                <div 
                  key={order._id}
                  onClick={() => setSelectedOrder(order)}
                  className={`p-4 rounded-xl cursor-pointer border-2 transition-all ${
                    selectedOrder?._id === order._id 
                      ? 'border-[#1E3A2F] bg-[#1E3A2F]/5' 
                      : 'border-transparent bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-gray-900 text-sm truncate pr-2">
                      {order.customerSnapshot.name}
                    </p>
                    <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <span className="truncate">{order.petId?.name || 'Unknown Pet'}</span>
                    <span>•</span>
                    <span className="truncate">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Order Details & Chat */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col relative">
          {!selectedOrder ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 space-y-4">
              <FiMessageSquare className="w-12 h-12 opacity-50" />
              <p className="font-bold">Select an order to view details & chat</p>
            </div>
          ) : (
            <>
              {/* Header Info */}
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <div className="flex gap-6 items-start">
                  {selectedOrder.petId?.mainImage && (
                    <div className="w-24 h-24 rounded-xl border-4 border-white shadow-md overflow-hidden bg-gray-100 shrink-0">
                      <Image 
                        src={selectedOrder.petId.mainImage} 
                        alt="Pet" 
                        width={100} 
                        height={100} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-black text-gray-900">{selectedOrder.petId?.name || 'Unknown Pet'}</h2>
                        <p className="text-sm font-bold text-gray-500 capitalize">{selectedOrder.petId?.category} Breeder</p>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <select 
                          value={selectedOrder.status}
                          onChange={(e) => handleStatusChange(e.target.value)}
                          className={`text-xs uppercase font-black px-3 py-1.5 rounded border outline-none cursor-pointer appearance-none ${getStatusColor(selectedOrder.status)}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] font-bold text-gray-400 uppercase">ETA:</span>
                           <input 
                             type="date" 
                             value={selectedOrder.expectedDeliveryDate ? new Date(selectedOrder.expectedDeliveryDate).toISOString().split('T')[0] : ''}
                             onChange={(e) => handleUpdateETA(e.target.value)}
                             className="text-xs font-semibold px-2 py-1 rounded border border-gray-200 text-gray-700 focus:outline-none focus:border-[#1E3A2F]"
                           />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4 bg-white p-3 rounded-xl border border-gray-100">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400">Buyer</p>
                        <p className="text-[13px] font-bold text-gray-800">{selectedOrder.customerSnapshot.name}</p>
                        <p className="text-[12px] text-gray-500">{selectedOrder.customerSnapshot.phone}</p>
                      </div>
                      <div>
                         <p className="text-[10px] uppercase font-bold text-gray-400">Shipping Selection</p>
                         <p className="text-[13px] font-bold text-[#1E3A2F] flex items-center gap-1.5"><FiTruck/> {selectedOrder.deliveryMethod}</p>
                      </div>
                    </div>
                    
                    {/* Customer Feedback Display */}
                    {selectedOrder.rating && (
                      <div className="mt-4 bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                           <span className="text-[10px] uppercase font-black text-yellow-700 tracking-wider">Customer Feedback</span>
                           <div className="flex items-center text-yellow-500 text-sm">
                              {'★'.repeat(selectedOrder.rating)}{'☆'.repeat(5 - selectedOrder.rating)}
                           </div>
                        </div>
                        <p className="text-sm font-semibold text-gray-800 italic">&quot;{selectedOrder.feedback || 'No written feedback provided.'}&quot;</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30">
                {selectedOrder.messages.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-500 mb-3">
                      <FiMessageSquare className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-gray-500">No messages yet.</p>
                    <p className="text-xs text-gray-400 mt-1">Reply below to initiate the chat process & notify the buyer.</p>
                  </div>
                ) : (
                  selectedOrder.messages.map((msg, i) => (
                    <div key={i} className={`flex flex-col max-w-[80%] ${msg.sender === 'admin' ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                      <div className={`px-4 py-2.5 rounded-2xl shadow-sm text-[14px] font-medium leading-relaxed ${
                        msg.sender === 'admin' 
                          ? 'bg-[#1E3A2F] text-white rounded-tr-sm' 
                          : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 mt-1 px-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input */}
              <div className="p-4 bg-white border-t border-gray-100">
                <form onSubmit={handleSendReply} className="flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={selectedOrder.messages.length === 0 ? "Send first message to unlock user reply capability..." : "Type your reply..."}
                    className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-gray-800 focus:outline-none focus:border-[#1E3A2F] transition-colors"
                  />
                  <button 
                    type="submit"
                    disabled={sending || !replyText.trim()}
                    className="bg-[#1E3A2F] text-white px-6 rounded-xl font-bold shadow-md hover:bg-[#152921] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {sending ? '...' : <FiSend className="w-5 h-5"/>}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Global Alert Modal */}
      <AlertModal message={alertMsg} onClose={() => setAlertMsg('')} />
    </div>
  );
}
