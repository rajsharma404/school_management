"use client"
import { useState } from "react";
import style from "./recording.module.css";
import BredCrumb from "@/app/Components/breadcrumb/BreadCrumb";

const videos = [
    { id: 1, src: "https://www.youtube.com/embed/e8vDR9JeKBw", title: "Video 1", description: "A sample video showcasing basic recording features." },
    { id: 2, src: "https://www.youtube.com/embed/e8vDR9JeKBw", title: "Video 2", description: "Explore the advanced recording functionalities in this video." },
    { id: 3, src: "https://www.youtube.com/embed/e8vDR9JeKBw", title: "Video 3", description: "Learn about video editing and enhancements in recordings." },
    { id: 4, src: "https://www.youtube.com/embed/e8vDR9JeKBw", title: "Video 4", description: "Understand the different recording formats and resolutions." },
    { id: 5, src: "https://www.youtube.com/embed/e8vDR9JeKBw", title: "Video 5", description: "Final overview of all recording features and settings." }
];

const RecordingPage = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    const openModal = (video) => {
        setSelectedVideo(video);
    };

    const closeModal = () => {
        setSelectedVideo(null);
    };

    return (
        <div className={style.recordingMains}>
            <BredCrumb title="Recording" />
            <div className="container">
                <div className={style.recordingMain}>
                    <h1>Recording</h1>
                    <p>Explore our collection of recording tutorials and insights.</p>
                    <div className={style.videoContainer}>
                        {videos.map((video) => (
                            <div key={video.id} className={style.videoCard} onClick={() => openModal(video)}>
                                <h2 className={style.videoTitle}>{video.title}</h2>
                                <p className={style.videoDescription}>{video.description}</p>
                                <div className={style.videoPlayer}>
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <div className={style.modalOverlay} onClick={closeModal}>
                    <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                        <span className={style.closeButton} onClick={closeModal}>&times;</span>
                        <h2>{selectedVideo.title}</h2>
                        <iframe
                            width="100%"
                            height="500"
                            src={selectedVideo.src + "?autoplay=1"}
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

export default RecordingPage;
