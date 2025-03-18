"use client"
import React from 'react'
import style from './page.module.css'
import HeroSection from './Components/herosection/HeroSection'
import AboutSection from './Components/aboutsection/AboutSection'
import Header from './Components/header/Header'
import Footer from './Components/footer/Footer'
const page = () => {
  return (
    <div className={style.Pages}>
      <Header />
      {/* Hero Section */}
      <HeroSection />
      <AboutSection />
      <div className={style.coursesDetailsAllMain}>
        <div className="container my-5">
          <h1>Why Choose Us</h1>
          <div className={style.coursesDetailsAll}>
            <div className={style.coursesDetails}>
              <i className="fa-solid fa-display"></i>
              <div className={style.coursesDetailsTitle}>
                <h2>20</h2>
                <p>Courses</p>

              </div>
            </div>
            <div className={style.coursesDetails}>
              <i className="fa-solid fa-user-tie"></i>
              <div className={style.coursesDetailsTitle}>
                <h2>200+</h2>
                <p>Expert Tutors</p>

              </div>
            </div>
            <div className={style.coursesDetails}>
              <i className="fa-solid fa-user-graduate"></i>
              <div className={style.coursesDetailsTitle}>
                <h2>2K</h2>
                <p>Students</p>

              </div>
            </div>
            <div className={style.coursesDetails}>
              <i className="fa-solid fa-certificate"></i>
              <div className={style.coursesDetailsTitle}>
                <h2>6K</h2>
                <p>Certified Courses</p>

              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />

    </div>
  )
}

export default page
