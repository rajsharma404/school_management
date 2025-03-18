import React, { useState } from "react";
import { useRouter } from "next/navigation";
import style from "./Header.module.css";

const Header = ({ onMenuClick, onMobileClick }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = async () => {
        try {
            await fetch("/api/logout", { method: "GET" });
            window.location.href = "/login"; // Redirect to login page
        } catch (error) {
            console.error("Logout failed", error);
        }
    };


    return (
        <div className="container text-white p-3">
            <div className={style.socialIcon}>
                <div onClick={onMenuClick} className={style.menuIcon}>
                    <i className="fa-solid fa-bars"></i>
                </div>
                <div onClick={onMobileClick} className={style.MobileMenu}>
                    <i className="fa-solid fa-bars"></i>
                </div>
                <div className={style.searchbar}>
                    <form className="inputt d-flex align-items-center" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search..."
                            aria-label="Search"
                        />
                        <i className="fas fa-search"></i>
                    </form>
                </div>

                <div className={style.mainProfile}>
                    <div className={`${style.notification} ${style.menuIcon}`}>
                        <i className="fa-regular fa-bell"></i>
                        <div className={style.notificationCount}>7</div>
                    </div>
                    <div className={`${style.message} ${style.menuIcon} ${style.notification}`}>
                        <i className="fa-regular fa-envelope"></i>
                        <div className={`${style.notificationCount} ${style.notificationCountMessage}`}>3</div>
                    </div>

                    {/* Profile Section */}
                    <div className={style.profile} onClick={toggleDropdown}>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpkITbb7nWHDCRxGfvdxukLljSoPFm6eAALw&s"
                            alt="Profile"
                        />
                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className={style.dropdownMenu}>
                                <ul>
                                    <li><i className="fa-solid fa-user"></i> Edit Profile</li>
                                    <li><i className="fa-solid fa-cog"></i> Settings</li>
                                    <li onClick={handleLogout}><i className="fa-solid fa-sign-out"></i> Logout</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
