// pages/index.js (Home Page)
"use client"
import React from 'react'
import style from './page.module.css'
import Image from 'next/image'
import heroImage from "../../public/assests/homeImage.png"
import heroStar from "../../public/assests/heroStar.png"
import { AiFillSafetyCertificate } from "react-icons/ai";
import PopularCourses from './Components/mostpopularCourse/PopularCourses'
import Testimonial from './Components/testimonial/Testimonial'
import { Typewriter } from "react-simple-typewriter";
import NewsLatter from './Components/newsLatter/NewsLatter'
import GetInTouch from './Components/newsLatter/GetInTouch'
import MembershipCourses from './Components/membership/MembershipCourse'
const page = () => {
  return (
    <div className={style.Pages}>
      {/* Hero Section */}
      <div className="container">
        <section className={style.hero}>
          <div className={style.heroContent}>

            <h1>
              <Typewriter
                words={["Welcome to LMS", "Build Amazing Apps", "Enjoy Courses!"]}
                loop={false}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
              {/* Limitless learning at your <span>fingertips</span> */}
            </h1>
            <p>Online learning and teaching marketplace with 5K+ courses & 10M students. Taught by experts to help you acquire new skills.</p>
            <div className={style.certificateAll}>
              <div className={style.certificate}>
                <AiFillSafetyCertificate className={style.certificateIcon} />
                <p>Learn with experts</p>
              </div>
              <div className={style.certificate}>
                <AiFillSafetyCertificate className={style.certificateIcon} />
                <p>Get certificate</p>
              </div>
              <div className={style.certificate}>
                <AiFillSafetyCertificate className={style.certificateIcon} />
                <p>Get membership</p>
              </div>

            </div>
            <div className={style.getStarted}>
              <button>Get Started</button>
              <div className={style.getStartedWatch}>
                <div className={style.getStartedWatchIcon}>
                  <i className="fa-solid fa-play"></i>

                </div>
              </div>

            </div>
          </div>
          <div className={style.heroContentImg}>
            <div className={style.heroImageBackground}>
              <Image src={heroImage} width={550} height={500} alt='not found' />

              <div className={style.heroLogo1}>
                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTse1autFGWNtwZBRp9ToN4zv0Tb2bi9Gdbpw&s" width={60} height={60} alt='not found' />
              </div>
              <div className={`${style.heroLogo2} ${style.heroLogo1}`}>
                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlpDymQiCPpRYDPO7AO7eGW-Kx7QRClBMlNA&s" width={60} height={60} alt='not found' />
              </div>
              <div className={`${style.heroLogo3} ${style.heroLogo1}`}>
                <Image src={heroStar} width={60} height={60} alt='not found' />
              </div>
              <div className={style.AddmissionComplete}>
                <div className={style.AddmissionCompleteIcon}>
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <div className={style.AddmissionCompleteContent}>
                  <h4>Congratulation<i className="fa-solid fa-circle-check"></i></h4>
                  <p>Your admission complete</p>
                </div>
              </div>
              <div className={style.ourDaily}>
                <h4>Our daily new students</h4>
                <div className={style.ourDailyProfileAll}>
                  <div className={style.ourDailyProfile}>
                    <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShZ75KKy6w0Rw_ExGPMO1ZcccgpjXaK-xKgQ&s" width={35} height={35} alt='not found' />
                  </div>
                  <div className={style.ourDailyProfile}>
                    <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShZ75KKy6w0Rw_ExGPMO1ZcccgpjXaK-xKgQ&s" width={35} height={35} alt='not found' />
                  </div>
                  <div className={style.ourDailyProfile}>
                    <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShZ75KKy6w0Rw_ExGPMO1ZcccgpjXaK-xKgQ&s" width={35} height={35} alt='not found' />
                  </div>
                  <div className={style.ourDailyProfile}>
                    <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShZ75KKy6w0Rw_ExGPMO1ZcccgpjXaK-xKgQ&s" width={35} height={35} alt='not found' />
                  </div>
                  <div className={style.ourDailyProfile}>
                    <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShZ75KKy6w0Rw_ExGPMO1ZcccgpjXaK-xKgQ&s" width={35} height={35} alt='not found' />
                  </div>
                  <div className={style.ourDailyProfile}>
                    <span>1K+</span>
                  </div>
                </div>

              </div>


            </div>

          </div>

        </section>
      </div>


      <div className="container mt-2">
        <div className={style.coursesDetailsAll}>
          <div className={style.coursesDetails}>
            <i className="fa-solid fa-display"></i>
            <div className={style.coursesDetailsTitle}>
              <h2>10K</h2>
              <p>Online Course</p>

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
              <h2>60K</h2>
              <p>Online Students</p>

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

      <div className="container mt-5">
        <PopularCourses />
      </div>
      <div className="container">
        <div className={style.instructor}>
          <div className={style.instructorContent}>
            <h2>Become an Instructor!</h2>
            <p>
              Speedily say has suitable disposal add boy. On forth doubt miles of child. Exercise joy man children rejoiced. Yet uncommonly his ten who diminution astonished.
            </p>
          </div>
          <div className={style.instructorBtn}>
            <button>Start Teaching Today</button>
          </div>
        </div>

      </div>
      <div className={`${style.Testimonial} mt-5`}>
  
        <Testimonial />
      </div>
      <MembershipCourses />
      <div className={`${style.NewsLatter}`}>
        <GetInTouch />
      </div>
      <div className={`${style.NewsLatter}`}>
        <NewsLatter />
      </div>




    </div>
  )
}

export default page
