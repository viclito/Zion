import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import HenDetails from '@/pages/Hen/HenDetails'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar/>
        <HenDetails/>
        <Footer/>
    </div>
  )
}

export default page