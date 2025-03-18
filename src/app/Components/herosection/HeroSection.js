"use client";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { Typewriter } from "react-simple-typewriter";
import style from "./HeroSection.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Fix dynamic import for react-slick
const Slider = dynamic(() => import("react-slick").then((mod) => mod.default), {
    ssr: false,
});

const HeroSection = () => {
    const sliderRef = useRef(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        rtl: false,
        arrows: false,
    };

    return (
        <div className={style.HeroSectionMain}>
            <button className={style.prevBtn} onClick={() => sliderRef.current?.slickPrev()}>
                &#10094;
            </button>

            <Slider ref={sliderRef} {...settings}>
                <div className={style.slide}>
                    <img src="https://img.freepik.com/free-photo/portrait-happy-students-sitting-with-textbooks-pc-tablet_1262-17978.jpg" alt="Slide 1" />
                    <div className={style.slideOverlay}></div>
                    <div className={style.HeroSectionContent}>
                        <h1>
                            <Typewriter
                                words={["Welcome to DAV School", "Build Amazing Structure", "Enjoy Courses!"]}
                                loop={false}
                                cursor
                                cursorStyle="|"
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        </h1>
                        <p>Meet our exceptional Quest Coaches and learn from their wealth of experience to enhance your wellbeing.</p>
                        <div className={style.getStarted}>
                            <button>Get Started</button>
                        </div>
                    </div>
                </div>

                <div className={style.slide}>
                    <img src="https://img.freepik.com/free-photo/modern-amphitheater-usa_1268-14358.jpg" alt="Slide 2" />
                    <div className={style.slideOverlay}></div>
                    <div className={style.HeroSectionContent}>
                        <h1>
                            <Typewriter
                                words={["Welcome to DAV School", "Build Amazing Structure", "Enjoy Courses!"]}
                                loop={false}
                                cursor
                                cursorStyle="|"
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        </h1>
                        <p>Meet our exceptional Quest Coaches and learn from their wealth of experience to enhance your wellbeing.</p>
                        <div className={style.getStarted}>
                            <button>Get Started</button>
                        </div>
                    </div>
                </div>

                <div className={style.slide}>
                    <img src="https://img.freepik.com/free-photo/modern-amphitheater-usa_1268-14358.jpg" alt="Slide 3" />
                    <div className={style.slideOverlay}></div>
                    <div className={style.HeroSectionContent}>
                        <h1>
                            <Typewriter
                                words={["Welcome to DAV School", "Build Amazing Structure", "Enjoy Courses!"]}
                                loop={false}
                                cursor
                                cursorStyle="|"
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        </h1>
                        <p>Meet our exceptional Quest Coaches and learn from their wealth of experience to enhance your wellbeing.</p>
                        <div className={style.getStarted}>
                            <button>Get Started</button>
                        </div>
                    </div>
                </div>
            </Slider>

            <button className={style.nextBtn} onClick={() => sliderRef.current?.slickNext()}>
                &#10095;
            </button>
        </div>
    );
};

export default HeroSection;
