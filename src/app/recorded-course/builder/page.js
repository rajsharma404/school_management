"use client";
import React, { useState } from "react";
import style from "./builder.module.css";
import BredCrumb from "@/app/Components/breadcrumb/BreadCrumb";
import { FaFilePdf, FaDownload } from "react-icons/fa";

const videos = [
    {
        id: 1,
        src: "https://www.youtube.com/embed/e8vDR9JeKBw",
        title: "Html full course",
        description: "Great detailed explanations. The advanced features were well explained. Explore the advanced recording functionalities in this video.",
        duration: "2 hours",
        level: "Beginner",
        instructor: "John Doe",
        rating: 4.5,
        pdf: "sample1.pdf"
    },
    {
        id: 2,
        src: "https://www.youtube.com/embed/e8vDR9JeKBw",
        title: "Css full Tutorial",
        description: "Great detailed explanations. The advanced features were well explained. Explore the advanced recording functionalities in this video.",
        duration: "6 hours 20 min",
        level: "Intermediate",
        instructor: "Jane Smith",
        rating: 4.8,
        pdf: "sample2.pdf"
    },
    {
        id: 3,
        src: "https://www.youtube.com/embed/e8vDR9JeKBw",
        title: "Javascript Tutorial",
        description: "Great detailed explanations. The advanced features were well explained. Explore the advanced recording functionalities in this video.",
        duration: "13 hours 20 min",
        level: "Intermediate",
        instructor: "Jane Smith",
        rating: 4.8,
        pdf: "sample3.pdf"
    },
    {
        id: 4,
        src: "https://www.youtube.com/embed/e8vDR9JeKBw",
        title: "Php Tutorial",
        description: "Great detailed explanations. The advanced features were well explained. Explore the advanced recording functionalities in this video.",
        duration: "13 hours 20 min",
        level: "Intermediate",
        instructor: "Jane Smith",
        rating: 4.8,
        pdf: "sample3.pdf"
    },
];

const Page = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    const openModal = (video) => {
        if (video) {
            setSelectedVideo(video);
        }
    };

    const closeModal = () => {
        setSelectedVideo(null);
    };

    const handleModalClick = (e) => {
        e.stopPropagation(); // Prevent event propagation when clicking inside modal content
    };

    return (
        <div className={style.builderMains}>
            <BredCrumb title="Recorded Course" />
            <div className="container">
                <div className={style.recordingMain}>
                    <h1>Recorded Course</h1>
                    <p>Explore our collection of recording tutorials and insights.</p>
                    <div className={style.videoContainer}>
                        {videos.map((video) => (
                            <div
                                key={video.id}
                                className={style.videoCard}
                                onClick={() => openModal(video)}
                            >
                                <div className={style.videoPlayer}>
                                    <div className={style.videoOverlay}></div>
                                    <iframe
                                        width="100%"
                                        height="200"
                                        src={video.src}
                                        title={video.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className={style.videoElement}
                                    />
                                </div>
                                <div className={style.videoHeader}>
                                    <div className={style.videoMeta}>
                                        <span>{video.duration}</span> | <span>{video.level}</span> | <span>{video.instructor}</span>
                                    </div>
                                    <div className={style.star}>
                                        {[...Array(5)].map((_, index) => (
                                            <i
                                                key={index}
                                                className={index < Math.round(video.rating) ? "fa-solid fa-star" : "fa-regular fa-star"}
                                            ></i>
                                        ))}
                                        <p>{video.rating} / 5</p>
                                    </div>
                                </div>
                                <div className={style.videoTitlePdf}>
                                    <h2 className={style.videoTitle}>{video.title}</h2>
                                    <div className={style.downloadSection}>
                                        <a
                                            href={`/pdfs/${video.pdf}`}
                                            download
                                            className={style.downloadLink}
                                        >
                                            <FaFilePdf className={style.pdfIcon} /> {video.title} Notes
                                            <FaDownload className={style.downloadIcon} />
                                        </a>
                                    </div>
                                </div>
                                <div className={style.videoDescription}>
                                    <p>{video.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedVideo && (
                <div className={style.modalOverlay} onClick={closeModal}>
                    <div
                        className={style.modalContent}
                        onClick={handleModalClick}
                    >
                        <span className={style.closeButton} onClick={closeModal}>
                            &times;
                        </span>
                        <h2>{selectedVideo.title}</h2>
                        <iframe
                            width="100%"
                            height="500"
                            src={`${selectedVideo.src}?autoplay=1`}
                            title={selectedVideo.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className={style.videoElement}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
