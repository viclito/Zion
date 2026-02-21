import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import BrammaList from '@/components/page-components/Bramma/BrammaList'
import React from 'react'

export const metadata = {
  title: "Bramma Hens",
  description: "Explore our high-quality Bramma fancy hens. Zion Pets offers the best selection of healthy, beautiful Bramma breeds.",
};

const page = () => {
  return (
    <>
        <Navbar/>
        <BrammaList/>
        <Footer/>
    </>
  )
}

export default page
