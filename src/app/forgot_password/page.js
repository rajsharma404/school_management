"use client";
import React, { useState, useEffect } from "react";
import style from "../login/login.module.css";
import { FaUser, FaLock, FaUserTie } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
const ForgotPassword = () => {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [role, setRole] = useState("admin"); // Default role
    const [showOTP, setShowOTP] = useState(false);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        let interval;
        if (showOTP && timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        } else if (timer === 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [showOTP, timer]);

    // Step 1: Send OTP
    const handleEmailSubmit = async () => {
        if (!email || !newPassword) {
            alert("Please enter email and new password.");
            return;
        }

        try {
            const res = await fetch("/api/forgot_password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, newPassword, role }),
            });

            const data = await res.json();
            if (data.success) {
                setShowOTP(true);
                setTimer(60);
                alert("OTP sent to your email.");
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    };

    // Step 2: Verify OTP and update password
    const handleOtpSubmit = async () => {
        if (!otp) {
            alert("Please enter the OTP.");
            return;
        }

        try {
            const res = await fetch("/api/verify_otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, newPassword, role }),
            });

            const data = await res.json();
            if (data.success) {
                alert("Password updated successfully! You can now log in.");

                // Reset form fields
                setEmail("");
                setNewPassword("");
                setOtp("");
                setRole("admin");
                setShowOTP(false);

                // Force full page reload to ensure proper redirection
                window.location.href = "/forgot_password";
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
        }
    };

    return (
        <div className={style.loginMain}>
            <div className={style.loginMainOverlay}></div>
            <div className={style.loginMainForm}>
                <h1 className={style.loginTitle}>Forgot Password</h1>

                {!showOTP && (
                    <>
                        <div className={style.inputGroup}>
                            <div className={style.iconLogo}>
                                <FaUserTie className={style.icon} />
                            </div>
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="admin">Admin</option>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </select>
                        </div>
                        <div className={style.inputGroup}>
                            <div className={style.iconLogo}>
                                <FaUser className={style.icon} />
                            </div>

                            <input
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={style.inputGroup}>
                            <div className={style.iconLogo}>
                                <FaLock className={style.icon} />
                            </div>
                            <input
                                type="password"
                                placeholder="Enter New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                    </>
                )}

                {showOTP && (
                    <div className={style.otpSection}>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        {timer > 0 && <span>Timer: {timer}s</span>}
                    </div>
                )}

                <button className={style.loginButton} onClick={showOTP ? handleOtpSubmit : handleEmailSubmit}>
                    {showOTP ? "Verify OTP" : "Send OTP"}
                </button>
                <div className={style.registerRedirect}>
                    <p>Already have an Account? <Link href="/login">Click Here</Link></p>
                </div>
            </div>

        </div>
    );
};

export default ForgotPassword;