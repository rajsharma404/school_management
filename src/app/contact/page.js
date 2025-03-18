"use client"
import { useEffect, useState, useRef } from 'react';
import style from "./contact.module.css";
import { FaUser, FaPhone, FaEnvelope, FaRegFileAlt, FaMapMarkerAlt, FaPhoneAlt, FaRegComment } from 'react-icons/fa';
import { HiOutlineMail } from "react-icons/hi";
import Link from 'next/link';
import BredCrumb from '../Components/breadcrumb/BreadCrumb';
import Header from '../Components/header/Header';
import Footer from '../Components/footer/Footer';
const Page = () => {
    const [isClient, setIsClient] = useState(false);
    const mapContainerRef = useRef(null);
    const contactTitle = "Contact Us"

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient && mapContainerRef.current) {
            const mapContainer = mapContainerRef.current;

            // Add any logic you need for the map container here, but make sure to check if it's available
            if (mapContainer) {
                // Your map logic goes here
            }
        }
    }, [isClient]);

    return (
        <div className={style.main}>
            <Header />
            <div className={`${style.contactUs}`}>

                <BredCrumb title={contactTitle} />
                <div className={`${style.contactUsAddress} ${"container"}`}>
                    {/* Contact Info Section */}
                    <div className={style.contactUsAddressEmail}>
                        <HiOutlineMail className={style.contactIcon} />
                        <span>Email: <Link href={"mailto:contact@example.com"}>contact@example.com</Link></span>
                    </div>
                    <div className={`${style.contactUsAddressPhone} ${style.contactUsAddressEmail}`}>
                        <FaPhoneAlt className={style.contactIcon} />
                        <span>Phone: <Link href={"tel:1234567890"}>1234567890</Link></span>
                    </div>
                    <div className={`${style.contactUsAddressLocation} ${style.contactUsAddressEmail}`}>
                        <FaMapMarkerAlt className={style.contactIcon} />
                        <span>Location: <p>Abcs Delhi 2345445</p></span>

                    </div>
                </div>

                <div className={`${style.gridContainer} ${"container"}`}>
                    <div className={`${style.contactFormContainer}`}>
                        <h2 className={`${style.contactHeading}`}>Contact Us</h2>
                        <form>
                            <div className={`${style.formRow}`}>
                                <div className={`${style.formGroup}`}>
                                    <input type="text" className={`${style.formInput}`} placeholder="Your Name" required />
                                    <FaUser className={`${style.iconRight}`} />
                                </div>
                                <div className={`${style.formGroup}`}>
                                    <input type="text" className={`${style.formInput}`} placeholder="Your Phone" required />
                                    <FaPhone className={`${style.iconRight}`} />
                                </div>
                            </div>
                            <div className={`${style.formRow}`}>
                                <div className={`${style.formGroup}`}>
                                    <input type="email" className={`${style.formInput}`} placeholder="Your Email" required />
                                    <FaEnvelope className={`${style.iconRight}`} />
                                </div>
                                <div className={`${style.formGroup}`}>
                                    <input type="text" className={`${style.formInput}`} placeholder="Your Subject" required />
                                    <FaRegFileAlt className={`${style.iconRight}`} />
                                </div>
                            </div>
                            <div className={`${style.formGroup} ${style.formGroupTextarea}`}>
                                <textarea className={`${style.formInput}`} rows="4" placeholder="Your Message"></textarea>
                                <FaRegComment className={`${style.iconRight}`} /> {/* Message Icon */}
                            </div>
                            <button className={`${style.submitButton}`}>Send Message</button>
                        </form>
                    </div>

                    {/* Right Side - Map (only renders on client) */}
                    {isClient && (
                        <div ref={mapContainerRef} className={`${style.mapContainer}`}>
                            <iframe
                                className={`${style.mapIframe}`}
                                src="https://www.google.com/maps/embed?pb=..."
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    )}
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Page;
