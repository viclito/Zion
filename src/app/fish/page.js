import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import FishList from '@/pages/Fish/FishList'
import React from 'react'

const page = () => {
  return (
    <>
        <Navbar/>
        <FishList/>
        <Footer/>
    </>
  )
}

export default page