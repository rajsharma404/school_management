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

                        <div className="col-lg-3 col-md-5 col-sm-12 mb-5">
                            <h1>Quick Support</h1>
                            <ul>
                                <li><Link href="#"><i className="fa-solid fa-house"></i> Home</Link></li>
                                <li><Link href="#"><i className="fa-solid fa-lock"></i> Privacy</Link></li>
                                <li><Link href="#"><i className="fa-solid fa-circle-question"></i> Support</Link></li>
                                <li><Link href="#"><i className="fa-solid fa-circle-info"></i> Whatsapp</Link></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-5 col-sm-12 mb-5">
                            <h1>Quick Links</h1>
                            <ul>
                                <li><Link href="#"><i className="fa-solid fa-user-tie"></i>Call Student</Link></li>
                                <li><Link href="#"><i className="fa-solid fa-lock"></i>Update Response</Link></li>
                                <li><Link href="#"><i className="fa-solid fa-circle-question"></i> Scorecard</Link></li>
                                <li><Link href="#"><i className="fa-solid fa-circle-info"></i>Community</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 mb-5">
                            <h1>Classes</h1>
                            <ul>
                                <li><Link href="#"><i className="fa-solid fa-circle-dollar-to-slot"></i>Live Classes</Link></li>
                                <li><Link href="#"><i className="fa-solid fa-bowl-food"></i> Offline Classes</Link></li>
                                <li><Link href="#"><i className="fa-solid fa-filter-circle-dollar"></i> Recorded Course</Link></li>
                                <li><Link href="#"><i className="fa-solid fa-hand-holding-dollar"></i>Membership</Link></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12 mb-5">
                            <h1>Contact Us</h1>
                            <ul>
                                <li><Link href="tel:+91112345678"><i className="fa-solid fa-phone"></i> 1232435465789</Link></li>
                                <li><Link href="mailto:abc@gmail.com"><i className="fa-solid fa-envelope"></i> abce@gmail.com</Link></li>
                                <li><Link href="#"><i className="fa-solid fa-location-dot"></i> Your Location</Link></li>
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
                    <p>© 2025 <Link href="#">Learning Management System</Link>, All Rights Reserved.</p>
                    <p>Powered By: <Link target='_blank' title='Net Xperia' href="https://netxperia.com/">Net Xperia</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
