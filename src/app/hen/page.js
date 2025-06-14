import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import HenList from '@/pages/Hen/HenList'
import React from 'react'

const page = () => {
  return (
    <>
        <Navbar/>
        <HenList/>
        <Footer/>
    </>
  )
}

export default page