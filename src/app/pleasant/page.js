import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import PleasantList from '@/components/page-components/Pleasant/PleasantList'
import React from 'react'

export const metadata = {
  title: "Pleasant Breeds",
  description: "Check out our Pleasant variety of pets and fancy hens, bred with care at Zion Pets.",
};

const page = () => {
  return (
    <>
        <Navbar/>
        <PleasantList/>
        <Footer/>
    </>
  )
}

export default page
