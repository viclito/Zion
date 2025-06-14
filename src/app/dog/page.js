import React from 'react'
import Navbar from '@/components/Navbar'
import DogList from '@/pages/Dogs/DogList'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <>
        <Navbar />
        <DogList/>
        <Footer/>
    </>
  )
}

export default page