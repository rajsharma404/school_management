"use client"
import React, { useState } from 'react';
import style from "./assignment.module.css";
import BredCrumb from '@/app/Components/breadcrumb/BreadCrumb';

const AssignmentPage = ({ title = "Quiz/React Js", description, questions = [], dueDate = "2025-02-20", instructions = "Complete all questions before submission.", correctAnswers = [] }) => {
    const dummyQuestions = [
        { text: "What is React?", options: ["Library", "Framework", "Language", "Language"] },
        { text: "What is JSX?", options: ["Syntax Extension", "Library", "Component", "Language"] },
        { text: "Which company maintains React?", options: ["Google", "Facebook", "Microsoft", "Language"] },
        { text: "Which company maintains React?", options: ["Google", "Facebook", "Microsoft", "Language"] },
        { text: "Which company maintains React?", options: ["Google", "Facebook", "Microsoft", "Language"] },
        { text: "Which company maintains React?", options: ["Google", "Facebook", "Microsoft", "Language"] },
        { text: "Which company maintains React?", options: ["Google", "Facebook", "Microsoft", "Language"] }
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [file, setFile] = useState(null);
    const [showScoreCard, setShowScoreCard] = useState(false);  // State for showing score card

    const questionList = questions.length > 0 ? questions : dummyQuestions;
    const currentQuestion = questionList[currentQuestionIndex];

    // Handle answer change
    const handleAnswerChange = (e) => {
        const answer = e.target.value;
        setSelectedAnswers((prevAnswers) => {
            const updatedAnswers = { ...prevAnswers, [currentQuestionIndex]: answer };
            return updatedAnswers;
        });
    };

    // Handle next/prev navigation
    const handleNext = () => {
        if (currentQuestionIndex < questionList.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // Handle file change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Toggle the score card visibility
    const toggleScoreCard = () => {
        setShowScoreCard(!showScoreCard);
    };

    // Calculate the correct answers dynamically based on selectedAnswers
    const calculateCorrectAnswers = () => {
        let correctCount = 0;
        questionList.forEach((question, index) => {
            if (selectedAnswers[index] === correctAnswers[index]) {
                correctCount++;
            }
        });
        return correctCount;
    };

    // Calculate the estimate (percentage of correct answers)
    const correctCount = calculateCorrectAnswers();
    const totalQuestions = questionList.length;
    const estimate = (correctCount / totalQuestions) * 100;

    return (
        <div className={style.assignmentMains}>
            <BredCrumb title={title} />
            <div className="container">
                <div className={style.assignmentPageContainer}>
                    {/* Left: Quiz Section */}
                    <div className={style.quizSection}>
                        <div className={style.quizTitle}>
                            <h1>{title}</h1>
                            <div className={style.progressText}>
                                {Object.keys(selectedAnswers).length}/{totalQuestions}
                            </div>
                        </div>

                        {description && <p className={style.description}>{description}</p>}

                        <div className={style.quizContainer}>
                            <div className={style.questionBox}>
                                <h3>{currentQuestionIndex + 1}. {currentQuestion.text}</h3>
                                <ul>
                                    {currentQuestion.options.map((option, i) => (
                                        <li key={i}>
                                            <input
                                                type="radio"
                                                name="question"
                                                id={`option-${i}`}
                                                value={option}
                                                checked={selectedAnswers[currentQuestionIndex] === option}
                                                onChange={handleAnswerChange}
                                            />
                                            <label htmlFor={`option-${i}`}>{option}</label>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={style.scoreCardBtn}>
                                <div className={style.buttonContainer}>
                                    <button onClick={handlePrev} disabled={currentQuestionIndex === 0} className={style.navButton}>Prev</button>
                                    <button onClick={handleNext} disabled={currentQuestionIndex >= questionList.length - 1} className={style.navButton}>Next</button>
                                </div>
                                <div className={style.questionNumbersSection}>
                                    <button onClick={toggleScoreCard} className={style.viewButton}>
                                        {showScoreCard ? "Hide Score Card" : "Show Score Card"}
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>

                    {/* Right: Assignment Details Section */}
                    <div className={style.assignmentDetails}>
                        <h2>Assignment Details</h2>
                        <p><strong>Due Date:</strong> {dueDate}</p>
                        <p><strong>Instructions:</strong> {instructions}</p>

                        <div className={style.fileUpload}>
                            <label htmlFor="fileUpload">Upload Your Assignment</label>
                            <input
                                type="file"
                                id="fileUpload"
                                onChange={handleFileChange}
                                className={style.fileInput}
                            />
                        </div>

                        <div className={style.textAreaWrapper}>
                            <label htmlFor="answerText">Write Your Answer</label>
                            <textarea
                                id="answerText"
                                placeholder="Type your answer here..."
                                className={style.textArea}
                            ></textarea>
                        </div>

                        <button className={style.submitButton}>Submit Assignment</button>
                    </div>
                </div>
            </div>

            {/* Score Card Modal */}
            {showScoreCard && (
                <div className={style.modalOverlay}>
                    <div className={style.modalContent}>
                        <button onClick={toggleScoreCard} className={style.closeModalButton}>Close</button>

                        <div className={style.scoreCard}>
                            <p><strong>Total Correct Answers:</strong> {correctCount} / {totalQuestions}</p>
                            <p><strong>Estimate:</strong> {estimate.toFixed(2)}%</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignmentPage;
