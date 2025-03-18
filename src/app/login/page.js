"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./login.module.css";
import { FaUser, FaLock, FaUserTie } from "react-icons/fa";
import Link from "next/link";
// Dynamically import ToastContainer to prevent hydration issues
const ToastContainerDynamic = dynamic(
    () => import("react-toastify").then((mod) => mod.ToastContainer),
    { ssr: false }
);

const Page = () => {
    const [role, setRole] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    // Prevent hydration errors by ensuring client-side rendering
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Avoid rendering until after hydration
    if (!isMounted) return null;

    const handleLogin = async () => {
        if (!role || !username || !password) {
            toast.error("⚠️ Please fill in all fields!");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role, username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "❌ Login failed!");
                setLoading(false);
                return;
            }

            toast.success("✅ Login Successful!");

            // Delay navigation slightly to prevent hydration issues
            setTimeout(() => {
                const roleRedirects = {
                    admin: "/dashboard",
                    teacher: "/teacher",
                    student: "/student",
                };
                router.push(roleRedirects[role] || "/");
            }, 2000);
        } catch (err) {
            toast.error("❌ Server error, try again later!");
        }

        setLoading(false);
    };

    return (
        <div className={style.loginMain}>
            <ToastContainerDynamic position="top-right" autoClose={3000} />
            <div className={style.loginMainOverlay}></div>
            <div className={style.loginMainForm}>
                <h1 className={style.loginTitle}>Login Dashboard</h1>

                <div className={style.inputGroup}>
                    <div className={style.iconLogo}>
                        <FaUserTie className={style.icon} />
                    </div>

                    <select
                        className={style.roleSelect}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="">Select Role</option>
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
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className={style.inputGroup}>
                    <div className={style.iconLogo}>
                        <FaLock className={style.icon} />
                    </div>

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className={style.loginButton}
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                <div className={style.registerRedirect}>
                    <p>Forgot Password? <Link href="/forgot_password">Click Here</Link></p>
                </div>
            </div>

        </div>
    );
};

export default Page;
