import React from 'react';

export default function ConfirmModal({ message, onConfirm, onCancel, confirmText = 'Yes', cancelText = 'Cancel' }) {
  if (!message) return null;
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel}></div>
      <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border-4 border-[var(--text-primary)] transform transition-all animate-bounce-in text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 font-black border-4 border-white shadow-md bg-orange-100 text-orange-600">
          ?
        </div>
        
        <h3 className="text-xl font-black text-gray-900 mb-2">Are you sure?</h3>
        <p className="text-gray-600 font-semibold mb-8 text-sm leading-relaxed">{message}</p>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={onConfirm}
            className="w-full bg-[var(--accent-coral)] text-white hover:bg-red-700 font-black py-3.5 rounded-xl transition-colors border-2 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] active:translate-y-1 active:shadow-none"
          >
            {confirmText}
          </button>
          <button 
            onClick={onCancel}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl transition-colors"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
