import React from 'react';
import style from "./BreadCrumb.module.css";
import Link from 'next/link';

const BredCrumb = ({ title }) => {
    return (
        <div className={style.breadcrumbMains}>
            <div className={style.breadcrumbMain}></div>
            <div className={style.breadcrumOverlay}></div>
            <div className={style.breadcrumContent}>
                <h1>{title}</h1>
                <span>
                    <p>{title} / </p>
                    <Link href="/" passHref> {/* Ensure href is correctly passed */}
                        Home
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default BredCrumb;
