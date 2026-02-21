import React from 'react';

export default function AlertModal({ message, onClose, type = 'info' }) {
  if (!message) return null;
  
  const isError = type === 'error' || message.toLowerCase().includes('failed') || message.toLowerCase().includes('error');
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border-4 border-[var(--text-primary)] transform transition-all animate-bounce-in text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 font-black border-4 border-white shadow-md ${
          isError ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-[var(--accent-coral)]'
        }`}>
          {isError ? '!' : 'i'}
        </div>
        
        <h3 className="text-xl font-black text-gray-900 mb-2">Notice</h3>
        <p className="text-gray-600 font-semibold mb-8 text-sm leading-relaxed">{message}</p>
        
        <button 
          onClick={onClose}
          className="w-full bg-[var(--text-primary)] text-white hover:bg-[#1E3A2F] font-black py-3.5 rounded-xl transition-colors border-2 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] active:translate-y-1 active:shadow-none"
        >
          OK
        </button>
      </div>
    </div>
  );
}
