"use client"
import React, { useState, useEffect } from "react";
import style from "../login/login.module.css";
import { FaUser, FaLock } from "react-icons/fa";

const Page = () => {
    const [email, setEmail] = useState("");
    const [showOTP, setShowOTP] = useState(false);
    const [timer, setTimer] = useState(60);
    const [otp, setOtp] = useState("");

    useEffect(() => {
        let interval;
        if (showOTP && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [showOTP, timer]);

    const handleEmailSubmit = () => {
        if (email) {
            setShowOTP(true);
            setTimer(60);
        } else {
            alert("Please enter a valid email.");
        }
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    return (
        <div className={style.loginMain}>
            <div className={style.loginMainOverlay}></div>
            <div className={style.loginMainForm}>
                <h2>Forgot Password</h2>
                {!showOTP && (
                    <div className={style.inputGroup}>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FaUser className={style.icon} />
                    </div>
                )}
                {showOTP && (
                    <div className={style.otpSection}>
                        <div className={style.inputGroup}>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={handleOtpChange}
                            />
                        </div>

                        <div className={style.timer}>
                            <span>Timer: {timer}s</span>
                        </div>
                    </div>
                )}
                <button className={style.loginButton} onClick={handleEmailSubmit}>Send OTP</button>
            </div>
        </div>
    );
};

export default Page;
