"use client"
import { React, useState } from 'react';
import style from './blog.module.css';
import BredCrumb from '../Components/breadcrumb/BreadCrumb';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Image from 'next/image';

const Page = () => {
    const title = "Blog";
    const [date, setDate] = useState(new Date());
    const handleDateChange = (newDate) => {
        setDate(newDate);
    };
    const blogPosts = [
        {
            id: 1,
            title: "Exploring CSS Grid Layouts",
            author: "Mark Lee",
            date: "February 8, 2025",
            content: "CSS Grid is a powerful layout system. This post will explain how to get started with CSS Grid and its features.",
            image: "https://img.freepik.com/free-photo/start-up-designers_1098-14229.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid",
        },
        {
            id: 2,
            title: "Exploring CSS Grid Layouts",
            author: "Mark Lee",
            date: "February 8, 2025",
            content: "CSS Grid is a powerful layout system. This post will explain how to get started with CSS Grid and its features.",
            image: "https://img.freepik.com/free-photo/cute-smiling-young-woman-with-paper-hands_259150-60176.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid", // Add your image path here
        },
        {
            id: 3,
            title: "How to Build a React Application",
            author: "John Doe",
            date: "February 13, 2025",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet nulla nec elit interdum aliquet.",
            image: "https://img.freepik.com/free-photo/cute-young-brunette-doing-some-arts-crafts-video-her-blog-online_662251-2468.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid",
        },
        {
            id: 4,
            title: "Understanding JavaScript Closures",
            author: "Jane Smith",
            date: "February 10, 2025",
            content: "Closures are one of the most powerful features in JavaScript. In this article, we'll explore how closures work.",
            image: "https://img.freepik.com/free-photo/male-female-graphic-designers-using-graphics-tablet_1170-939.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid",
        },
        {
            id: 5,
            title: "Exploring CSS Grid Layouts",
            author: "Mark Lee",
            date: "February 8, 2025",
            content: "CSS Grid is a powerful layout system. This post will explain how to get started with CSS Grid and its features.",
            image: "https://img.freepik.com/free-photo/smiling-blogger-girl-is-holding-pencil-showing-perfect-gesture-with-other-hand-white-background_176474-117357.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid",
        },
        {
            id: 6,
            title: "Exploring CSS Grid Layouts",
            author: "Mark Lee",
            date: "February 8, 2025",
            content: "CSS Grid is a powerful layout system. This post will explain how to get started with CSS Grid and its features.",
            image: "https://img.freepik.com/free-photo/portrait-young-pretty-woman-sitting-table-student-learning-education-smiling-writing-notes-diary-book_285396-1.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid",
        },

    ];

    const nextCourse = [
        {
            id: 1,
            title: "Seo Training",
            author: "John Doe",
            date: "13/02/2025",
            type: "FREE",
            image: "https://img.freepik.com/free-photo/cheerful-young-woman-glasses-front-laptop_169016-33536.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid",
        },
        {
            id: 2,
            title: "learning",
            author: "John Doe",
            date: "13/02/2025",
            type: "FREE",
            image: "https://img.freepik.com/free-photo/preparing-presentation_1098-16345.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid",
        },
        {
            id: 3,
            title: "mathematics",
            author: "John Doe",
            date: "13/02/2025",
            type: "completed",
            image: "https://img.freepik.com/free-photo/close-up-student-online-class_23-2148888815.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid",
        },
    ]
    const bestRatedCourse = [
        {
            id: 1,
            title: "Computer",
            author: "John Doe",
            date: "13/02/2025",
            image: "https://img.freepik.com/free-photo/view-3d-book-with-graduation-cap_23-2151103703.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid",
        },
        {
            id: 2,
            title: "Geography",
            author: "John Doe",
            date: "13/02/2025",
            image: "https://img.freepik.com/free-photo/earth-globe-with-graduation-cap-education-day_23-2150980054.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid",
        },
        {
            id: 3,
            title: "mathematics",
            author: "John Doe",
            date: "13/02/2025",
            image: "https://img.freepik.com/free-photo/study-knowledge-academics-institute-graphic_53876-124507.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_hybrid",
        },
    ]
    const workingHours = [
        {
            id: 1,
            day: "Mon-Fri",
            timing: "9:30 - 6:30",
            date: "13/02/2025",
        },
        {
            id: 2,
            day: "Saturday",
            timing: "9:30 - 2:30",
            date: "13/02/2025",
        },
        {
            id: 3,
            day: "Sunday",
            timing: "Closed",
            date: "13/02/2025",
        },
    ]
    return (
        <div className={style.blogMain}>
            <BredCrumb title={title} />
            <div className="container pb-5 mt-5">
                <div className={style.blogPostsMain}>
                    <div className={style.blogPosts}>
                        {blogPosts.map((post) => (
                            <div className={style.blogPost} key={post.id}>
                                <img src={post.image} alt={post.title} className={style.blogImage} />
                                <h1 className={style.blogTitle}>{post.title}</h1>
                                <div className={style.blogInfo}>
                                    <p className={style.author}>{post.author}</p>
                                    <p className={style.date}>{post.date}</p>
                                </div>
                                <div className={style.blogContent}>
                                    <p>{post.content}</p>
                                </div>

                            </div>
                        ))}
                    </div>
                    <div className={style.blogPostsDeatils}>
                        <div className={style.calendarContainer}>
                            <h4>Select a Date</h4>
                            <Calendar
                                onChange={handleDateChange}
                                value={date}
                                className={style.customCalendar}
                            />
                        </div>
                        <div className={style.selectedDate}>
                            <h3>Selected Date: {date.toDateString()}</h3>
                        </div>
                        <div className={style.nextCourseMain}>
                            <h3>Next Courses</h3>
                            {
                                nextCourse.map((item) => (
                                    <div className={style.nextCourse} key={item.id}>
                                        <div className={style.nextCourseImg}>
                                            <Image src={item.image} width={100} height={100} alt='not found' />
                                        </div>


                                        <div className={style.nextCourseMainTitle}>
                                            <h5>{item.title}</h5>
                                            <h6>{`${item.author} ${"on"} ${item.date}`}</h6>
                                            <button>{item.type}</button>

                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={style.nextCourseMain}>
                            <h3>Best Rated Courses</h3>
                            {
                                bestRatedCourse.map((item) => (
                                    <div className={style.nextCourse} key={item.id}>
                                        <div className={style.nextCourseImg}>
                                            <Image src={item.image} width={100} height={100} alt='not found' />
                                        </div>


                                        <div className={style.nextCourseMainTitle}>
                                            <h5>{item.title}</h5>
                                            <h6>{`${item.author} ${"on"} ${item.date}`}</h6>
                                            <div className={style.stars}>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-regular fa-star"></i>
                                            </div>


                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={style.workingHoursMain}>
                            <h3>Working Hours</h3>
                            {
                                workingHours.map((item) => (
                                    <div className={style.days} key={item.id}>
                                        <h5>{item.day}</h5>
                                        <h5>{item.timing}</h5>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
