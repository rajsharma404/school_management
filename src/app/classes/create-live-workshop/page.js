import React from "react";
import styles from "./liveWorkshop.module.css";
import { FaVideo, FaClock, FaUserTie } from "react-icons/fa";
import BredCrumb from "@/app/Components/breadcrumb/BreadCrumb";

const LiveWorkshop = () => {
    const workshops = [
        {
            id: 1,
            title: "Mathematics",
            instructor: "John Doe",
            time: "March 15, 2025 - 5:00 PM (UTC)",
        },
        {
            id: 2,
            title: "Chemistry",
            instructor: "Jane Smith",
            time: "March 20, 2025 - 6:30 PM (UTC)",
        },
        {
            id: 3,
            title: " Advanced Next Js",
            instructor: "Jane Smith",
            time: "March 20, 2025 - 6:30 PM (UTC)",
        },
        {
            id: 4,
            title: "Physics",
            instructor: "Jane Smith",
            time: "March 20, 2025 - 6:30 PM (UTC)",
        },
    ];

    return (
        <div className={styles.liveWorkshopMains}>
            <BredCrumb title={"Live Workshop"} />
            <div className={styles.liveWorkshopMain}>
                <h1 className={styles.title}>Live Workshops</h1>
                <p className={styles.description}>
                    Join our expert-led live workshops to enhance your skills in web
                    development and programming.
                </p>
                <div className={styles.workshopList}>
                    {workshops.map((workshop) => (
                        <div key={workshop.id} className={styles.workshopCard}>
                            <FaVideo className={styles.icon} />
                            <h2>{workshop.title}</h2>
                            <p className={styles.instructor}><FaUserTie /> {workshop.instructor}</p>
                            <p className={styles.time}><FaClock /> {workshop.time}</p>
                            <button className={styles.joinButton}>Join Now</button>
                        </div>
                    ))}
                </div>
            </div>

        </div>

    );
};

export default LiveWorkshop;