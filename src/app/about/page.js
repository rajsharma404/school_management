import React from 'react'
import AboutSection from '../Components/aboutsection/AboutSection'
import BredCrumb from '../Components/breadcrumb/BreadCrumb'
import Header from '../Components/header/Header'
import Footer from '../Components/footer/Footer'

const page = () => {
  return (
    <div>
      <Header />
      <BredCrumb title="About Us" />
      <AboutSection />
      <Footer />
    </div>
  )
}

export default page
