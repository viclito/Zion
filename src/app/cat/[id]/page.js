import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import CatDetails from './CatDetails';

export const dynamic = 'force-dynamic';

const page = () => {
  return (
    <>
        <Navbar/>
        <CatDetails/>
        <Footer/>
    </>
  )
}

export default page