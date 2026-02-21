'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiPlus, FiEdit2, FiTrash2, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import OfferModal from './OfferModal';
import AlertModal from '@/components/AlertModal';
import ConfirmModal from '@/components/ConfirmModal';

export default function AdminOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [alertMsg, setAlertMsg] = useState('');
  const [confirmModal, setConfirmModal] = useState({ show: false, id: null });

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      // Fetching all offers for the admin panel, ignoring the activeOnly public flag
      const res = await fetch('/api/offers');
      const data = await res.json();
      if (data.success) {
        setOffers(data.offers);
      }
    } catch (err) {
      console.error('Failed to fetch offers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOffer = async (formData) => {
    try {
      const res = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setOffers([data.offer, ...offers]);
      } else {
        setAlertMsg(data.message || 'Failed to create offer');
      }
    } catch (err) {
      console.error(err);
      setAlertMsg('Error creating offer');
    }
  };

  const handleUpdateOffer = async (formData) => {
    try {
      const res = await fetch(`/api/offers/${editingOffer._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setOffers(offers.map(o => o._id === data.offer._id ? data.offer : o));
      } else {
        setAlertMsg(data.message || 'Failed to update offer');
      }
    } catch (err) {
      console.error(err);
      setAlertMsg('Error updating offer');
    }
  };

  const handleDeleteOffer = async (id) => {
    try {
      const res = await fetch(`/api/offers/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setOffers(offers.filter(o => o._id !== id));
        setConfirmModal({ show: false, id: null });
      } else {
        setAlertMsg(data.message || 'Failed to delete offer');
      }
    } catch (err) {
      console.error(err);
      setAlertMsg('Error deleting offer');
    }
  };

  const triggerDelete = (id) => {
    setConfirmModal({ show: true, id });
  };

  if (loading) {
    return <div className="flex h-[60vh] items-center justify-center font-bold text-gray-400">Loading Promotional Campaigns...</div>;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto custom-scrollbar">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <span className="text-3xl">🎁</span> Offers & Promotions
          </h1>
          <p className="text-sm font-semibold text-gray-500 mt-1">Manage Flash Sales, Discounts, and the Home Page Banner features.</p>
        </div>
        <button
          onClick={() => {
            setEditingOffer(null);
            setIsModalOpen(true);
          }}
          className="bg-[#1E3A2F] text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-[#152921] transition-colors font-bold shadow-md active:scale-95"
        >
          <FiPlus className="w-5 h-5"/> Launch New Offer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center">
             <span className="text-6xl mb-4 block opacity-50">🏷️</span>
             <h2 className="text-xl font-bold text-gray-800">No Active Promotions</h2>
             <p className="text-gray-500 mt-2 font-medium max-w-md">You haven&apos;t launched any special offers yet. Click the button above to create your first flash sale or promotional banner for the homepage!</p>
          </div>
        ) : (
          offers.map(offer => {
            const isExpired = offer.validUntil ? new Date(offer.validUntil) < new Date() : false;

            return (
              <div key={offer._id} className={`bg-white rounded-2xl overflow-hidden shadow-sm border-2 transition-all hover:shadow-md ${!offer.isActive || isExpired ? 'border-gray-200 opacity-70 grayscale-[30%]' : 'border-gray-100 hover:border-[#1E3A2F]/30'}`}>
                {/* Image Header */}
                <div className="relative h-48 w-full bg-gray-100 border-b border-gray-100">
                   <Image 
                     src={offer.image} 
                     alt={offer.title} 
                     fill 
                     className="object-cover"
                   />
                   
                   {/* Status Badges */}
                   <div className="absolute top-4 left-4 flex flex-col gap-2">
                     <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider shadow-sm backdrop-blur-md ${offer.isActive ? 'bg-emerald-500/90 text-white' : 'bg-gray-500/90 text-white'}`}>
                       {offer.isActive ? <FiCheckCircle/> : <FiXCircle/>}
                       {offer.isActive ? 'Active' : 'Hidden'}
                     </span>
                     
                     {isExpired && (
                       <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider shadow-sm backdrop-blur-md bg-red-500/90 text-white">
                         <FiClock/> Expired
                       </span>
                     )}
                   </div>

                   {/* Discount Badge overlay */}
                   {offer.discountCode && (
                     <div className="absolute -bottom-4 right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-xl text-sm font-black shadow-lg transform rotate-[-5deg] border-2 border-white">
                        {offer.discountCode}
                     </div>
                   )}
                </div>

                <div className="p-6">
                  <h3 className="font-black text-xl text-gray-900 truncate pr-6 mb-2">{offer.title}</h3>
                  <p className="text-sm font-semibold text-gray-500 line-clamp-2 mb-4 h-10">{offer.description}</p>
                  
                  <div className="flex items-center gap-2 mb-6">
                    <FiClock className="text-gray-400 shrink-0"/>
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${isExpired ? 'text-red-500' : 'text-gray-500'}`}>
                      {offer.validUntil ? `Ends: ${new Date(offer.validUntil).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'})}` : 'No Expiration Set'}
                    </span>
                  </div>

                  <div className="flex gap-2 justify-end border-t border-gray-100 pt-4">
                    <button 
                      onClick={() => {
                        setEditingOffer(offer);
                        setIsModalOpen(true);
                      }}
                      className="p-2 text-blue-600 bg-blue-50 focus:bg-blue-100 hover:bg-blue-100 rounded-lg transition-colors font-bold text-sm flex items-center gap-2 px-4 shadow-sm"
                    >
                      <FiEdit2 className="w-4 h-4"/> Edit
                    </button>
                    <button 
                      onClick={() => triggerDelete(offer._id)}
                      className="p-2 text-red-600 bg-red-50 focus:bg-red-100 hover:bg-red-100 rounded-lg transition-colors font-bold text-sm flex items-center gap-2 px-4 shadow-sm"
                    >
                      <FiTrash2 className="w-4 h-4"/> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <OfferModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingOffer(null);
        }}
        onSubmit={editingOffer ? handleUpdateOffer : handleCreateOffer}
        initialData={editingOffer}
      />

      {/* Modals */}
      <AlertModal message={alertMsg} onClose={() => setAlertMsg('')} />
      {confirmModal.show && (
        <ConfirmModal 
          message="Are you sure you want to permanently delete this promotional campaign? This action cannot be undone."
          onConfirm={() => handleDeleteOffer(confirmModal.id)}
          onCancel={() => setConfirmModal({ show: false, id: null })}
          confirmText="Yes, Delete Campaign"
        />
      )}
    </div>
  );
}
