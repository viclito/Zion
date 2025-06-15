'use client'; // Mark this as a Client Component

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export default function FishDetails({ fish }) {
  // Initialize the state with the default big image
  const [selectedImage, setSelectedImage] = useState(fish.Image);

  return (
    <>
      <Navbar />
      <div className="h-auto max-w-[1350px] m-auto flex flex-col md:flex-row items-start justify-center md:mt-4">
        <div className="w-[90%] m-auto md:w-[50%] h-[600px] overflow-hidden rounded-lg flex flex-col-reverse md:flex-row justify-start gap-2">
          {/* Small Images */}
          <div className="flex md:flex-col flex-row gap-2">
            {fish.Images.map((item, i) => (
              <div
                key={i}
                className="w-[50px] h-[50px] rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(item)} // Update the big image on click
              >
                <Image
                  src={item}
                  alt={`${fish.name} thumbnail ${i}`}
                  width={100}
                  height={100}
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>

          {/* Big Image */}
          <div className="md:w-[70%] w-full rounded-lg overflow-hidden">
            <Image
              src={selectedImage} // Use the selected image
              alt={fish.name}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Fish Details */}
        <div className="w-[90%] md:w-[50%] m-auto my-2">
          <h1 className="text-xl font-semibold mt-4">{fish.name}</h1>
          <p className="text-sm text-gray-600 mt-2 w-[90%] text-justify">{fish.description}</p>
          {fish.avail === 'available' ? (
            <p className="text-xs px-2 py-0.5 rounded-lg text-white inline my-2 bg-green-700 pb-1">
              {fish.avail}
            </p>
          ) : (
            <p className="text-xs px-2 py-0.5 rounded-lg text-white inline my-2 bg-red-700 pb-1">
              {fish.avail}
            </p>
          )}

          <p className="text-sm mt-2 w-[90%] text-justify">For More Details and To Contact Us</p>

          <ContactForm fishName={fish.name} fishegory="Fish" />
        </div>
      </div>
      <Footer />
    </>
  );
}