"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function SecondPage() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [maxScroll, setMaxScroll] = useState(0); // Added state for maxScroll

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && contentRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();

        // Calculate scroll progress (0 to 1)
        const scrollProgress = Math.min(
          Math.max(
            -containerRect.top / (containerRect.height - window.innerHeight),
            0
          ),
          1
        );

        // Adjust video size based on scroll progress
        const scale = 1 - scrollProgress * 0.2; // Shrinks to 60% of original size
        gsap.to(contentRef.current, {
          scale: scale,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    const calculateMaxScroll = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        setMaxScroll(containerHeight - windowHeight);
      }
    };

    calculateMaxScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calculateMaxScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateMaxScroll);
    };
  }, []);

  return (
    <div className="relative w-full bg-black text-white">
      <h1 className="text-center text-3xl py-6">Variety Of Hens</h1>
      <div
        ref={containerRef}
        className="max-h-screen flex flex-col items-center justify-center"
      >
        <div ref={contentRef} className="w-full px-4">
          <div className="mx-auto transition-all duration-300 ease-out">
            <Image
              src="/hen.png"
              alt="iPhone"
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
              priority
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 text-justify">
        <h6>
          At Zion Pet Shop, we take pride in offering a wide variety of hen breeds, ideal for both backyard farming and pet enthusiasts. Whether you're looking for a friendly companion or a reliable egg layer, we have the perfect breed for you. Our collection includes the Silkie, known for its soft, fluffy feathers and calm nature, making it a favorite among families and children. For those focused on egg production, the Leghorn is a top choice, celebrated for its excellent laying ability. The Rhode Island Red stands out for its hardiness and adaptability, making it ideal for beginners. We also offer other unique and ornamental breeds, each raised with care and proper nutrition. Our team is always ready to guide you in choosing the right hen based on your space, purpose, and experience level. Visit Zion Pet Shop today and discover the joy of raising happy, healthy hens.     
        </h6>
      </div>

    </div>
  );
}
