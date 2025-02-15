import React from "react";
import Link from "next/link"; // Import Next.js Link
import style from "./login.module.css";
import { FaUser, FaLock } from "react-icons/fa"; // Importing icons

const Page = () => {
    return (
        <div className={style.loginMain}>
            <div className={style.loginMainOverlay}></div>
            <div className={style.loginMainForm}>
                <h2>Login</h2>
                <div className={style.inputGroup}>
                    <input type="text" placeholder="Username" />
                    <FaUser className={style.icon} />
                </div>
                <div className={style.inputGroup}>
                    <input type="password" placeholder="Password" />
                    <FaLock className={style.icon} />
                </div>
                <div className={style.loginActions}>
                    <label>
                        <input type="checkbox" /> Remember Me
                    </label>
                    <Link href="/forgot_password">Forgot Password?</Link>
                </div>
                <button className={style.loginButton}>Login</button>
                <div className={style.registerRedirect}>
                    <p>Don't have an account? <Link href="/register">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Page;
