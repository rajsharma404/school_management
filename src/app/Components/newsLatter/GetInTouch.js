'use client';
import React, { useState, useEffect } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaCommentDots } from 'react-icons/fa';
import style from "./NewsLatter.module.css";

const GetInTouch = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className={style.getInTouchMains}>
            <div className={style.overlay}></div>
            <div className="container">
                <div className={style.getInTouchMain}>

                    <div className={style.getInTouchForm}>
                        <h2>Get In Touch</h2>
                        <form>
                            <div className={style.row}>
                                <div className={style.inputGroup}>
                                    <input type="text" placeholder="Your Name" required />
                                    <FaUser className={style.icon} />
                                </div>
                                <div className={style.inputGroup}>
                                    <input type="tel" placeholder="Phone Number" required />
                                    <FaPhone className={style.icon} />
                                </div>
                            </div>
                            <div className={style.row}>
                                <div className={style.inputGroup}>
                                    <input type="email" placeholder="Email Address" required />
                                    <FaEnvelope className={style.icon} />
                                </div>
                                <div className={style.inputGroup}>
                                    <input type="text" placeholder="Subject" required />
                                    <FaCommentDots className={style.icon} />
                                </div>
                            </div>
                            <div className={style.inputGroupTextarea}>
                                <textarea placeholder="Your Message" rows="4" required></textarea>

                            </div>
                            <button type="submit" className={style.submitBtn}>Send Message</button>
                        </form>
                    </div>

                </div>
            </div >
        </div >
    );
};

export default GetInTouch;
