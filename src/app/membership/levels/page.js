import React from 'react';
import style from "./levels.module.css";
import BredCrumb from '@/app/Components/breadcrumb/BreadCrumb';

const membershipLevels = [
    { level: "Basic", price: "₹1210", features: ["Access to free courses", "Community support", "Limited quizzes"] },
    { level: "Pro", price: "₹1430", features: ["Access to all courses", "Priority support", "Certificate of completion"] },
    { level: "Premium", price: "₹2350", features: ["One-on-one mentoring", "Exclusive webinars", "Advanced analytics"] }
];

const MembershipLevels = () => {
    return (
        <div className={style.membershipLevelsMain}>
            <BredCrumb title="Membership Levels" />
            <div className="container py-5">
                <h2 className={style.heading}>Choose Your Membership Plan</h2>
                <div className={style.levelsGrid}>
                    {membershipLevels.map((level, index) => (
                        <div key={index} className={style.levelCard}>
                            <h3 className={style.levelTitle}>{level.level}</h3>
                            <p className={style.levelPrice}>{level.price}/month</p>
                            <ul className={style.featuresList}>
                                {level.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>
                            <button className={style.joinButton}>Purchase Now</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MembershipLevels;
