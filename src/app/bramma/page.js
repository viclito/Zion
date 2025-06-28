import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import BrammaList from '@/pages/Bramma/BrammaList'
import React from 'react'

const page = () => {
  return (
    <>
        <Navbar/>
        <BrammaList/>
        <Footer/>
    </>
  )
}

export default page