"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function SecondPage() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Playful image pop
    gsap.from(".breed-img-pop", {
      scale: 0.5,
      rotation: 10,
      opacity: 0,
      ease: "back.out(1.5)",
      duration: 1.2,
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      }
    });

    // Bouncy text reveal
    gsap.from(".breed-text", {
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: ".breed-text-container",
        start: "top 75%",
      }
    });
  }, { scope: container });

  return (
    <div ref={container} className="relative w-full bg-[var(--bg-primary)] py-20 px-4 md:px-12 overflow-hidden">
      
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 relative">
        
        {/* Colorful Solid Block with Text */}
        <div className="w-full lg:w-1/2 bg-[var(--accent-teal)] rounded-[3rem] p-10 md:p-16 shadow-[12px_12px_0px_var(--text-primary)] border-4 border-[var(--text-primary)] relative z-10 breed-text-container transform rotate-1">
          
          <div className="absolute -top-6 -left-6 w-16 h-16 bg-[var(--accent-yellow)] rounded-full border-4 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] flex items-center justify-center animate-bounce">
            <span className="text-2xl">🌟</span>
          </div>

          <p className="breed-text inline-block bg-white text-[var(--accent-coral)] px-4 py-1 rounded-full font-bold uppercase tracking-widest text-sm mb-6 border-2 border-[var(--text-primary)] shadow-[2px_2px_0px_var(--text-primary)] transform -rotate-2">
            Our Passion
          </p>
          
          <h2 className="breed-text text-5xl md:text-6xl font-black text-white mb-8 leading-[1.1] drop-shadow-[4px_4px_0px_var(--text-primary)]">
            Healthy Hens,<br/>Happy Homes!
          </h2>

          <div className="breed-text space-y-6 text-lg text-white font-medium leading-relaxed max-w-xl">
            <p>
              At Zion Pet Shop, we take huge pride in offering the friendliest and most beautiful hen breeds around! Whether you want a fluffy backyard buddy or a top-tier show bird, we’ve got your perfect match.
            </p>
            <p className="bg-white/20 p-6 rounded-2xl border-2 border-white/50 backdrop-blur-sm">
              From our famous cloud-like <strong>Silkies</strong> to majestic <strong>Brammas</strong>, every single bird is raised with endless love, top-notch nutrition, and plenty of sunshine. Plus, we guarantee they arrive healthy and ready to join your family!
            </p>
          </div>

          <div className="breed-text mt-10 flex gap-4 flex-wrap">
             <div className="bg-[var(--accent-yellow)] text-[var(--text-primary)] px-6 py-3 rounded-xl border-2 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] font-bold">
               🥇 Top Bloodlines
             </div>
             <div className="bg-[var(--accent-coral)] text-white px-6 py-3 rounded-xl border-2 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] font-bold">
               ❤️ Vet Checked
             </div>
          </div>
        </div>

        {/* Playful Image Block */}
        <div className="w-full lg:w-1/2 relative z-10 flex justify-center mb-10 lg:mb-0">
          <div className="breed-img-pop relative w-full max-w-[500px] aspect-square transform -rotate-3">
             {/* Background decorative square */}
             <div className="absolute inset-0 bg-[var(--accent-coral)] rounded-[3rem] border-4 border-[var(--text-primary)] transform rotate-6 scale-105" />
             
             {/* Image container */}
             <div className="absolute inset-0 bg-white rounded-[3rem] overflow-hidden border-4 border-[var(--text-primary)] shadow-[12px_12px_0px_rgba(43,16,85,0.2)]">
                <Image
                  src="/hen.png"
                  alt="Happy Hen"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
