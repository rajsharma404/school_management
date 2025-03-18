import React from 'react'
import style from "../header/Header.module.css"
const Footer = () => {
    const url = "https://netxperia.com/"
    const target = "_blank"
    return (
        <div className={style.footer}>
            <p>© 2025 School Management, All Rights Reserved.</p>
            <p>Powered By: <a target={target} href={url}>NetxPeria</a></p>

        </div>
    )
}

export default Footer
