'use client';

import React from 'react';

const AboutSection = () => {
  return (
    <section className="bg-[var(--bg-primary)] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      
      {/* Decorative Blob */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[var(--accent-yellow)] rounded-full mix-blend-multiply blur-3xl opacity-50 z-0" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[var(--accent-teal)] rounded-full mix-blend-multiply blur-3xl opacity-40 z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-block bg-[var(--accent-coral)] text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm mb-6 border-4 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] transform rotate-2">
            Get To Know Us!
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-[var(--text-primary)] drop-shadow-[3px_3px_0px_white]">
            About Zion Pets
          </h2>
          <p className="mt-6 text-xl text-[var(--text-primary)] font-medium max-w-3xl mx-auto bg-white/40 p-4 rounded-2xl border-2 border-[var(--text-primary)]">
            Your trusted partner in pet care, companionship, and happy homes! 🐾
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Image */}
          <div className="relative w-full max-w-lg mx-auto aspect-[4/5] transform -rotate-3 group">
            {/* Background Drop Shadow Box */}
            <div className="absolute inset-0 bg-[var(--accent-mint)] rounded-[3rem] border-4 border-[var(--text-primary)] transform rotate-6" />
            
            {/* Main Image Box */}
            <div className="absolute inset-0 bg-white rounded-[3rem] p-4 border-4 border-[var(--text-primary)] shadow-[12px_12px_0px_rgba(43,16,85,0.2)] flex flex-col items-center justify-center transform group-hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-full relative rounded-2xl overflow-hidden border-4 border-[var(--text-primary)] bg-[var(--accent-yellow)]">
                <img 
                  src="/landing.png" 
                  alt="Zion Pet Shop animals"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-[var(--accent-yellow)] border-4 border-[var(--text-primary)] px-6 py-4 rounded-full shadow-[6px_6px_0px_var(--text-primary)] transform -rotate-6">
               <p className="font-black text-2xl text-[var(--text-primary)]">Est. 2024</p>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            
            <div className="bg-[var(--accent-teal)] rounded-[2rem] p-8 border-4 border-[var(--text-primary)] shadow-[8px_8px_0px_var(--text-primary)] transform rotate-1">
              <h3 className="text-3xl font-black text-white mb-4 drop-shadow-[2px_2px_0px_var(--text-primary)]">
                Our Story
              </h3>
              <p className="text-lg font-medium text-white leading-relaxed">
                Founded with a massive passion for animals, Zion Pet Shop works endlessly to bring joy directly to your home! We're dedicated to raising the happiest, healthiest, and fluffiest friends in town.
              </p>
            </div>

            <div className="bg-white rounded-[2rem] p-8 border-4 border-[var(--text-primary)] shadow-[8px_8px_0px_var(--text-primary)] transform -rotate-1">
              <h3 className="text-3xl font-black text-[var(--text-primary)] mb-6 drop-shadow-[2px_2px_0px_var(--accent-yellow)]">
                Our Amazing Animals
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { text: 'Happy Dogs', icon: '🐶', color: 'bg-[var(--accent-yellow)]' },
                  { text: 'Playful Cats', icon: '🐱', color: 'bg-[var(--accent-coral)] text-white' },
                  { text: 'Tropical Fish', icon: '🐠', color: 'bg-[var(--accent-teal)] text-white' },
                  { text: 'Fancy Hens', icon: '🐔', color: 'bg-[var(--accent-mint)]' },
                ].map((item, i) => (
                  <li key={i} className={`flex items-center gap-3 ${item.color} p-4 rounded-xl border-4 border-[var(--text-primary)] font-bold text-[var(--text-primary)] hover:translate-x-1 transition-transform`}>
                    <span className="text-2xl">{item.icon}</span>
                    <span className={item.color.includes('text-white') ? 'text-white' : ''}>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[var(--accent-coral)] rounded-[2rem] p-8 border-4 border-[var(--text-primary)] shadow-[8px_8px_0px_var(--text-primary)] transform rotate-1 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-white mb-2 drop-shadow-[2px_2px_0px_var(--text-primary)]">Come Say Hi! 👋</h3>
                <p className="text-white font-medium">Ready to meet your new best friend?</p>
              </div>
              <div className="hidden sm:block text-5xl animate-bounce mt-4">🐾</div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
