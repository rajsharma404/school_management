import React from "react";
import Slider from "react-slick";
import style from "./HeroSection.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSection = () => {
    const sliderRef = React.useRef(null);
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
            <button className={style.prevBtn} onClick={() => sliderRef.current.slickPrev()}>
                &#10094;
            </button>
            <Slider ref={sliderRef} {...settings}>
                <div className={style.slide}>
                    <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid" alt="Slide 1" />
                    <div className={style.slideOverlay}>


                    </div>
                    <div className={style.HeroSectionContent}>
                        <h1>Immerse yourself in an Online Retreat</h1>
                        <p>Meet our exceptional Quest Coaches and learn from their wealth of experience to enhance your wellbeing and embody living.</p>
                        <div className={style.getStarted}>
                            <button>Get Started</button>
                            <div className={style.getStartedWatch}>
                                <div className={style.getStartedWatchIcon}>
                                    <i className="fa-solid fa-play"></i>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div className={style.slide}>
                    <img src="https://img.freepik.com/free-photo/city-commihttps://img.freepik.com/free-photo/tranquil-scene-mountain-peak-reflects-multi-colored-autumn-beauty-generated-by-artificial-intelligence_25030-67677.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid" alt="Slide 2" />
                    <div className={style.slideOverlay}>


                    </div>
                    <div className={style.HeroSectionContent}>
                        <h1>Immerse yourself in an Online Retreat</h1>
                        <p>Meet our exceptional Quest Coaches and learn from their wealth of experience to enhance your wellbeing and embody living.</p>

                    </div>
                </div>
                <div className={style.slide}>
                    <img src="https://img.freepik.com/free-photo/close-up-green-leaf-with-fresh-water-droplets-generative-ai_188544-8635.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid" alt="Slide 3" />
                    <div className={style.slideOverlay}>


                    </div>
                    <div className={style.HeroSectionContent}>
                        <h1>Immerse yourself in an Online Retreat</h1>
                        <p>Meet our exceptional Quest Coaches and learn from their wealth of experience to enhance your wellbeing and embody living.</p>

                    </div>
                </div>
            </Slider>
            <button className={style.nextBtn} onClick={() => sliderRef.current.slickNext()}>
                &#10095;
            </button>
        </div>
    );
};

export default HeroSection;
