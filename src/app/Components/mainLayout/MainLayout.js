"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "../header/Header";
import Footer from "../footer/Footer";

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
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!hideHeaderFooter && <Header />}
      <main style={{ flex: "1 0 auto", width: "100%" }}>{children}</main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
