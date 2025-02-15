import React from "react";
import style from "../login/login.module.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; // Importing icons
import Link from "next/link";
const page = () => {
    return (
        <div className={`${style.registerMain} ${style.loginMain}`}>
            <div className={style.loginMainOverlay}></div>
            <div className={`${style.registerMainForm} ${style.loginMainForm}`}>
                <h2>Register</h2>
                <div className={style.inputGroup}>
                    <input type="text" placeholder="Full Name" />
                    <FaUser className={style.icon} />
                </div>
                <div className={style.inputGroup}>
                    <input type="email" placeholder="Email" />
                    <FaEnvelope className={style.icon} />
                </div>
                <div className={style.inputGroup}>
                    <input type="password" placeholder="Password" />
                    <FaLock className={style.icon} />
                </div>
                <div className={style.inputGroup}>
                    <input type="password" placeholder="Confirm Password" />
                    <FaLock className={style.icon} />
                </div>
                <button className={`${style.registerButton} ${style.loginButton}`}>Register</button>
                <div className={style.registerRedirect}>
                    <p>Already have an account? <Link href="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default page;
