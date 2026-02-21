'use client';
import { useState, useEffect } from 'react';
import { FiMail, FiPhone, FiTrash2, FiCheckCircle, FiInbox, FiArchive, FiTag } from 'react-icons/fi';
import AlertModal from '@/components/AlertModal';
import ConfirmModal from '@/components/ConfirmModal';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertMsg, setAlertMsg] = useState('');
  const [confirmModal, setConfirmModal] = useState({ show: false, id: null });

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries(inquiries.map(inq => inq._id === id ? data.inquiry : inq));
      } else {
        setAlertMsg(data.message || 'Failed to update status');
      }
    } catch (err) {
      console.error(err);
      setAlertMsg('Error updating status');
    }
  };

  const deleteInquiry = async (id) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setInquiries(inquiries.filter(inq => inq._id !== id));
        setConfirmModal({ show: false, id: null });
      } else {
        setAlertMsg(data.message || 'Failed to delete inquiry');
      }
    } catch (err) {
      console.error(err);
      setAlertMsg('Error deleting inquiry');
    }
  };

  const triggerDelete = (id) => {
    setConfirmModal({ show: true, id });
  };

  if (loading) {
    return <div className="flex h-[60vh] items-center justify-center font-bold text-gray-400">Loading Inquiries...</div>;
  }

  // Derived counts
  const newCount = inquiries.filter(i => i.status === 'New').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto custom-scrollbar">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <span className="text-3xl">📨</span> Inbox & Inquiries
          </h1>
          <p className="text-sm font-semibold text-gray-500 mt-1">Manage Direct Contact forms and Custom Pet Sourcing queries.</p>
        </div>
        
        {newCount > 0 && (
          <div className="bg-red-50 text-red-600 px-5 py-2.5 rounded-xl font-bold border border-red-100 flex items-center gap-2 animate-pulse">
            <FiInbox className="w-5 h-5"/> {newCount} Unread Message{newCount !== 1 && 's'}
          </div>
        )}
      </div>

      {/* Main List */}
      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center">
             <span className="text-6xl mb-4 block opacity-50">📭</span>
             <h2 className="text-xl font-bold text-gray-800">Your Inbox is Empty</h2>
             <p className="text-gray-500 mt-2 font-medium max-w-md">When customers submit &apos;Contact Us&apos; forms or ask about specific pets, they will securely appear in this list.</p>
          </div>
        ) : (
          inquiries.map((inquiry) => {
            const isUnread = inquiry.status === 'New';
            
            return (
              <div 
                key={inquiry._id} 
                className={`bg-white rounded-2xl p-6 shadow-sm border-l-8 transition-all hover:shadow-md ${
                  isUnread ? 'border-l-blue-500 border-y border-r border-gray-200' : 
                  inquiry.status === 'Archived' ? 'border-l-gray-300 opacity-60 border-y border-r border-gray-100' :
                  'border-l-emerald-500 border-y border-r border-gray-100'
                }`}
              >
                <div className="flex flex-col xl:flex-row justify-between gap-6">
                  
                  {/* Message Detail Block */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className={`text-xl ${isUnread ? 'font-black text-gray-900' : 'font-bold text-gray-800'}`}>
                            {inquiry.name}
                          </h3>
                          <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-md ${
                            inquiry.type === 'Pet Inquiry' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {inquiry.type}
                          </span>
                          <span className="text-xs font-semibold text-gray-400 border-l border-gray-300 pl-3">
                            {new Date(inquiry.createdAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'})}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm font-semibold text-gray-500 flex-wrap">
                           {inquiry.email && (
                             <span className="flex items-center gap-1.5"><FiMail className="w-4 h-4"/> <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline">{inquiry.email}</a></span>
                           )}
                           <span className="flex items-center gap-1.5"><FiPhone className="w-4 h-4"/> <a href={`tel:${inquiry.phone}`} className="text-blue-600 hover:underline">{inquiry.phone}</a></span>
                           {inquiry.category && inquiry.category !== 'General' && (
                             <span className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100"><FiTag className="w-3.5 h-3.5"/> {inquiry.category}</span>
                           )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 relative">
                      {isUnread && <span className="absolute top-4 -left-1.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></span>}
                      <h4 className={`font-bold text-sm mb-1 ${isUnread ? 'text-gray-900' : 'text-gray-700'}`}>
                        {inquiry.subject || 'No Subject Provided'}
                      </h4>
                      <p className={`text-sm leading-relaxed whitespace-pre-wrap ${isUnread ? 'text-gray-800 font-medium' : 'text-gray-600 font-normal'}`}>
                        {inquiry.message}
                      </p>
                    </div>
                  </div>

                  {/* Actions Sidebar */}
                  <div className="flex xl:flex-col gap-3 justify-end xl:w-48 shrink-0">
                    {isUnread ? (
                      <button 
                        onClick={() => updateStatus(inquiry._id, 'Read')}
                        className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl transition-colors border border-emerald-200"
                      >
                        <FiCheckCircle className="w-4 h-4"/> Mark Read
                      </button>
                    ) : (
                      <button 
                        onClick={() => updateStatus(inquiry._id, 'New')}
                        className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-xl transition-colors border border-gray-200"
                      >
                        <FiInbox className="w-4 h-4"/> Mark Unread
                      </button>
                    )}

                    {inquiry.status !== 'Archived' && (
                      <button 
                        onClick={() => updateStatus(inquiry._id, 'Archived')}
                        className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl transition-colors border border-indigo-200"
                      >
                        <FiArchive className="w-4 h-4"/> Archive
                      </button>
                    )}

                    <button 
                      onClick={() => triggerDelete(inquiry._id)}
                      className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-xl transition-colors border border-red-200"
                    >
                      <FiTrash2 className="w-4 h-4"/> Trash
                    </button>
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modals */}
      <AlertModal message={alertMsg} onClose={() => setAlertMsg('')} />
      {confirmModal.show && (
        <ConfirmModal 
          message="Are you sure you want to permanently delete this message? This action cannot be undone."
          onConfirm={() => deleteInquiry(confirmModal.id)}
          onCancel={() => setConfirmModal({ show: false, id: null })}
          confirmText="Yes, Delete Message"
        />
      )}
    </div>
  );
}
