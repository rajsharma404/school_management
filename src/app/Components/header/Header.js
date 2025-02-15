"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import style from "./Header.module.css";

const Header = () => {
    const router = useRouter();
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [activeMenu, setActiveMenu] = useState("/");
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

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
    };

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen((prevState) => !prevState);
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
                        <ul className={style.navMenu}>
                            <li onClick={() => router.push("/")} className={pathname === "/" ? "active" : ""}>
                                <Link href="/">Home</Link>

                            </li>

                            <li className={`${style.hasSubmenu} ${openSubmenu === 2 ? style.open : ""} ${pathname.includes("/classes") ? "active" : ""}`}
                                onMouseEnter={() => handleMouseEnter(2)}
                                onMouseLeave={handleMouseLeave}>
                                <Link href="#">Classes </Link><i className={`${style.submenuIcon} fa-solid fa-angle-left`}></i>
                                <ul className={style.submenu}>
                                    <li className={`${style.hasNestedSubmenu} ${openSubmenu === 3 ? style.open : ""}`}
                                        onMouseEnter={() => setOpenSubmenu(3)}
                                        onMouseLeave={() => setOpenSubmenu(2)}>
                                        <Link href="#">Live Classes  <i className={`${style.submenuIcon} fa-solid fa-angle-left`}></i></Link>
                                        <ul className={style.nestedSubmenu}>
                                            <li onClick={() => router.push("/classes/create-live-workshop")}>
                                                Create live workshop
                                            </li>
                                            <li onClick={() => router.push("/classes/zoom")}>
                                                Zoom/Gmeet/Jitsi
                                            </li>
                                            <li onClick={() => router.push("/classes/recording")}>
                                                recording
                                            </li>
                                            <li onClick={() => router.push("/classes/attendance")}>
                                                Attendance/Duration
                                            </li>
                                            <li onClick={() => router.push("/classes/recurring")}>
                                                Recurring/onetimeon
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={`${style.hasNestedSubmenu} ${openSubmenu === 3 ? style.open : ""}`}
                                        onMouseEnter={() => setOpenSubmenu(3)}
                                        onMouseLeave={() => setOpenSubmenu(2)}>
                                        <Link href="/offline-classes">Ofline Classes <i className={`${style.submenuIcon} fa-solid fa-angle-left`}></i></Link>
                                        <ul className={style.nestedSubmenu}>
                                            <li onClick={() => router.push("/offline-classes/create-classes")}>
                                                Create Classes
                                            </li>
                                            <li onClick={() => router.push("/offline-classes/attendance-marking")}>
                                                Attendance marking
                                            </li>
                                            <li onClick={() => router.push("/offline-classes/onthespot-registration")}>
                                                On the spot registration
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={`${style.hasNestedSubmenu} ${openSubmenu === 3 ? style.open : ""}`}
                                        onMouseEnter={() => setOpenSubmenu(3)}
                                        onMouseLeave={() => setOpenSubmenu(2)}>
                                        <Link href="#">Recorded Course <i className={`${style.submenuIcon} fa-solid fa-angle-left`}></i></Link>
                                        <ul className={style.nestedSubmenu}>
                                            <li onClick={() => router.push("/recorded-course/builder")}>
                                                Course Builder
                                            </li>
                                            <li onClick={() => router.push("/recorded-course/assignment")}>
                                                Quiz/assignment
                                            </li>
                                            <li><Link href="#">Drip content</Link></li>
                                        </ul>
                                    </li>
                                    <li className={`${style.hasNestedSubmenu} ${openSubmenu === 3 ? style.open : ""}`}
                                        onMouseEnter={() => setOpenSubmenu(3)}
                                        onMouseLeave={() => setOpenSubmenu(2)}>
                                        <Link href="/recurring-donation/monthly">One to one session <i className={`${style.submenuIcon} fa-solid fa-angle-left`}></i></Link>
                                        <ul className={style.nestedSubmenu}>
                                            <li><Link href="/live-class/recorded">Calender plannig</Link></li>
                                        </ul>
                                    </li>
                                    <li className={`${style.hasNestedSubmenu} ${openSubmenu === 3 ? style.open : ""}`}
                                        onMouseEnter={() => setOpenSubmenu(3)}
                                        onMouseLeave={() => setOpenSubmenu(2)}>
                                        <Link href="/membership">Membership <i className={`${style.submenuIcon} fa-solid fa-angle-left`}></i></Link>
                                        <ul className={style.nestedSubmenu}>
                                            <li onClick={() => router.push("/membership/levels")}>
                                                Name of levels/membership
                                            </li>
                                            <li onClick={() => router.push("/membership/courses")}>
                                                levels to courses/classes
                                            </li>
                                        </ul>
                                    </li>

                                </ul>
                            </li>

                            <li className={`${style.hasSubmenu} ${openSubmenu === 2 ? style.open : ""} ${pathname.includes("/volunteer") ? "active" : ""}`}
                                onMouseEnter={() => handleMouseEnter(2)}
                                onMouseLeave={handleMouseLeave}>
                                <Link href="#">Volunteer <i className={`${style.submenuIcon} fa-solid fa-angle-left`}></i></Link>
                                <ul className={style.submenu}>
                                    <li onClick={() => router.push("/volunteer/registration")}>
                                        Volunteer Registration
                                    </li>
                                    <li onClick={() => router.push("/volunteer/tracking")}>
                                        Volunteer Tracking
                                    </li>
                                    <li onClick={() => router.push("#")}>
                                        Volunteer Link
                                    </li>

                                </ul>
                            </li>
                            <li className={`${style.hasSubmenu} ${openSubmenu === 2 ? style.open : ""} ${pathname.includes("#") ? "active" : ""}`}
                                onMouseEnter={() => handleMouseEnter(2)}
                                onMouseLeave={handleMouseLeave}>
                                <Link href="#">Mentor Allotment <i className={`${style.submenuIcon} fa-solid fa-angle-left`}></i></Link>
                                <ul className={style.submenu}>
                                    <li><Link href="#">Select Mentor</Link></li>
                                    <li><Link href="#">Allot Student To Mentor</Link></li>
                                    <li><Link href="#">Custom Contribution</Link></li>
                                </ul>
                            </li>
                            <li className={`${style.hasSubmenu} ${openSubmenu === 2 ? style.open : ""} ${pathname.includes("/reports") ? "active" : ""}`}
                                onMouseEnter={() => handleMouseEnter(2)}
                                onMouseLeave={handleMouseLeave}>
                                <Link href="#">Reports <i className={`${style.submenuIcon} fa-solid fa-angle-left`}></i></Link>
                                <ul className={style.submenu}>
                                    <li onClick={() => router.push("/reports/enrolled-student")}>
                                        Enrolled Student
                                    </li>
                                    <li onClick={() => router.push("/reports/student-analysis")}>
                                        Student Analysis
                                    </li>
                                    <li onClick={() => router.push("/reports/class-analysis")}>
                                        Class Analysis
                                    </li>
                                    <li onClick={() => router.push("/reports/mentor-analysis")}>
                                        Mentor Analysis
                                    </li>
                                    <li onClick={() => router.push("/reports/affiliate-analysis")}>
                                        Affiliate Analysis
                                    </li>
                                </ul>
                            </li>
                            <li className={pathname === "/blog" ? "active" : ""}>
                                <Link href="/blog">Blog</Link>
                            </li>
                            <li className={pathname === "/contact" ? "active" : ""}>
                                <Link href="/contact">Contact</Link>
                            </li>
                        </ul>

                        <div className={style.searchBarProfile}>
                            <div className={style.searchBar}>
                                <input type="text" placeholder="Search..." className={style.searchInput} />
                                <i className="fa-solid fa-search"></i>
                            </div>
                            <div className={style.profile} onClick={toggleProfileDropdown}>
                                <Image
                                    width={50}
                                    height={50}
                                    src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid"
                                    alt="not-found"
                                />
                                {profileDropdownOpen && (
                                    <div className={style.profileDropdown}>
                                        <div className={style.profileEdit}>
                                            <div className={style.profileEditImage}>
                                                <Image
                                                    width={50}
                                                    height={50}
                                                    src="https://img.freepik.com/free-photo/picture-serious-calm-female-with-pleasant-appearance_176532-7182.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid"
                                                    alt="not-found"
                                                />
                                            </div>
                                            <div className={style.profileEditTitle}>
                                                <h3>Lerning</h3>
                                                <p>learning@gmail.com</p>


                                            </div>

                                        </div>
                                        <ul>
                                            <li><Link href="#"><i className="fa-solid fa-user"></i>Edit Profile</Link></li>

                                            <li><Link href="#"><i className="fa-solid fa-gear"></i>Account Settings</Link></li>
                                            <li><i className="fa-solid fa-circle-info"></i>
                                                Help</li>
                                            <li><Link href="/login"><i className="fa-solid fa-right-to-bracket"></i>Sign out</Link></li>

                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.MenuIcon} onClick={() => setIsMobileMenuOpen(true)}>
                    <i className="fa-solid fa-bars"></i>
                </div>
            </div>
        </div>
    );
};

export default Header;
