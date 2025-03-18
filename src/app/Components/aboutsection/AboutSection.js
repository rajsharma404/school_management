"use client"
import React from 'react';
import style from "./AboutSection.module.css";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const AboutSection = () => {
    const router = useRouter()
    return (
        <div className={style.aboutSectionMain}>
            <div className="container">
                <div className={style.aboutContentWrapper}>
                    {/* Left Side - Image */}
                    <div className={style.aboutImage}>
                        <Image
                            src="https://img.freepik.com/free-photo/happy-college-students-with-books-hands-walking-together-campus_8353-6400.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid"
                            alt="About Us"
                            width={500}
                            height={385}
                            className={style.imageEffect}
                        />
                    </div>

                    {/* Right Side - Content */}
                    <div className={style.aboutText}>
                        <h1 className={style.heading}>Welocme To My School </h1>
                        <p className={style.description}>
                            Sanskaar Valley Public School, located in Charthawal, Muzaffarnagar, Uttar Pradesh, is committed to providing high-quality education in a nurturing and disciplined environment. We offer classes from Playgroup to 5th standard, focusing on a strong academic foundation, character building, and overall personality development.To support senior students, we also run a coaching center for classes 9th to 12th



                        </p>
                        <button onClick={() => router.push("/about")} className={style.learnMoreBtn}>Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;
