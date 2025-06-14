'use client';

import React from 'react';

const AboutSection = () => {
  return (
    <section className="bg-neutral-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
            About Zion Pet Shop
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in pet care and companionship
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          {/* Left Column - Image */}
          <div className=" overflow-hidden">
            <img 
              src="/landing.png" 
              alt="Zion Pet Shop animals"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8 rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Our Story
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Founded with a passion for animals, Zion Pet Shop has been serving pet lovers since 2010. 
                What began as a small neighborhood shop has grown into a premier destination for quality pets 
                and supplies, while maintaining our commitment to personalized service.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Our Animals
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We take pride in offering a diverse selection of healthy, well-cared-for animals:
              </p>
              <ul className="grid grid-cols-2 gap-4">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-900">Dogs - Various breeds</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-900">Cats - Different varieties</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-900">Fish - Tropical & freshwater</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-900">Hens - Quality poultry</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Our Promise
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                At Zion Pet Shop, every animal receives exceptional care from our knowledgeable staff. 
                We're committed to matching you with the perfect pet and providing ongoing support 
                through our expertise and quality products.
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  Visit us today to experience the Zion difference
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;