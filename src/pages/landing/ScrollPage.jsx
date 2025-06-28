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
    {   title: 'Majestic Fancy Hens',   subtitle: 'Explore premium breeds with stunning plumage and calm temperaments',   image: '/scroll1.jpg',   to: '/pleasant' },
    {   title: 'Graceful Hens',   subtitle: 'Elegant, colorful hens with unique personalities and charm',   image: '/scroll2.jpg',   to: '/pleasant' },
    {   title: 'Egg-Laying Beauties',   subtitle: 'Healthy fancy hens perfect for eggs and companionship',   image: '/scroll3.jpg',   to: '/pleasant' },
    {   title: 'Hen Habitat Essentials',   subtitle: 'Create a vibrant, cozy space for your backyard hens',   image: '/scroll4.jpg',   to: '/pleasant' },
    {   title: 'Feeding Your Fancy Hens',   subtitle: 'Nutrition and treats to keep your hens happy and healthy',   image: '/scroll5.jpg',   to: '/hen' },
    {   title: 'Hen Care Basics',   subtitle: 'Everything you need for grooming, health, and comfort',   image: '/scroll6.jpg',   to: '/hen' },
    {   title: 'Breeds & Broods',   subtitle: 'Discover exotic fancy hen breeds for your backyard flock',   image: '/scroll7.jpeg',   to: '/hen' },
    {   title: 'Fancy Hen Coops',   subtitle: 'Stylish, safe, and functional homes for your hens',   image: '/scroll8.jpg',   to: '/hen' },
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