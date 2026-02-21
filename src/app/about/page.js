import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import AboutSection from '@/components/page-components/About/AboutUsPage'
import React from 'react'

export const metadata = {
  title: "About Us",
  description: "Learn about Zion Pets, our mission, and our passion for breeding premium quality fancy hens and exotic pets.",
};

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
