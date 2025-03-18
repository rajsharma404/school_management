"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import style from "./MainLayout.module.css"
const MainLayout = ({ children }) => {
  const [hideHeaderFooter, setHideHeaderFooter] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    setHideHeaderFooter(pathname === "/login" || pathname === "/register" || pathname === "/forgot_password");
  }, [pathname]);

  if (hideHeaderFooter === null) {
    return null;
  }

  return (
    <div className={style.MainLayouts}>
      {!hideHeaderFooter && <Header />}
      <main className={style.bodyPage}>{children}</main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
