import React from 'react';
import style from "./membership.module.css";

const courses = [
    {
        title: "Advanced Html Development",
        description: "Learn modern React development with advanced patterns and hooks.",
        rating: "4.8",
        faculty: "John Doe",
        fee: "₹199",
        duration: "6 weeks",
        level: "Advanced",
        image: "https://img.freepik.com/free-photo/programming-background-collage_23-2149901776.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost"
    },
    {
        title: "Css Development",
        description: "Master both frontend and backend development using JavaScript.",
        rating: "4.7",
        faculty: "Jane Smith",
        fee: "₹270",
        duration: "5 weeks",
        level: "Intermediate",
        image: "https://img.freepik.com/free-photo/programming-background-collage_23-2149901769.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost"
    },
    {
        title: "Javascript",
        description: "Enhance your design skills with essential UI/UX principles.",
        rating: "4.6",
        faculty: "Alice Brown",
        fee: "₹785",
        duration: "8 weeks",
        level: "Beginner",
        image: "https://img.freepik.com/free-photo/person-front-computer-working-html_23-2150040428.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost"
    },
    {
        title: "Machine Learning Basics",
        description: "Understand core machine learning concepts and their applications.",
        rating: "4.9",
        faculty: "David Johnson",
        fee: "₹1150",
        duration: "10 weeks",
        level: "Advanced",
        image: "https://img.freepik.com/free-vector/artificial-intelligence-template-landing-page_23-2148376198.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost"
    },
    {
        title: "Cloud Computing Essentials",
        description: "Get started with cloud technologies and deployment strategies.",
        rating: "4.7",
        faculty: "Emily White",
        fee: "₹1110",
        duration: "7 weeks",
        level: "Intermediate",
        image: "https://img.freepik.com/free-vector/cloud-technology-elements-isometric-style_52683-540.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost"
    },
     {
        title: "Cloud Computing Essentials",
        description: "Get started with cloud technologies and deployment strategies.",
        rating: "4.7",
        faculty: "Emily White",
        fee: "₹1110",
        duration: "7 weeks",
        level: "Intermediate",
        image: "https://img.freepik.com/free-vector/cloud-technology-elements-isometric-style_52683-540.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost"
    }
];

const MembershipCourses = () => {
    return (
        <div className={style.membershipContainer}>
            <div className="container mt-5">
                <h2 className={style.heading}>Exclusive Membership Courses</h2>
                <p className={style.description}>Access premium courses exclusively available for members. Enhance your skills and stay ahead in the industry.</p>
                <div className={style.courseGrid}>
                    {courses.map((course, index) => (
                        <div key={index} className={style.courseCard}>
                            <img src={course.image} alt={course.title} className={style.courseImage} />
                            <div className={style.courseHeader}>
                                <p>{course.duration} | {course.level} | {course.faculty}</p>
                                <span className={style.courseRating}>⭐{course.rating}</span>
                            </div>
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                            <p className={style.feeS}><strong>Fee:</strong> {course.fee}</p>
                            <button className={style.enrollBtn}>Enroll Now</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MembershipCourses;