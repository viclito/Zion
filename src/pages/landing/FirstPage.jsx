import Image from 'next/image'
import React from 'react'

const FirstPage = () => {
  return (
    <div className=' flex flex-col md:flex-row items-center justify-center' >
        <div className='md:w-1/2 w-full mt-10 md:mt-0'>
            <h1 className='text-center text-5xl font-extrabold'><span className='text-[#fbb70d]'>Z</span>ION PET's</h1>
            <p className='text-sm text-gray-600 leading-relaxed p-2 pt-7 text-justify'>
                At ZION PET's, we believe pets are more than companions — they’re family. Whether you’re looking for quality pet supplies, expert grooming, or reliable veterinary care, we've got your furry friends covered with love and care.
            </p>
        </div>
        <div className='md:w-1/2 w-full'>
            <Image 
                src='/landing.png'
                width={500}             
                height={300}           
                alt="Landing"
                style={{ width: '100%', height: 'auto' }}
            />
        </div>
    </div>
  )
}

export default FirstPage