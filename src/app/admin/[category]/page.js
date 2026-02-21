'use client';
import { usePets, useDeletePet } from '@/hooks/usePets';
import { useState } from 'react';
import PetModal from '../PetModal';
import ConfirmModal from '@/components/ConfirmModal';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function CategoryAdminPage() {
  const { category } = useParams();
  const { data: pets, isLoading, isError } = usePets(category);
  const deletePet = useDeletePet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ show: false, id: null });

  const triggerDelete = (id) => setConfirmModal({ show: true, id });

  const handleDelete = (id) => {
    deletePet.mutate(id);
    setConfirmModal({ show: false, id: null });
  };

  const handleEdit = (pet) => {
    setEditingPet(pet);
    setIsModalOpen(true);
  };

  const formattedCategory = category === 'hen' ? 'Fancy Hen' : category;

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-10">
      <div className="bg-white rounded-[24px] p-8 shadow-[0px_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
           <h3 className="text-[20px] font-bold text-gray-900 capitalize">{formattedCategory} Inventory</h3>
           <div className="flex gap-3 items-center">
             <button className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-[13px] font-bold hover:bg-gray-50 transition-colors">
               Filter <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
             </button>
             <button 
               onClick={() => { setEditingPet(null); setIsModalOpen(true); }}
               className="bg-[#1E3A2F] text-white px-5 py-2.5 rounded-xl text-[13px] font-bold shadow-sm hover:bg-[#152e24] transition-colors flex items-center gap-2"
             >
               + <span className="hidden sm:inline">Add New Pet</span>
             </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="text-[11px] text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100">
                <th className="pb-5 pl-2 font-bold">Breed Name</th>
                <th className="pb-5 font-bold">Category</th>
                <th className="pb-5 font-bold">Price (₹)</th>
                <th className="pb-5 font-bold">Status</th>
                <th className="pb-5 font-bold">Date Added</th>
                <th className="pb-5 font-bold text-right pr-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {isLoading && <tr><td colSpan="6" className="py-10 text-center text-gray-400 font-semibold">Syncing inventory...</td></tr>}
              {isError && <tr><td colSpan="6" className="py-10 text-center text-red-500 font-semibold">Error syncing data.</td></tr>}
              {!isLoading && !isError && pets?.length === 0 && <tr><td colSpan="6" className="py-10 text-center text-gray-400 font-semibold">No records found. Start adding inventory!</td></tr>}
              
              {!isLoading && pets?.map((pet) => (
                <tr key={pet._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 pl-2">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-[12px] overflow-hidden bg-gray-100 relative border border-gray-200">
                        <Image src={pet.mainImage} alt={pet.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-[14px]">{pet.name}</p>
                        <p className="text-[12px] font-medium text-gray-400 truncate max-w-[180px] mt-0.5">{pet.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 align-middle">
                    <span className="capitalize font-bold text-gray-600">{pet.category}</span>
                  </td>
                  <td className="py-4 align-middle">
                    <div className="flex flex-col">
                       {pet.discountedPrice ? (
                         <>
                           <span className="text-[13px] font-black text-emerald-600">₹{pet.discountedPrice.toLocaleString('en-IN')}</span>
                           <span className="text-[11px] font-bold text-gray-400 line-through">₹{pet.basePrice?.toLocaleString('en-IN')}</span>
                         </>
                       ) : (
                         <span className="text-[13px] font-bold text-gray-700">₹{pet.basePrice?.toLocaleString('en-IN') || 'N/A'}</span>
                       )}
                    </div>
                  </td>
                  <td className="py-4 align-middle">
                    <span className={`text-[11px] font-bold px-3 py-1.5 rounded-lg ${pet.avail?.toLowerCase() === 'available' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                      {pet.avail}
                    </span>
                  </td>
                  <td className="py-4 text-gray-500 font-semibold align-middle">
                    {new Date(pet.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="py-4 text-right pr-4 align-middle">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => handleEdit(pet)} className="p-2 text-gray-400 hover:text-[#1E3A2F] hover:bg-gray-100 rounded-lg transition-all">
                        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                      </button>
                      <button onClick={() => triggerDelete(pet._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <PetModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          initialData={editingPet} 
          initialCategory={category}
        />
      )}

      {confirmModal.show && (
        <ConfirmModal 
          message={`Are you sure you want to permanently delete this ${formattedCategory}? This action cannot be undone.`}
          onConfirm={() => handleDelete(confirmModal.id)}
          onCancel={() => setConfirmModal({ show: false, id: null })}
          confirmText="Yes, Delete Member"
        />
      )}
    </div>
  );
}
