import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import FishDetails from '@/pages/Fish/FishDetails'
import React from 'react'

export const dynamic = 'force-dynamic';

const page = () => {
  return (
    <div>
        <Navbar/>
        <FishDetails/>
        <Footer/>
    </div>
  )
}

export default page