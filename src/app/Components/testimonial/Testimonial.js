"use client";
import { useState, useEffect } from "react";
import styles from "./Testimonial.module.css";
import Image from "next/image";
import test1 from "../../../../public/assests/testimonialbg1.png"
import test2 from "../../../../public/assests/testimonialbg2.png"
import test3 from "../../../../public/assests/testimonialbg3.png"
import test4 from "../../../../public/assests/testimonialbg4.png"
import test5 from "../../../../public/assests/testimonialbg5.png"
const Testimonial = () => {
    const testimonials = [
        { id: 1, rating: 4.5, author: "Jane Smith", image: "https://img.freepik.com/free-photo/front-view-handsome-man-with-glasses_23-2148946194.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost", designation: "Marketing Manager", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi molestiae iste nostrum nobis natus quia eveniet nihil accusamus repellat delectus libero, eligendi maxime? Omnis vel dolor obcaecati ullam, eaque delectus?" },
        { id: 2, rating: 4.5, author: "Jane Smith", image: "https://img.freepik.com/free-photo/front-view-handsome-man-with-glasses_23-2148946194.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost", designation: "Marketing Manager", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi molestiae iste nostrum nobis natus quia eveniet nihil accusamus repellat delectus libero, eligendi maxime? Omnis vel dolor obcaecati ullam, eaque delectus?" },
        { id: 3, rating: 4.5, author: "Jane Smith", image: "https://img.freepik.com/free-photo/front-view-handsome-man-with-glasses_23-2148946194.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost", designation: "Marketing Manager", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi molestiae iste nostrum nobis natus quia eveniet nihil accusamus repellat delectus libero, eligendi maxime? Omnis vel dolor obcaecati ullam, eaque delectus?" },
        { id: 4, rating: 4.5, author: "Jane Smith", image: "https://img.freepik.com/free-photo/front-view-handsome-man-with-glasses_23-2148946194.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost", designation: "Marketing Manager", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi molestiae iste nostrum nobis natus quia eveniet nihil accusamus repellat delectus libero, eligendi maxime? Omnis vel dolor obcaecati ullam, eaque delectus?" },
        { id: 5, rating: 4.5, author: "Jane Smith", image: "https://img.freepik.com/free-photo/front-view-handsome-man-with-glasses_23-2148946194.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost", designation: "Marketing Manager", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi molestiae iste nostrum nobis natus quia eveniet nihil accusamus repellat delectus libero, eligendi maxime? Omnis vel dolor obcaecati ullam, eaque delectus?" },
        { id: 6, rating: 4.5, author: "Jane Smith", image: "https://img.freepik.com/free-photo/front-view-handsome-man-with-glasses_23-2148946194.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost", designation: "Marketing Manager", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi molestiae iste nostrum nobis natus quia eveniet nihil accusamus repellat delectus libero, eligendi maxime? Omnis vel dolor obcaecati ullam, eaque delectus?" },
        { id: 7, rating: 4.5, author: "Jane Smith", image: "https://img.freepik.com/free-photo/front-view-handsome-man-with-glasses_23-2148946194.jpg?uid=R156497285&ga=GA1.1.1921166926.1684059532&semt=ais_authors_boost", designation: "Marketing Manager", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi molestiae iste nostrum nobis natus quia eveniet nihil accusamus repellat delectus libero, eligendi maxime? Omnis vel dolor obcaecati ullam, eaque delectus?" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState(2);


    useEffect(() => {
        const updateVisibleCards = () => {
            if (window.innerWidth <= 768) {
                setVisibleCards(1);
            } else {
                setVisibleCards(2);
            }
        };

        updateVisibleCards();
        window.addEventListener("resize", updateVisibleCards);
        return () => window.removeEventListener("resize", updateVisibleCards);
    }, []);


    const handleNext = () => {
        if (currentIndex < testimonials.length - visibleCards) {
            setCurrentIndex(currentIndex + 1);
        }
    };


    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className={styles.carousel}>
            <div className="container mt-2">
                <div className={styles.carouselContainer}>
                    <h1 className="text-center">Our Students</h1>
                    <p className="text-center mb-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, debitis inventore saepe soluta magni veniam optio expedita facere maiores fugiat est consequuntur officia pariatur deleniti ullam explicabo! Non, omnis nihil?</p>
                    <div
                        className={styles.carouselWrapper}
                        style={{ transform: `translateX(-${currentIndex * (102 / visibleCards)}%)` }}
                    >
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className={styles.card}>
                                <div className={styles.cards}>
                                    <div className={styles.cardTestimonialImage}>
                                        <img src={testimonial.image} alt={testimonial.author} className={styles.image} />
                                        <div className={styles.testimonialIcon}>
                                            <i className="fa-solid fa-quote-right"></i>
                                        </div>
                                    </div>
                                    <div className={styles.cardTestimonialText}>
                                        <div className={styles.ratings}>
                                            <p className={styles.stars}>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-regular fa-star"></i>
                                            </p><p className={styles.rating}>{testimonial.rating}</p>
                                        </div>
                                        <p className={styles.author}>{testimonial.author}</p>
                                        <p className={styles.designation}>{testimonial.designation}</p>
                                    </div>

                                </div>
                                <p className={styles.description}>{testimonial.description}</p>
                            </div>
                        ))}
                    </div>


                </div>
                <div className={styles.buttons}>
                    <button onClick={handlePrev} disabled={currentIndex === 0} className={styles.prevBtn}>
                        <i className="fa-solid fa-angle-left"></i>
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentIndex >= testimonials.length - visibleCards}
                        className={styles.nextBtn}
                    >
                        <i className="fa-solid fa-angle-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
