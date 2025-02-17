"use client";
import React, { useState } from "react";
import style from "./assignment.module.css";
import BredCrumb from "@/app/Components/breadcrumb/BreadCrumb";

const subjects = [
    {
        title: "Quiz/React Js",
        questions: [
            { text: "What is React?", options: ["Library", "Framework", "Language", "Tool"] },
            { text: "What is JSX?", options: ["Syntax Extension", "Library", "Component", "Language"] },
        ],
        correctAnswers: ["Library", "Syntax Extension"]
    },
    {
        title: "Quiz/JavaScript",
        questions: [
            { text: "What is JavaScript?", options: ["Programming Language", "Framework", "Library", "Database"] },
            { text: "Which keyword is used to declare variables?", options: ["var", "define", "declare", "int"] },
        ],
        correctAnswers: ["Programming Language", "var"]
    },
];

const AssignmentPage = ({ dueDate = "2025-02-20", instructions = "Complete all questions before submission." }) => {
    const [currentSubject, setCurrentSubject] = useState(subjects[0]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [file, setFile] = useState(null);
    const [showScoreCard, setShowScoreCard] = useState(false);
    const [showSubjectList, setShowSubjectList] = useState(false);

    const questionList = currentSubject.questions;
    const currentQuestion = questionList[currentQuestionIndex];

    // Handle answer selection
    const handleAnswerChange = (e) => {
        setSelectedAnswers((prev) => ({ ...prev, [currentQuestionIndex]: e.target.value }));
    };

    // Handle subject change
    const handleSubjectChange = (subject) => {
        setCurrentSubject(subject);
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setShowSubjectList(false); // Hide subject list after selection
    };

    return (
        <div className={style.assignmentMains}>
            <BredCrumb title={currentSubject.title} />
            <div className="container">
                {/* Subject Selection Button (Placed at the top of the quiz page) */}


                {/* Quiz Section */}
                <div className={style.assignmentPageContainer}>

                    <div className={style.quizSection}>
                        <div className={style.subjectSelector}>
                            <button onClick={() => setShowSubjectList(!showSubjectList)} className={style.subjectButton}>
                                Select Subject
                            </button>
                            {showSubjectList && (
                                <div className={style.subjectList}>
                                    {subjects.map((subject, index) => (
                                        <button key={index} onClick={() => handleSubjectChange(subject)}>
                                            {subject.title}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={style.quizTitle}>
                            <h1>{currentSubject.title}</h1>
                            <div className={style.progressText}>
                                {Object.keys(selectedAnswers).length}/{questionList.length}
                            </div>
                        </div>

                        <div className={style.quizContainer}>
                            <div className={style.questionBox}>
                                <h3>{currentQuestionIndex + 1}. {currentQuestion.text}</h3>
                                <ul className={style.optionGrid}>
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

                            <div className={style.buttonContainer}>
                                <button onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))} className={style.navButton} disabled={currentQuestionIndex === 0}>
                                    Prev
                                </button>
                                <button onClick={() => setCurrentQuestionIndex((prev) => Math.min(prev + 1, questionList.length - 1))} className={style.navButton} disabled={currentQuestionIndex >= questionList.length - 1}>
                                    Next
                                </button>
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
                            <input type="file" id="fileUpload" onChange={(e) => setFile(e.target.files[0])} className={style.fileInput} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignmentPage;
