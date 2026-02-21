'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Helper component for the live countdown timer - Premium Glass Design
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-3 lg:gap-5 justify-center md:justify-start mt-2">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds }
      ].map((block, idx) => (
        <div key={idx} className="flex flex-col items-center group">
          <div className="w-14 h-14 lg:w-[72px] lg:h-[72px] bg-white/10 backdrop-blur-2xl rounded-2xl flex items-center justify-center border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] group-hover:bg-white/20 group-hover:-translate-y-1 transition-all duration-300">
            <span className="text-2xl lg:text-3xl font-black text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300">
              {block.value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] lg:text-xs font-black text-emerald-400 mt-2 uppercase tracking-widest drop-shadow-md">{block.label}</span>
        </div>
      ))}
    </div>
  );
};

export default function OffersSection() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveOffers = async () => {
      try {
        const res = await fetch('/api/offers?activeOnly=true');
        const data = await res.json();
        if (data.success && data.offers.length > 0) {
          const validOffers = data.offers.filter(offer => {
             if (!offer.validUntil) return true;
             return new Date(offer.validUntil) > new Date();
          });
          setOffers(validOffers);
        }
      } catch (err) {
        console.error('Failed to fetch offers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveOffers();
  }, []);

  if (loading || offers.length === 0) return null;

  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden bg-[#0A110D]">
      {/* Background Decorative Glow Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#var(--text-primary)]/20 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-black tracking-widest uppercase shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Exclusive Promotions
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight drop-shadow-xl">
            Unmissable <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Deals</span>
          </h2>
        </div>

        <div className="space-y-32">
          {offers.map((offer, index) => (
            <div 
              key={offer._id} 
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16 group`}
            >
              {/* Image Side with Hover Tilt & Glow */}
              <div className="w-full lg:w-[55%] relative z-10 perspective-1000">
                <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-transform duration-700 hover:scale-[1.02] border border-white/10 group-hover:border-emerald-500/30">
                  <Image 
                    src={offer.image} 
                    alt={offer.title} 
                    fill 
                    className="object-cover transform transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Subtle inner shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
                {/* Image background glow effect */}
                <div className="absolute -inset-4 bg-emerald-500/20 blur-2xl -z-10 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Glassmorphism Content Side */}
              <div className={`w-full lg:w-[55%] ${index % 2 === 1 ? 'lg:-mr-16 lg:pl-16' : 'lg:-ml-16 lg:pr-16'} z-20`}>
                <div className="bg-white/5 backdrop-blur-2xl p-8 lg:p-12 rounded-[2rem] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden">
                  
                  {/* Decorative corner shine */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/30 to-transparent" />

                  {offer.discountCode && (
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-950 px-6 py-2 rounded-full text-sm font-black tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(250,204,21,0.4)] transform -rotate-2 hover:rotate-0 transition-transform">
                      <span>Use Code:</span>
                      <span className="bg-white/30 px-2 py-0.5 rounded cursor-copy" title="Copy code">{offer.discountCode}</span>
                    </div>
                  )}
                  
                  <h3 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-[1.1] tracking-tight text-balance">
                    {offer.title}
                  </h3>
                  
                  <p className="text-gray-300 font-medium text-lg leading-relaxed mb-10 max-w-xl">
                    {offer.description}
                  </p>

                  {offer.validUntil && (
                    <div className="mb-10 p-6 rounded-2xl bg-black/20 border border-white/5 shadow-inner">
                      <p className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        Offer Ends In
                      </p>
                      <CountdownTimer targetDate={offer.validUntil} />
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      href={offer.targetLink || '/'}
                      className="group/btn relative inline-flex items-center justify-center px-8 py-4 font-black text-white overflow-hidden rounded-xl bg-emerald-600 hover:bg-emerald-500 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] border border-emerald-400/50"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Claim Offer Now
                        <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </span>
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
