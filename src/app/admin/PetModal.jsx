'use client';
import { useState, useEffect } from 'react';
import { useAddPet, useUpdatePet } from '@/hooks/usePets';
import AlertModal from '@/components/AlertModal';

export default function PetModal({ isOpen, onClose, initialData, initialCategory = 'silkie' }) {
  const [formData, setFormData] = useState({
    name: '',
    category: initialCategory,
    avail: 'Available',
    description: '',
    basePrice: '',
    discountedPrice: '',
    stock: 1,
    allowedDeliveryMethods: ['Come and collect the product'],
  });

  // Main Image State
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState('');

  // Gallery Images State (Max 3)
  const [galleryFiles, setGalleryFiles] = useState([null, null, null]);
  const [galleryPreviews, setGalleryPreviews] = useState(['', '', '']);
  
  const [isUploading, setIsUploading] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const addPet = useAddPet();
  const updatePet = useUpdatePet();

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        category: initialData.category,
        avail: initialData.avail,
        description: initialData.description,
        basePrice: initialData.basePrice || '',
        discountedPrice: initialData.discountedPrice || '',
        stock: initialData.stock !== undefined ? initialData.stock : 1,
        allowedDeliveryMethods: Array.isArray(initialData.allowedDeliveryMethods) && initialData.allowedDeliveryMethods.length > 0
          ? initialData.allowedDeliveryMethods
          : ['Come and collect the product'],
      });
      setMainImagePreview(initialData.mainImage);
      
      // Load existing gallery images
      const initialGallery = ['', '', ''];
      if (initialData.gallery && Array.isArray(initialData.gallery)) {
         initialData.gallery.forEach((url, i) => {
           if (i < 3) initialGallery[i] = url;
         });
      }
      setGalleryPreviews(initialGallery);
    }
  }, [initialData]);

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newFiles = [...galleryFiles];
      newFiles[index] = file;
      setGalleryFiles(newFiles);

      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...galleryPreviews];
        newPreviews[index] = reader.result;
        setGalleryPreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeGalleryImage = (index) => {
     // Remove file
     const newFiles = [...galleryFiles];
     newFiles[index] = null;
     setGalleryFiles(newFiles);
     
     // Remove preview (if it was an existing URL, this also marks it for removal from the final array)
     const newPreviews = [...galleryPreviews];
     newPreviews[index] = '';
     setGalleryPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const uploadData = new FormData();
      let hasFilesToUpload = false;

      // Append Main Image if newly selected
      if (mainImageFile) {
         uploadData.append('mainImage', mainImageFile);
         hasFilesToUpload = true;
      }
      
      // Append Gallery Images if newly selected
      galleryFiles.forEach((file, index) => {
         if (file) {
           uploadData.append(`gallery${index}`, file);
           hasFilesToUpload = true;
         }
      });

      // Upload if there are any files
      let uploadedUrls = {};
      if (hasFilesToUpload) {
         const uploadRes = await fetch('/api/upload', {
           method: 'POST',
           body: uploadData
         });
         
         const uploadJson = await uploadRes.json();
         if (!uploadJson.success) throw new Error(uploadJson.message);
         uploadedUrls = uploadJson.urls;
      }

      // Merge Main Image
      const finalMainImage = uploadedUrls['mainImage'] || mainImagePreview;
      
      // Merge Gallery Images
      // We look at `galleryPreviews` to see which slots are active.
      // If a slot has an uploaded URL, we use that. Else if it has an existing preview (not a data:image base64), we keep it.
      const finalGallery = [];
      galleryPreviews.forEach((preview, index) => {
         if (uploadedUrls[`gallery${index}`]) {
            finalGallery.push(uploadedUrls[`gallery${index}`]);
         } else if (preview && !preview.startsWith('data:image')) {
            finalGallery.push(preview);
         }
      });

      const parsedBasePrice = Number(formData.basePrice);
      const parsedDiscountedPrice = formData.discountedPrice ? Number(formData.discountedPrice) : null;

      if (parsedDiscountedPrice && parsedDiscountedPrice >= parsedBasePrice) {
        throw new Error('Discounted price must be strictly less than the Base Price.');
      }

      const submissionData = { 
        ...formData, 
        basePrice: parsedBasePrice,
        discountedPrice: parsedDiscountedPrice,
        mainImage: finalMainImage, 
        gallery: finalGallery 
      };

      if (initialData) {
        await updatePet.mutateAsync({ id: initialData._id, data: submissionData });
      } else {
        await addPet.mutateAsync(submissionData);
      }

      onClose();
    } catch (error) {
      setAlertMsg(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4 font-[family-name:var(--font-nunito)]">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-[18px] font-bold text-gray-900">{initialData ? 'Update Inventory & Gallery' : 'Add New Member'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 bg-white shadow-sm p-2 rounded-[10px] border border-gray-100 transition-all">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 lg:p-8 overflow-y-auto space-y-8 flex-1 custom-scrollbar">
          
          {/* Cover Image Upload Area */}
          <div>
            <h3 className="text-[14px] font-bold text-gray-800 mb-2">Cover Profile Image</h3>
            <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 rounded-[18px] cursor-pointer bg-gray-50 hover:bg-gray-100/50 transition-colors relative overflow-hidden group">
               {mainImagePreview ? (
                 <img src={mainImagePreview} className="w-full h-full object-cover" alt="Cover Preview"/>
               ) : (
                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
                   <div className="w-12 h-12 mb-3 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                   </div>
                   <p className="text-[13px] text-gray-600 font-bold tracking-wide">Click to upload main cover</p>
                 </div>
               )}
               <input type="file" className="hidden" accept="image/*" onChange={handleMainImageChange} required={!initialData} />
               {mainImagePreview && <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold backdrop-blur-sm text-[13px] tracking-wide">Change Image</div>}
            </label>
          </div>

          {/* Gallery Upload Area (Only visible on Edit) */}
          {initialData && (
            <div>
              <div className="flex justify-between items-center mb-2">
                 <h3 className="text-[14px] font-bold text-gray-800">Additional Gallery Images (Max 3)</h3>
                 <span className="text-[11px] font-bold bg-blue-50 text-blue-500 px-2 py-0.5 rounded-md">Optional</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                 {[0, 1, 2].map((index) => (
                    <div key={index} className="relative h-28 border-2 border-dashed border-gray-300 rounded-[14px] bg-gray-50 hover:bg-gray-100/50 transition-colors overflow-hidden group">
                       {galleryPreviews[index] ? (
                          <>
                            <img src={galleryPreviews[index]} className="w-full h-full object-cover" alt={`Gallery ${index+1}`}/>
                            <button type="button" onClick={() => removeGalleryImage(index)} className="absolute top-1.5 right-1.5 bg-red-500 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                               <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                            <label className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold backdrop-blur-sm text-[11px] cursor-pointer">
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleGalleryImageChange(index, e)} />
                              Change
                            </label>
                          </>
                       ) : (
                          <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                             <span className="text-gray-400 mb-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></span>
                             <span className="text-[11px] font-bold text-gray-500">Add Image</span>
                             <input type="file" className="hidden" accept="image/*" onChange={(e) => handleGalleryImageChange(index, e)} />
                          </label>
                       )}
                    </div>
                 ))}
              </div>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Identifier / Name</label>
              <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border-2 border-gray-200/60 rounded-[14px] px-4 py-3 text-[14px] font-semibold text-gray-800 focus:outline-none focus:border-[#1E3A2F] focus:ring-4 focus:ring-[#1E3A2F]/10 transition-all placeholder:text-gray-400" placeholder="E.g. Fluffy Beauty" />
            </div>
            
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Category</label>
                <div className="w-full border-2 border-gray-100 rounded-[14px] px-4 py-3 text-[14px] font-bold text-gray-500 bg-gray-50 capitalize flex items-center">
                  {formData.category === 'hen' ? 'Fancy Hen' : formData.category}
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Availability</label>
                <select value={formData.avail} onChange={e => setFormData({...formData, avail: e.target.value})} className="w-full border-2 border-gray-200/60 rounded-[14px] px-4 py-3 text-[14px] font-semibold text-gray-800 focus:outline-none focus:border-[#1E3A2F] focus:ring-4 focus:ring-[#1E3A2F]/10 transition-all bg-white appearance-none cursor-pointer">
                  <option value="Available">Available</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Current Stock Quantity</label>
                <input 
                  type="number" 
                  min="0"
                  required 
                  value={formData.stock} 
                  onChange={e => setFormData({...formData, stock: parseInt(e.target.value) || 0})} 
                  className="w-full border-2 border-gray-200/60 rounded-[14px] px-4 py-3 text-[14px] font-black text-[#1E3A2F] focus:outline-none focus:border-[#1E3A2F] focus:ring-4 focus:ring-[#1E3A2F]/10 transition-all placeholder:text-gray-400 bg-[#A3B18A]/10" 
                />
              </div>
              <div className="hidden"></div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Starting Base Price (₹)</label>
                <input 
                  type="number" 
                  step="0.01"
                  required 
                  value={formData.basePrice} 
                  onChange={e => setFormData({...formData, basePrice: e.target.value})} 
                  className="w-full border-2 border-gray-200/60 rounded-[14px] px-4 py-3 text-[14px] font-semibold text-gray-800 focus:outline-none focus:border-[#1E3A2F] focus:ring-4 focus:ring-[#1E3A2F]/10 transition-all placeholder:text-gray-400" 
                  placeholder="e.g. 1500" 
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5 flex justify-between">
                  <span>Discounted Price (₹)</span>
                  <span className="text-[10px] text-gray-400">Optional</span>
                </label>
                <input 
                  type="number" 
                  step="0.01"
                  value={formData.discountedPrice} 
                  onChange={e => setFormData({...formData, discountedPrice: e.target.value})} 
                  className="w-full border-2 border-gray-200/60 rounded-[14px] px-4 py-3 text-[14px] font-semibold text-gray-800 focus:outline-none focus:border-[#1E3A2F] focus:ring-4 focus:ring-[#1E3A2F]/10 transition-all placeholder:text-gray-400" 
                  placeholder="e.g. 1200" 
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-2">Allowed Delivery Methods</label>
              <div className="space-y-3 bg-gray-50 border-2 border-gray-100 p-4 rounded-[14px]">
                {['Door Delivered', 'Pay amount and receive through Courier', 'Come and collect the product'].map((method) => (
                  <label key={method} className="flex items-center space-x-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      formData.allowedDeliveryMethods?.includes(method) 
                        ? 'bg-[#1E3A2F] border-[#1E3A2F]' 
                        : 'bg-white border-gray-300 group-hover:border-[#1E3A2F]/50'
                    }`}>
                      {formData.allowedDeliveryMethods?.includes(method) && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      )}
                    </div>
                    <span className="text-[13px] font-bold text-gray-700 select-none">{method}</span>
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={formData.allowedDeliveryMethods?.includes(method) || false}
                      onChange={(e) => {
                         const current = formData.allowedDeliveryMethods || [];
                         if (e.target.checked) {
                            setFormData({...formData, allowedDeliveryMethods: [...current, method]});
                         } else {
                            setFormData({...formData, allowedDeliveryMethods: current.filter(m => m !== method)});
                         }
                      }}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Detailed Description</label>
              <textarea required rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border-2 border-gray-200/60 rounded-[14px] px-4 py-3 text-[14px] font-semibold text-gray-800 focus:outline-none focus:border-[#1E3A2F] focus:ring-4 focus:ring-[#1E3A2F]/10 transition-all resize-none placeholder:text-gray-400" placeholder="Provide background info..." />
            </div>
          </div>
          
          <div className="pt-2 flex gap-3">
            <button type="button" onClick={onClose} disabled={isUploading} className="flex-1 bg-white border-2 border-gray-200 text-gray-700 rounded-[14px] py-3 text-[14px] font-bold hover:bg-gray-50 transition-colors disabled:opacity-50">Cancel</button>
            <button disabled={isUploading} type="submit" className="flex-1 bg-[#1E3A2F] text-white rounded-[14px] py-3 text-[14px] font-bold shadow-lg shadow-[#1E3A2F]/20 hover:bg-[#152e24] transition-all disabled:opacity-70 disabled:shadow-none flex justify-center items-center gap-2">
               {isUploading ? (
                 <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Processing...</>
               ) : (
                 <>{initialData ? 'Update Record' : 'Save Details'}</>
               )}
            </button>
          </div>
        </form>
      </div>

      {/* Global Alert Modal */}
      <AlertModal message={alertMsg} onClose={() => setAlertMsg('')} />
    </div>
  );
}
