"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import style from "./Header.module.css";
import MobileMenu from "./MobileMenu";

const Header = () => {
    const router = useRouter();
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [activeMenu, setActiveMenu] = useState("/");
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleMouseEnter = (index) => {
        setOpenSubmenu(index);
    };

    const handleMouseLeave = () => {
        setOpenSubmenu(null);
    };

    const handleMenuClick = (path) => {
        setActiveMenu(path);
        setIsMobileMenuOpen(false);
        router.push(path);// Close menu on selection
    };

    if (!isMounted) return null;

    return (
        <div className={style.mainHeaders}>
            <div className={style.mainHeader}>
                <div className="container">
                    <div className={style.headerContent}>
                        <div className={style.logo}>
                            <h1>Logo</h1>
                        </div>

                        {/* Desktop Menu */}
                        <ul className={`${style.navMenu} ${isMobileMenuOpen ? style.mobileMenuOpen : ""}`}>
                            <li onClick={() => handleMenuClick("/")} className={pathname === "/" ? "active" : ""}>
                                <Link href="/">Home</Link>
                            </li>
                            <li onClick={() => handleMenuClick("/about")} className={pathname === "/about" ? "active" : ""}>
                                <Link href="/about">About</Link>
                            </li>
                            <li className={`${style.hasSubmenu} ${openSubmenu === 2 ? style.open : ""} ${pathname.includes("/student") ? "active" : ""}`}
                                onMouseEnter={() => handleMouseEnter(2)}
                                onMouseLeave={handleMouseLeave}>
                                <Link href="#">Student <i className={`${style.submenuIcon} fa-solid fa-angle-left`}></i></Link>
                                <ul className={style.submenu}>
                                    <li onClick={() => handleMenuClick("/registration")}>
                                        <Link href="/registration">Student Registration</Link>
                                    </li>
                                    <li onClick={() => handleMenuClick("/result")}>
                                        <Link href="/result">Result</Link>
                                    </li>
                                </ul>

                            </li>
                            <li className={pathname === "/contact" ? "active" : ""}>
                                <Link href="https://www.sanskaarvalleyschool.in/contact-us/">Contact</Link>
                            </li>
                            <li className={pathname === "/login" ? "active" : ""}>
                                <Link href="/login">Login</Link>
                            </li>
                        </ul>

                        <div className={style.admissionBtn}>
                            <button onClick={() => router.push("/registration")}>Admission Open</button>
                        </div>

                        {/* Mobile Menu Icon */}
                        <div className={style.MenuIcon} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <i className="fa-solid fa-bars"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <MobileMenu />
            )}
        </div>
    );
};

export default Header;
