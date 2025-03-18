import { useEffect, useState } from "react";
import Image from "next/image";
import style from './mobileMenu.module.css';
import { useRouter } from "next/navigation";
// import iskcon from "../../../../public/assets/ISKCON_logo.png"
const MobileMenu = ({ onClose }) => {
    const router = useRouter()
    const [activeMenu, setActiveMenu] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setTimeout(() => setIsVisible(true), 10);
    }, []);

    const toggleMenu = (index) => {
        setActiveMenu(activeMenu === index ? null : index);
    };

    return (
        <div className={`${style.mobileMain} ${isVisible ? style.open : ""}`}>
            <div className={style.mobileMainHead}>
                <div className={style.logo}>
                    {/* <Image
                        src={iskcon}
                        alt="Logo"
                        width={100}
                        height={80}
                    /> */}
                    <h1>logo</h1>
                </div>
                <div className={style.menuIcon} onClick={() => {
                    setIsVisible(false);
                    setTimeout(onClose, 400);
                }}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div className={style.mobileMenuItem}>
                <ul>
                    <li>
                        <div onClick={() => router.push("/")} className={style.MobileMenuIcons}>
                            <div className={style.MobileMenuIcon}>
                                <i className="fa-solid fa-house"></i>
                            </div>
                            Home
                        </div>
                    </li>
                    <li>
                        <div onClick={() => router.push("/about")} className={style.MobileMenuIcons}>
                            <div className={style.MobileMenuIcon}>
                                <i className="fas fa-info-circle"></i>

                            </div>
                            About
                        </div>
                    </li>
                    <li onClick={() => toggleMenu(0)}>
                        <div className={style.menuItemWrapper}>
                            <div className={style.MobileMenuIcons}>
                                <div className={style.MobileMenuIcon}>
                                    <i className="fas fa-user"></i>

                                </div>
                                Student
                            </div>
                            <i className={`fa-solid fa-angle-down ${activeMenu === 0 ? style.rotate : ""}`}></i>
                        </div>
                    </li>
                    <ul className={`${style.submenu} ${activeMenu === 0 ? style.open : ""}`}>
                        <li onClick={() => router.push("/registration")}><i className="fa-solid fa-angles-right"></i>Registration</li>
                        <li onClick={() => router.push("/result")}><i className="fa-solid fa-angles-right"></i> Result</li>
                    </ul>

                    <li>
                        <div onClick={() => router.push("https://www.sanskaarvalleyschool.in/contact-us/")} className={style.MobileMenuIcons}>
                            <div className={style.MobileMenuIcon}>
                                <i className="fa-solid fa-phone"></i>
                            </div>
                            Contact
                        </div>
                    </li>
                    <li>
                        <div onClick={() => router.push("/login")} className={style.MobileMenuIcons}>
                            <div className={style.MobileMenuIcon}>
                                <i className="fa-solid fa-phone"></i>
                            </div>
                            Login
                        </div>
                    </li>


                </ul>
            </div>
        </div>
    );
};

export default MobileMenu;
