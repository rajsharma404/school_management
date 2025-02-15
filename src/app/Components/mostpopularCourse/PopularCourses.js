"use client"
import React, { useState } from 'react';
import style from "./PopularCourses.module.css";
import { FaStar, FaClock } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
const PopularCourses = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const courses = {
        tab1: [
            { id: 1, level: "All Level", title: "Responsive Websites", description: "Learn the fundamentals responsive of React.", rating: 4.5, hours: "10h 30m", lectures: "68 lectures", image: "https://img.freepik.com/free-photo/back-school-concept-with-pencils-keyboard-mouse-calculator-abacus-blue-background-flat-lay_176474-7029.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid" },
            { id: 2, level: "Begineer", title: "Advanced React", description: "Learn the fundamentals Deep dive into React concepts.", rating: 4.8, hours: "15h", lectures: "76 lectures", image: "https://img.freepik.com/free-photo/view-notebook-yellow-background_23-2149382393.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid" },
            { id: 3, level: "All Level", title: "React Basics", description: "Learn the fundamentals of React.", rating: 4.5, hours: "10h", lectures: "68 lectures", image: "https://img.freepik.com/free-photo/city-committed-education-collage-concept_23-2150062201.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost" },
            { id: 4, level: "All Level", title: "Advanced React", description: "Deep dive into React Learn the fundamentals concepts.", rating: 4.8, hours: "15h", lectures: "18 lectures", image: "https://img.freepik.com/free-photo/top-view-desk-concept-with-chalkboard_23-2148236846.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost" },
            { id: 5, level: "All Level", title: "React Basics", description: "Learn the fundamentals of React.", rating: 4.5, hours: "10h", lectures: "68 lectures", image: "https://img.freepik.com/free-photo/city-committed-education-collage-concept_23-2150062201.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost" },
            { id: 6, level: "All Level", title: "Advanced React", description: "Deep dive into React Learn the fundamentals concepts.", rating: 4.8, hours: "15h", lectures: "18 lectures", image: "https://img.freepik.com/free-photo/top-view-desk-concept-with-chalkboard_23-2148236846.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost" },
            { id: 7, level: "Begineer", title: "Advanced React", description: "Learn the fundamentals Deep dive into React concepts.", rating: 4.8, hours: "15h", lectures: "76 lectures", image: "https://img.freepik.com/free-photo/view-notebook-yellow-background_23-2149382393.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid" },

            { id: 8, level: "All Level", title: "React Basics", description: "Learn the fundamentals of React.", rating: 4.5, hours: "10h", lectures: "68 lectures", image: "https://img.freepik.com/free-photo/city-committed-education-collage-concept_23-2150062201.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost" },

        ],
        tab2: [
            { id: 1, level: "All Level", title: "React Basics", description: "Learn the fundamentals of React.", rating: 4.5, hours: "10h", lectures: "68 lectures", image: "https://img.freepik.com/free-photo/city-committed-education-collage-concept_23-2150062201.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost" },
            { id: 2, level: "All Level", title: "Advanced React", description: "Deep dive into React Learn the fundamentals concepts.", rating: 4.8, hours: "15h", lectures: "18 lectures", image: "https://img.freepik.com/free-photo/top-view-desk-concept-with-chalkboard_23-2148236846.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost" },
            { id: 3, level: "Begineer", title: "Advanced React", description: "Learn the fundamentals Deep dive into React concepts.", rating: 4.8, hours: "15h", lectures: "76 lectures", image: "https://img.freepik.com/free-photo/view-notebook-yellow-background_23-2149382393.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid" },

            { id: 4, level: "All Level", title: "React Basics", description: "Learn the fundamentals of React.", rating: 4.5, hours: "10h", lectures: "68 lectures", image: "https://img.freepik.com/free-photo/city-committed-education-collage-concept_23-2150062201.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost" },
        ],
        tab3: [
            { id: 1, level: "All Level", title: "Responsive Websites", description: "Learn the fundamentals responsive of React.", rating: 4.5, hours: "10h 30m", lectures: "68 lectures", image: "https://img.freepik.com/free-photo/back-school-concept-with-pencils-keyboard-mouse-calculator-abacus-blue-background-flat-lay_176474-7029.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid" },
            { id: 2, level: "Begineer", title: "Advanced React", description: "Learn the fundamentals Deep dive into React concepts.", rating: 4.8, hours: "15h", lectures: "76 lectures", image: "https://img.freepik.com/free-photo/view-notebook-yellow-background_23-2149382393.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid" },
            { id: 3, level: "All Level", title: "React Basics", description: "Learn the fundamentals of React.", rating: 4.5, hours: "10h", lectures: "68 lectures", image: "https://img.freepik.com/free-photo/city-committed-education-collage-concept_23-2150062201.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost" },
            { id: 4, level: "All Level", title: "Advanced React", description: "Deep dive into React Learn the fundamentals concepts.", rating: 4.8, hours: "15h", lectures: "18 lectures", image: "https://img.freepik.com/free-photo/top-view-desk-concept-with-chalkboard_23-2148236846.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost" }
        ],
        tab4: [
            { id: 1, level: "All Level", title: "React Basics", description: "Learn the fundamentals of React.", rating: 4.5, hours: "10h", lectures: "68 lectures", image: "https://img.freepik.com/free-photo/city-committed-education-collage-concept_23-2150062201.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost" },
            { id: 2, level: "All Level", title: "Advanced React", description: "Deep dive into React Learn the fundamentals concepts.", rating: 4.8, hours: "15h", lectures: "18 lectures", image: "https://img.freepik.com/free-photo/top-view-desk-concept-with-chalkboard_23-2148236846.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost" },
            { id: 3, level: "Begineer", title: "Advanced React", description: "Learn the fundamentals Deep dive into React concepts.", rating: 4.8, hours: "15h", lectures: "76 lectures", image: "https://img.freepik.com/free-photo/view-notebook-yellow-background_23-2149382393.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid" },

            { id: 4, level: "All Level", title: "React Basics", description: "Learn the fundamentals of React.", rating: 4.5, hours: "10h", lectures: "68 lectures", image: "https://img.freepik.com/free-photo/city-committed-education-collage-concept_23-2150062201.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost" },
        ],
        tab5: [
            { id: 1, level: "All Level", title: "Responsive Websites", description: "Learn the fundamentals responsive of React.", rating: 4.5, hours: "10h 30m", lectures: "68 lectures", image: "https://img.freepik.com/free-photo/back-school-concept-with-pencils-keyboard-mouse-calculator-abacus-blue-background-flat-lay_176474-7029.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid" },
            { id: 2, level: "Begineer", title: "Advanced React", description: "Learn the fundamentals Deep dive into React concepts.", rating: 4.8, hours: "15h", lectures: "76 lectures", image: "https://img.freepik.com/free-photo/view-notebook-yellow-background_23-2149382393.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid" },
            { id: 3, level: "All Level", title: "React Basics", description: "Learn the fundamentals of React.", rating: 4.5, hours: "10h", lectures: "68 lectures", image: "https://img.freepik.com/free-photo/city-committed-education-collage-concept_23-2150062201.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost" },
            { id: 4, level: "All Level", title: "Advanced React", description: "Deep dive into React Learn the fundamentals concepts.", rating: 4.8, hours: "15h", lectures: "18 lectures", image: "https://img.freepik.com/free-photo/top-view-desk-concept-with-chalkboard_23-2148236846.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost" }
        ],
    };

    return (
        <div className={style.MostPopularCourses}>
            <h1>Most Popular Courses</h1>
            <p>Choose from hundreds of courses from specialist organizations</p>
            <div className={style.Tabs}>
                <button onClick={() => setActiveTab('tab1')} className={activeTab === 'tab1' ? style.Active : ''}>Web Design</button>
                <button onClick={() => setActiveTab('tab2')} className={activeTab === 'tab2' ? style.Active : ''}>Development</button>
                <button onClick={() => setActiveTab('tab3')} className={activeTab === 'tab3' ? style.Active : ''}>Mathematics</button>
                <button onClick={() => setActiveTab('tab4')} className={activeTab === 'tab4' ? style.Active : ''}>English</button>
                <button onClick={() => setActiveTab('tab5')} className={activeTab === 'tab5' ? style.Active : ''}>Chemistry</button>
            </div>
            <div className={style.CoursesContainer}>
                {courses[activeTab].map(course => (
                    <div key={course.id} className={style.CourseCard}>
                        <div className={style.CourseCardImage}>
                            <img src={course.image} alt={course.title} className={style.CourseImage} />
                        </div>
                        <div className={style.CourseCardLevel}>
                            <span>{course.level}</span>
                            <CiHeart />

                        </div>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <div className={style.CourseInfo}>
                            <span>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                {course.rating}
                            </span>
                        </div>
                        <div className={style.CourseInfoHours}>
                            <span><i className="fa-regular fa-clock"></i> {course.hours}</span>
                            <span><i className="fa-solid fa-table"></i> {course.lectures}</span>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularCourses;
