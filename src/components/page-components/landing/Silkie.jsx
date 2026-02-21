import Image from 'next/image';
import React from 'react';

const Silkie = () => {
  return (
    <div className="relative w-full py-20 my-20 bg-[var(--accent-yellow)] border-y-4 border-[var(--text-primary)] overflow-hidden">
      
      {/* Decorative floating dots */}
      <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-[var(--accent-coral)] animate-ping opacity-70" />
      <div className="absolute bottom-20 right-20 w-6 h-6 rounded-full bg-[var(--accent-teal)] animate-pulse" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center gap-12 relative z-10">
        
        {/* Text Area */}
        <div className="w-full md:w-1/2 text-center md:text-left">
           <div className="inline-block bg-[var(--text-primary)] text-[var(--accent-yellow)] px-4 py-1 rounded-full font-bold uppercase tracking-widest text-xs mb-6 transform -rotate-2">
            ⭐ Crowd Favorite
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-[var(--text-primary)] mb-6 leading-tight drop-shadow-[3px_3px_0px_white]">
            The Silkie <br/>Superstars!
          </h2>
          <p className="text-[var(--text-primary)] text-lg md:text-xl font-medium leading-relaxed max-w-lg mx-auto md:mx-0 bg-white/40 p-6 rounded-3xl border-2 border-[var(--text-primary)]">
            Known for their distinctive, cloud-like fluffy feathers and remarkably sweet personalities. Silkies aren't just chickens—they're adorable, affectionate family pets that happen to lay eggs!
          </p>
          
          <button className="mt-8 bg-white text-[var(--text-primary)] font-bold px-8 py-4 rounded-full border-4 border-[var(--text-primary)] shadow-[6px_6px_0px_var(--accent-coral)] hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--accent-coral)] transition-all active:translate-y-2 active:shadow-none text-lg">
            Meet the Silkies! ☁️
          </button>
        </div>

        {/* Playful Polaroid/Card Image */}
        <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0 relative">
          
          {/* Background Card Offset */}
          <div className="absolute inset-0 bg-[var(--accent-mint)] rounded-3xl border-4 border-[var(--text-primary)] transform rotate-6 scale-90 w-full max-w-md mx-auto aspect-[4/3] top-4 left-4 z-0" />
          
          <div className="relative z-10 w-full max-w-md aspect-[4/3] bg-white p-4 rounded-3xl border-4 border-[var(--text-primary)] shadow-[12px_12px_0px_var(--text-primary)] transform -rotate-2 hover:rotate-0 transition-transform duration-300">
             <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[var(--text-primary)]">
                <Image 
                  src="/hen.jpg" 
                  alt="Fluffy Silkie Hen" 
                  fill 
                  className="object-cover object-center"
                  priority
                />
             </div>
             {/* Playful sticker */}
             <div className="absolute -bottom-6 -right-6 bg-[var(--accent-coral)] text-white font-black text-xl px-4 py-2 rounded-full border-4 border-[var(--text-primary)] transform rotate-12 shadow-[4px_4px_0px_var(--text-primary)]">
               So Fluffy!
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Silkie;
