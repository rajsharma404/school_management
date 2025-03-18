"use client"
import React, { useState, useEffect, useRef } from "react";
import style from "../mainlayout/MainLayout.module.css";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const TeacherMainLayout = ({ children }) => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isSidebarMobile, setSidebarMobile] = useState(false);
    const toggleSidebar = () => {
        setSidebarCollapsed((prev) => !prev);
    }
    const sidebarRef = useRef(null);

    const mobileMenu = () => {
        setSidebarMobile((prev) => !prev);
    };



    // Click outside to close the sidebar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setSidebarMobile(false); // Hide sidebar when clicking outside
            }
        };

        if (isSidebarMobile) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSidebarMobile]);

    return (
        <div className={style.mainLayout}>
            <div
                ref={sidebarRef}
                className={`${style.sidebar} ${isSidebarCollapsed ? style.collapsed : ""
                    } ${isSidebarMobile ? style.mobileSidebar : ""}`}
            >
                <Sidebar mobile={isSidebarMobile} isCollapsed={isSidebarCollapsed} isHidden="isHidden" dashboardAccess="teacher" dashboardAccessTeacher="teacher" />
            </div>
            <div className={style.headerBody}>
                <div className={style.header}>
                    <Header onMenuClick={toggleSidebar} onMobileClick={mobileMenu} />
                </div>
                <main>{children}</main>
                <div className={style.footer}>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default TeacherMainLayout;
