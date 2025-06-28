import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import PleasantList from '@/pages/Pleasant/PleasantList'
import React from 'react'

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