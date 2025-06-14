import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ContactPage from '@/pages/contact/ContactPage'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar/>
        <ContactPage/>
        <Footer/>
    </div>
  )
}

export default page