import React from 'react'
import style from "./affiliateAnalysis.module.css"
import BredCrumb from '@/app/Components/breadcrumb/BreadCrumb'
const page = () => {
    return (
        <div className={style.affiliateAnalysisMains}>
            <BredCrumb title="Affiliate Analysis" />
            <div className="container">
                <div className={style.affiliateAnalysisMains}>
                    <h1>Affiliate Analysis</h1>
                </div>
            </div>
        </div>
    )
}

export default page
