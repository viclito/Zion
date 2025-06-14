import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import CatDetails from '@/pages/Cats/CatDetails'
import React from 'react'

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