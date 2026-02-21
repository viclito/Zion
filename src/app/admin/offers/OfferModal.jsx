'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiX, FiUploadCloud, FiClock, FiTag, FiLink } from 'react-icons/fi';
import AlertModal from '@/components/AlertModal';

export default function OfferModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discountCode: '',
    discountType: 'none',
    discountValue: '',
    freeItemDescription: '',
    minOrderValue: '',
    targetLink: '/',
    isActive: true,
    validUntil: '', 
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        discountCode: initialData.discountCode || '',
        discountType: initialData.discountType || 'none',
        discountValue: initialData.discountValue || '',
        freeItemDescription: initialData.freeItemDescription || '',
        minOrderValue: initialData.minOrderValue || '',
        targetLink: initialData.targetLink || '/',
        isActive: initialData.isActive ?? true,
        // Format the date string for HTML datetime-local input
        validUntil: initialData.validUntil ? new Date(initialData.validUntil).toISOString().slice(0, 16) : '',
      });
      setImagePreview(initialData.image || '');
      setImageFile(null);
    } else {
      setFormData({
        title: '',
        description: '',
        discountCode: '',
        discountType: 'none',
        discountValue: '',
        freeItemDescription: '',
        minOrderValue: '',
        targetLink: '/',
        isActive: true,
        validUntil: '',
      });
      setImagePreview('');
      setImageFile(null);
    }
  }, [initialData, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalImageUrl = imagePreview;

      // Only upload a new image if the user selected a new file
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('images', imageFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });

        const uploadResult = await uploadRes.json();
        if (!uploadResult.success) throw new Error('Failed to upload image');
        finalImageUrl = uploadResult.urls.images;
      }

      if (!finalImageUrl) {
         setAlertMsg("Please select a promotional image.");
         setIsSubmitting(false);
         return;
      }

      // Convert the HTML datetime-local string to a proper Date object or null
      const processedValidUntil = formData.validUntil ? new Date(formData.validUntil).toISOString() : null;

      const payload = {
        ...formData,
        discountValue: formData.discountValue ? Number(formData.discountValue) : null,
        minOrderValue: formData.minOrderValue ? Number(formData.minOrderValue) : 0,
        image: finalImageUrl,
        validUntil: processedValidUntil,
      };

      await onSubmit(payload);
      onClose();
    } catch (error) {
      console.error('Error saving offer:', error);
      setAlertMsg('Failed to save offer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-fade-in-up">
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-2xl font-black text-gray-900">
              {initialData ? 'Edit Offer' : 'Create Special Offer'}
            </h2>
            <p className="text-sm font-semibold text-gray-500 mt-1">Design your promotional banner & set countdown timers.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors font-bold text-gray-400 hover:text-gray-700"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          
          {/* Active Toggle Switch */}
          <div className="flex items-center justify-between bg-blue-50/50 p-4 rounded-xl border border-blue-100">
            <div>
              <p className="font-bold text-gray-900">Offer Status</p>
              <p className="text-xs font-semibold text-gray-500">Is this promotion actively visible to customers?</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E3A2F]"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-bold text-gray-700">Promotion Title</label>
              <input
                type="text"
                required
                maxLength={100}
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. Weekend Flash Sale!"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#1E3A2F] focus:outline-none transition-colors font-semibold text-gray-800"
              />
            </div>

            <div className="space-y-2 col-span-2">
              <label className="text-sm font-bold text-gray-700">Detailed Description</label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Explain the offer details to your buyers..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#1E3A2F] focus:outline-none transition-colors font-medium text-sm text-gray-700 resize-none"
              />
            </div>

            {/* Campaign Options Grid */}
            <div className="space-y-4 col-span-2 bg-gray-50 p-5 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Campaign Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase font-bold text-gray-500 flex items-center gap-1.5"><FiTag/> Discount Code</label>
                  <input
                    type="text"
                    value={formData.discountCode}
                    onChange={(e) => setFormData({...formData, discountCode: e.target.value})}
                    placeholder="e.g. SILKIE20"
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-[#1E3A2F] focus:outline-none font-black text-gray-800 uppercase"
                  />
                  <p className="text-[10px] text-gray-400 font-semibold px-1">Leave empty to hide.</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase font-bold text-gray-500 flex items-center gap-1.5"><FiClock/> Expires At</label>
                  <input
                    type="datetime-local"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({...formData, validUntil: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-[#1E3A2F] focus:outline-none font-semibold text-gray-800"
                  />
                  <p className="text-[10px] text-gray-400 font-semibold px-1">Live countdown runs until date. Leave empty for no timer.</p>
                </div>

                {/* Advanced Discount Logic */}
                <div className="space-y-1 col-span-2 md:col-span-1">
                  <label className="text-xs uppercase font-bold text-gray-500 flex items-center gap-1.5">Discount Strategy</label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({...formData, discountType: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-[#1E3A2F] focus:outline-none font-bold text-gray-800 bg-white"
                  >
                    <option value="none">No System Discount</option>
                    <option value="percentage">Percentage OFF (%)</option>
                    <option value="fixed_amount">Fixed Amount OFF (₹)</option>
                    <option value="free_item">Free Giveway Gift</option>
                  </select>
                </div>

                {(formData.discountType === 'percentage' || formData.discountType === 'fixed_amount') && (
                  <div className="space-y-1 col-span-2 md:col-span-1">
                    <label className="text-xs uppercase font-bold text-gray-500 flex items-center gap-1.5">
                      Discount Value {formData.discountType === 'percentage' ? '(Max 100)' : '(₹)'}
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder={formData.discountType === 'percentage' ? "e.g. 15" : "e.g. 500"}
                      value={formData.discountValue}
                      onChange={(e) => setFormData({...formData, discountValue: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-[#1E3A2F] focus:outline-none font-bold text-gray-800"
                    />
                  </div>
                )}

                {formData.discountType === 'free_item' && (
                  <div className="space-y-1 col-span-2 md:col-span-1">
                    <label className="text-xs uppercase font-bold text-gray-500 flex items-center gap-1.5">Free Item Description</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Free 1kg Premium Hen Feed"
                      value={formData.freeItemDescription}
                      onChange={(e) => setFormData({...formData, freeItemDescription: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-[#1E3A2F] focus:outline-none font-bold text-gray-800"
                    />
                  </div>
                )}

                <div className="space-y-1 col-span-2 md:col-span-1">
                  <label className="text-xs uppercase font-bold text-gray-500 flex items-center gap-1.5">Min Order Value (₹)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 0 for no minimum"
                    value={formData.minOrderValue}
                    onChange={(e) => setFormData({...formData, minOrderValue: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-[#1E3A2F] focus:outline-none font-bold text-gray-800"
                  />
                  <p className="text-[10px] text-gray-400 font-semibold px-1">Cart total required to use code.</p>
                </div>

                <div className="space-y-1 col-span-2 md:col-span-1">
                  <label className="text-xs uppercase font-bold text-gray-500 flex items-center gap-1.5"><FiLink/> Target Page Link</label>
                  <input
                    type="text"
                    value={formData.targetLink}
                    onChange={(e) => setFormData({...formData, targetLink: e.target.value})}
                    placeholder="e.g. /silkie or /contact"
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-[#1E3A2F] focus:outline-none font-semibold text-gray-800"
                  />
                </div>
              </div>
            </div>

            {/* Image Banner Upload */}
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-bold text-gray-700">Promotion Banner Image</label>
              
              <div 
                className="relative h-48 rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#1E3A2F] bg-gray-50 hover:bg-emerald-50/10 cursor-pointer overflow-hidden group transition-all"
                onClick={() => document.getElementById('offerImageUpload').click()}
              >
                {imagePreview ? (
                  <>
                    <Image 
                      src={imagePreview} 
                      alt="Banner Preview" 
                      fill 
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2">
                        <FiUploadCloud/> Change Cover Image
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <FiUploadCloud className="w-10 h-10 mb-2 opacity-50 text-[var(--text-primary)]" />
                    <p className="font-bold text-sm">Upload Offer Graphic</p>
                    <p className="text-xs font-semibold mt-1 opacity-70">PNG, JPG up to 10MB</p>
                  </div>
                )}
                <input
                  id="offerImageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-4 rounded-xl bg-[#1E3A2F] text-white font-bold shadow-md hover:bg-[#152921] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving Offer to Servers...' : (initialData ? 'Update Promotion' : 'Launch New Offer')}
            </button>
          </div>
        </form>
      </div>

      {/* Global Alert Modal */}
      <AlertModal message={alertMsg} onClose={() => setAlertMsg('')} />
    </div>
  );
}
