import React from 'react'
import Navbar from '@/components/Navbar'
import DogList from '@/components/page-components/Silkie/SilkieList'
import Footer from '@/components/Footer'

export const metadata = {
  title: "Silkie Hens",
  description: "Discover the unique and fluffy Silkie chickens bred by Zion Pets. Perfect as adorable and friendly pets.",
};

const page = () => {
  return (
    <>
        <Navbar />
        <DogList/>
        <Footer/>
    </>
  )
}

export default page
