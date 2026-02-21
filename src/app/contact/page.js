import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ContactPage from '@/components/page-components/contact/ContactPage'
import React from 'react'

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Zion Pets. Contact us to inquire about our fancy hens or to schedule a visit.",
};

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
