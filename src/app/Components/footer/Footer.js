"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import style from "./Footer.module.css";

const Footer = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div>
            <div className={style.footerSection}>
                <div className="container">
                    <div className="row">

                        <div className="col-lg-5 col-md-5 col-sm-12 mb-5">
                            <h1>About</h1>
                            <p>At Sanskaar Valley Public School, we believe in holistic education, blending academics with moral values, extracurricular activities, and life skills. Our experienced faculty, modern teaching methods, and student-centric approach ensure that every child reaches their full potential.</p>

                        </div>

                        <div className="col-lg-2 col-md-5 col-sm-12 mb-5">
                            <h1>Quick Links</h1>

                            <ul>
                                <li><Link href="#"><i className="fa-solid fa-angles-right"></i> Home</Link></li>
                                <li><Link href="#"><i className="fa-solid fa-angles-right"></i> Privacy</Link></li>
                                <li><Link href="#"><i className="fa-solid fa-angles-right"></i> Support</Link></li>
                                <li><Link href="#"><i className="fa-solid fa-angles-right"></i> Whatsapp</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-6 col-sm-12 mb-5">
                            <h1>Class</h1>
                            <ul>
                                <li><Link href="#"><i className="fa-solid fa-angles-right"></i>Nursery</Link></li>
                                <li><Link href="#"><i className="fa-solid fa-angles-right"></i>Kindegarten</Link></li>
                                <li><Link href="#"><i className="fa-solid fa-angles-right"></i>Class 1 </Link></li>
                                <li><Link href="#"><i className="fa-solid fa-angles-right"></i>To Class 5</Link></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12 mb-5">
                            <h1>Contact Us</h1>
                            <ul>
                                <li><Link href="tel:+1 989-712-5000"><i className="fa-solid fa-phone"></i>
                                    +1 989-712-5000</Link></li>
                                <li><Link href="mailto:svpscharthawal@gmail.com"><i className="fa-solid fa-envelope"></i> svpscharthawal@gmail.com
                                </Link></li>
                                <li><Link href="#"><i className="fa-solid fa-location-dot"></i> Charthawal, Muzaffarnagar, India, Uttar Pradesh</Link></li>
                                <li>
                                    <div className={style.socialIcons}>
                                        <Link href="#"><i className="fa-brands fa-facebook-f"></i></Link>
                                        <Link href="#"><i className="fa-brands fa-instagram"></i></Link>
                                        <Link href="#"><i className="fa-brands fa-youtube"></i></Link>
                                        <Link href="#"><i className="fa-brands fa-twitter"></i></Link>
                                        <Link href="#"><i className="fa-brands fa-linkedin-in"></i></Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.smallFooterSectrion}>
                <div className={`${style.smallFooterDetails} container`}>
                    <p>© 2025 <Link href="#">School Management System</Link>, All Rights Reserved.</p>
                    <p>Powered By: <Link target='_blank' title='Net Xperia' href="https://netxperia.com/">Net Xperia</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
