'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import {data} from '@/Datas/Dog'
import Landing from '@/components/Landing';

const DogList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter((dog) =>
    dog.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Landing image='/Dog/dog.jpg'/>
    <div className="h-auto p-4 max-w-[1350px] m-auto">
      {/* Search Button */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>

      {/* Data Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
        {filteredData.length > 0 ? (
            filteredData.map((dog) => (
                <Link key={dog.id} href={`/dog/${dog.id}`}>
                <div  className="shadow-lg p-4 bg-white rounded-lg cursor-pointer hover:scale-[1.01] hover:shadow-2xl transition-all duration-1000 ease-in-out">
                    <div className="w-[90%] h-[250px] overflow-hidden rounded-lg m-auto ">
                    <Image
                        src={dog.Image}
                        width={500}
                        height={500}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    </div>
                    <h2 className="text-lg font-bold py-1">{dog.name}</h2>
                    {dog.avail === 'available' ?
                        <p className="text-xs text-green-700 pb-1">{dog.avail}</p>:
                        <p className="text-xs text-red-700 pb-1">{dog.avail}</p>
                    }
                    <p className="text-sm text-gray-600 line-clamp-3">{dog.description}</p>
                </div>
            </Link>
            ))
        ) : (
            <p className="text-gray-600">No results</p>
        )}
        </div>
    </div>
    </>
  );
}

export default DogList;