import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import DogDetails from '@/pages/Dogs/DogDetails'
import React from 'react'

const page = () => {
  return (
    <>
        <Navbar/>
        <DogDetails/>
        <Footer/>
    </>
  )
}

export default page