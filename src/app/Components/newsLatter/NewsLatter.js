"use client"
import React, { useEffect, useState } from 'react';
import style from "./NewsLatter.module.css";
import Link from 'next/link';

const NewsLatter = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div className={style.newsLatterMain}><div className="container">Loading...</div></div>;
    }

    return (
        <div className={style.newsLatterMain}>
            <div className="container">
                <div className={style.newsLatter}>
                    <div className={style.newsLatterPhone}>
                        <i className="fa-solid fa-phone"></i>
                        <div className={style.newsLatterPhones}>
                            <p>Need Help, Call Our HOTLINE!</p>
                            <Link href={"tel:123456789"}>+123456-7890</Link>
                        </div>
                    </div>
                    <div className={style.newsLatterOr}>
                        <div className={style.or}>OR</div>
                    </div>
                    <div className={style.newsLatterEmail}>
                        <div className={style.newsLatterEmailField}>
                            <p>Our Temple Newsletter</p>
                            <input
                                type="email"
                                placeholder="Enter your email..."
                                className={style.emailInput}
                            />
                            <p>Please select at least one list.</p>
                        </div>
                        <button className={style.emailButton}>
                            <i className={`fas fa-envelope ${style.emailIcon}`}></i>
                        </button>
                        {/* <div className={style.newsLatterEmailImage}>
                            <Image src={basoori} width={200} height={600} alt='Not found' />
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsLatter;
