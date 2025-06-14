import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import CatsList from '@/pages/Cats/CatsList'
import React from 'react'

const page = () => {
  return (
    <>
        <Navbar/>
        <CatsList/>
        <Footer/>
    </>
  )
}

export default page