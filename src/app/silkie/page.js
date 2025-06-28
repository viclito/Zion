import React from 'react'
import Navbar from '@/components/Navbar'
import DogList from '@/pages/Silkie/SilkieList'
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