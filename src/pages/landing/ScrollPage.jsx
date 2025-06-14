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
    // Dogs (1 & 5)
    {   title: 'Loyal Companions',   subtitle: 'Premium dog breeds with excellent temperaments',  image: '/scroll1.jpeg' , to: '/dog'},
    {   title: 'Elegant Felines',   subtitle: 'Beautiful cats with unique personalities',  image: '/scroll2.jpeg' , to: '/dog'},
    {   title: 'Productive Hens',   subtitle: 'Healthy poultry for eggs and companionship',  image: '/scroll3.jpeg' , to: '/dog'},
    {   title: 'Vibrant Aquatics',   subtitle: 'Colorful fish for your home aquarium',  image: '/scroll4.jpeg' , to: '/dog'},
    {   title: 'Dog Essentials',   subtitle: 'Everything to keep your pup happy and healthy',  image: '/scroll5.jpeg' , to: '/dog'},
    {   title: 'Feline Care',   subtitle: "Specialized products for your cat's wellbeing",  image: '/scroll6.jpeg' , to: '/dog'},
    {   title: 'Backyard Flocks',   subtitle: 'Everything you need for raising happy hens',  image: '/scroll7.jpeg' , to: '/dog'},
    {   title: 'Aquarium Setup',   subtitle: 'Complete solutions for your underwater world',  image: '/scroll8.jpeg' , to: '/dog'},
  ];

  return (
    <div className="relative w-full overflow-hidden py-12">
      {/* Left Arrow */}
      {showLeftArrow && (
        <button 
          onClick={() => scrollTo('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white bg-opacity-80 shadow-md flex items-center justify-center hover:bg-opacity-100 transition-all"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Right Arrow */}
      {showRightArrow && (
        <button 
          onClick={() => scrollTo('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white bg-opacity-80 shadow-md flex items-center justify-center hover:bg-opacity-100 transition-all"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4"
        style={{
          scrollBehavior: 'smooth',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::WebkitScrollbar': {
            display: 'none',
          },
        }}
      >
        <div ref={contentRef} className="flex">
          {items.map((item, index) => (
            <Link href={item.to} 
              key={index}
              className={`
                relative
                flex-shrink-0 
                w-[80vw] h-[350px] mx-2 rounded-xl 
                sm:w-[45vw] 
                lg:w-[23vw] lg:mx-2
                flex items-center justify-center 
                text-white text-2xl font-bold 
                snap-always snap-center overflow-hidden
                group
              ` }
            >
              <Image 
                src={item.image} 
                alt={item.title} 
                width={100} 
                height={100} 
                className="w-full h-full object-cover brightness-90 group-hover:brightness-75 transition-all duration-300"
              />
              
              {/* Text Overlay - Apple Style */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-200 text-sm">
                  {item.subtitle}
                </p>
              </div>

            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScrollPage;