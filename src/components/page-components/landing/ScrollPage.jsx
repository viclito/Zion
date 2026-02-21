'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const ScrollPage = () => {
  const scrollContainerRef = useRef(null);
  const contentRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const content = contentRef.current;

    if (!scrollContainer || !content) return;

    const handleScroll = (e) => {
      e.preventDefault();
      const scrollAmount = e.deltaY * 0.5;
      scrollContainer.scrollLeft += scrollAmount;
      updateArrowVisibility();
    };

    const updateScrollProgress = () => {
      const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const progress = scrollWidth > 0 ? scrollContainer.scrollLeft / scrollWidth : 0;
      updateArrowVisibility();
    };

    const updateArrowVisibility = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    };

    scrollContainer.addEventListener('wheel', handleScroll, { passive: false });
    scrollContainer.addEventListener('scroll', updateScrollProgress);

    updateScrollProgress();
    updateArrowVisibility();

    return () => {
      scrollContainer.removeEventListener('wheel', handleScroll);
      scrollContainer.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  const scrollTo = (direction) => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const scrollAmount = scrollContainer.clientWidth * 0.8;
    scrollContainer.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        if (scrollContainer.scrollLeft >= scrollWidth) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollTo('right');
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { title: 'Fancy Flocks!', subtitle: 'Meet our adorable and incredibly fluffy star breeds.', image: '/scroll1.jpg', to: '/pleasant', color: 'from-[var(--accent-coral)]' },
    { title: 'Graceful Birds', subtitle: 'Colorful companions with the best personalities.', image: '/scroll2.jpg', to: '/pleasant', color: 'from-[var(--accent-teal)]' },
    { title: 'Happy Layers', subtitle: 'Healthy hens perfect for your backyard!', image: '/scroll3.jpg', to: '/pleasant', color: 'from-[var(--accent-yellow)]' },
    { title: 'Cozy Homes', subtitle: 'Create the ultimate fun space for your hens.', image: '/scroll4.jpg', to: '/pleasant', color: 'from-[var(--accent-mint)]' },
    { title: 'Yummy Treats', subtitle: 'Delicious and nutritious snacks they love.', image: '/scroll5.jpg', to: '/hen', color: 'from-[var(--accent-coral)]' },
    { title: 'Spa Day!', subtitle: 'Everything you need to keep them looking fabulous.', image: '/scroll6.jpg', to: '/hen', color: 'from-[var(--accent-teal)]' },
  ];

  return (
    <div className="relative w-full overflow-hidden py-24 bg-[var(--bg-primary)]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end">
        <div>
          <div className="inline-block bg-[var(--accent-teal)] text-white px-4 py-1 rounded-full font-bold uppercase tracking-widest text-xs mb-4 border-2 border-[var(--text-primary)] shadow-[2px_2px_0px_var(--text-primary)] transform -rotate-1">
            Explore More
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)]">Curated Collections</h2>
          <p className="mt-2 text-[var(--text-primary)] font-medium opacity-80 text-lg">Swipe to discover our fun and fabulous pet essentials!</p>
        </div>
        
        <div className="hidden md:flex gap-4">
          <button 
            onClick={() => scrollTo('left')}
            className={`w-14 h-14 border-4 border-[var(--text-primary)] rounded-full flex items-center justify-center transition-all duration-300 ${showLeftArrow ? 'bg-[var(--accent-yellow)] text-[var(--text-primary)] hover:translate-y-1 active:translate-y-2 shadow-[4px_4px_0px_var(--text-primary)] hover:shadow-[2px_2px_0px_var(--text-primary)] active:shadow-none cursor-pointer' : 'bg-gray-200 text-gray-400 opacity-50 cursor-not-allowed'}`}
            disabled={!showLeftArrow}
          >
            <span className="text-2xl font-black mb-1">←</span>
          </button>
          <button 
            onClick={() => scrollTo('right')}
            className={`w-14 h-14 border-4 border-[var(--text-primary)] rounded-full flex items-center justify-center transition-all duration-300 ${showRightArrow ? 'bg-[var(--accent-yellow)] text-[var(--text-primary)] hover:translate-y-1 active:translate-y-2 shadow-[4px_4px_0px_var(--text-primary)] hover:shadow-[2px_2px_0px_var(--text-primary)] active:shadow-none cursor-pointer' : 'bg-gray-200 text-gray-400 opacity-50 cursor-not-allowed'}`}
            disabled={!showRightArrow}
          >
            <span className="text-2xl font-black mb-1">→</span>
          </button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 md:px-12 pb-16 pt-4"
        style={{
          scrollBehavior: 'smooth',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div ref={contentRef} className="flex gap-6">
          {items.map((item, index) => (
            <Link href={item.to} 
              key={index}
              className={`relative flex-shrink-0 w-[85vw] sm:w-[50vw] md:w-[35vw] lg:w-[25vw] aspect-[3/4] group snap-center cursor-pointer transform transition-transform duration-300 hover:-translate-y-4 ${index % 2 === 0 ? 'rotate-1 hover:rotate-0' : '-rotate-1 hover:rotate-0'}`}
            >
              <div className="absolute inset-0 overflow-hidden rounded-[3rem] border-4 border-[var(--text-primary)] shadow-[8px_8px_0px_var(--text-primary)] group-hover:shadow-[12px_12px_0px_var(--text-primary)] transition-shadow duration-300">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Candy-colored gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${item.color} via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
                <h3 className="text-3xl font-black text-white mb-2 leading-tight drop-shadow-[2px_2px_0px_var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="text-white font-medium text-base leading-snug drop-shadow-md">
                  {item.subtitle}
                </p>
                
                <div className="mt-4 bg-white text-[var(--text-primary)] w-10 h-10 rounded-full flex items-center justify-center border-2 border-[var(--text-primary)] font-black group-hover:w-full transition-all duration-300 overflow-hidden relative">
                   <span className="absolute group-hover:opacity-0 transition-opacity whitespace-nowrap">→</span>
                   <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm tracking-widest uppercase">Take a Look!</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScrollPage;
