import { useEffect, useState } from "react";
import Image from "next/image";
import style from "./Header.module.css";
// import iskcon from "../../../../public/assets/ISKCON_logo.png"
const MobileMenu = ({ onClose }) => {
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
                        <div className={style.MobileMenuIcons}>
                            <div className={style.MobileMenuIcon}>
                                <i className="fa-solid fa-house"></i>
                            </div>
                            Home
                        </div>
                    </li>
                    <li onClick={() => toggleMenu(0)}>
                        <div className={style.menuItemWrapper}>
                            <div className={style.MobileMenuIcons}>
                                <div className={style.MobileMenuIcon}>
                                    <i className="fa-solid fa-house"></i>
                                </div>
                                E-Pooja
                            </div>
                            <i className={`fa-solid fa-angle-down ${activeMenu === 0 ? style.rotate : ""}`}></i>
                        </div>
                    </li>
                    <ul className={`${style.submenu} ${activeMenu === 0 ? style.open : ""}`}>
                        <li><i className="fa-solid fa-angles-right"></i> Submenu 1</li>
                        <li><i className="fa-solid fa-angles-right"></i> Submenu 2</li>
                    </ul>
                    <li onClick={() => toggleMenu(1)}>
                        <div className={style.menuItemWrapper}>
                            <div className={style.MobileMenuIcons}>
                                <div className={style.MobileMenuIcon}>
                                    <i className="fa-solid fa-house"></i>
                                </div>
                                Recurring Donation
                            </div>
                            <i className={`fa-solid fa-angle-down ${activeMenu === 1 ? style.rotate : ""}`}></i>
                        </div>
                    </li>
                    <ul className={`${style.submenu} ${activeMenu === 1 ? style.open : ""}`}>
                        <li><i className="fa-solid fa-angles-right"></i> Submenu 1</li>
                        <li><i className="fa-solid fa-angles-right"></i> Submenu 2</li>
                    </ul>
                    <li>
                        <div className={style.MobileMenuIcons}>
                            <div className={style.MobileMenuIcon}>
                                <i className="fa-solid fa-house"></i>
                            </div>
                            Join Iskcon
                        </div>
                    </li>
                    <li>
                        <div className={style.MobileMenuIcons}>
                            <div className={style.MobileMenuIcon}>
                                <i className="fa-solid fa-house"></i>
                            </div>
                            Contact
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MobileMenu;
