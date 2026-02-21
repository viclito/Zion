import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import HenList from '@/components/page-components/Hen/HenList'
import React from 'react'

export const metadata = {
  title: "All Fancy Hens",
  description: "Browse our full collection of premium fancy hens including Bramma, Silkie, and other exotic breeds available at Zion Pets.",
};

const page = () => {
  return (
    <>
        <Navbar/>
        <HenList/>
        <Footer/>
    </>
  )
}

export default page
