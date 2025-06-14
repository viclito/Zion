'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import {data} from '@/Datas/Hen'
import ContactForm from '@/components/ContactForm';

const HenDetails = () => {
  const { id } = useParams();


  const hen = data.find((hen) => hen.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(hen?.Image);

  if (!hen) {
    return <p>Hen not found</p>;
  }

  return (
    <div className="h-auto max-w-[1350px] m-auto flex flex-col md:flex-row items-start justify-center md:mt-4">
      <div className="w-[90%] m-auto md:w-[50%] h-[600px] overflow-hidden rounded-lg flex flex-col-reverse md:flex-row justify-start gap-2">
        {/* Small Images */}
        <div className="flex md:flex-col flex-row gap-2">
          {hen.Images.map((item, i) => (
            <div
              key={i}
              className="w-[50px] h-[50px] rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(item)} // Update big image on click
            >
              <Image src={item} alt="hen" width={100} height={100} className="w-full h-full" />
            </div>
          ))}
        </div>

        {/* Big Image */}
        <div className="md:w-[70%] w-full rounded-lg overflow-hidden">
          <Image src={selectedImage} alt={hen?.name} width={400} height={400} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Hen Details */}
      <div className="w-[90%] md:w-[50%] m-auto my-2">
        <h1 className="text-xl font-semibold mt-4">{hen?.name}</h1>
        <p className="text-sm text-gray-600 mt-2 w-[90%] text-justify">{hen?.description}</p>
        {hen.avail === 'available' ?
            <p className="text-xs px-2 py-0.5 rounded-lg text-white inline my-2 bg-green-700 pb-1">{hen.avail}</p>:
            <p className="text-xs px-2 py-0.5 rounded-lg text-white inline my-2 bg-red-700 pb-1">{hen.avail}</p>
        }

        <p className="text-sm mt-2 w-[90%] text-justify">For More Details and To Contact Us</p>

        <ContactForm henName={hen.name} category="Hen"/>
      </div>
    </div>
  );
};

export default HenDetails;