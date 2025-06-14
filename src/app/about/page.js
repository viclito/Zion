import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import AboutSection from '@/pages/About/AboutUsPage'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar/>
        <AboutSection/>
        <Footer/>
    </div>
  )
}

export default page