"use client";
import React, { useState } from 'react';
import style from "./class-analysis.module.css";
import BredCrumb from '@/app/Components/breadcrumb/BreadCrumb';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registering chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const page = () => {
    // State for class data
    const [classData, setClassData] = useState({
        totalStudents: 30,
        absent: 5,
        newJoiners: 2,
        assignments: {
            total: 10,
            completed: 7,
            pending: 3,
        },
        courseProgress: 75,  // percentage
        feedback: {
            positive: 80,  // percentage
            negative: 20,  // percentage
        }
    });

    // Calculate remaining students (Present students)
    const present = classData.totalStudents - classData.absent;

    // Pie chart data
    const data = {
        labels: [
            'Present',
            'Absent',
            'New Joiners',
            'Assignments Completed',
            'Assignments Pending',
            'Course Progress',
            'Positive Feedback',
            'Negative Feedback'
        ],
        datasets: [
            {
                data: [
                    present,
                    classData.absent,
                    classData.newJoiners,
                    classData.assignments.completed,
                    classData.assignments.pending,
                    classData.courseProgress,
                    classData.feedback.positive,
                    classData.feedback.negative
                ],
                backgroundColor: [
                    '#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#FF9F40', '#9966FF', '#FFCD56', '#FF5733'
                ],
                hoverBackgroundColor: [
                    '#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#FF9F40', '#9966FF', '#FFCD56', '#FF5733'
                ],
            }
        ]
    };

    return (
        <div className={style.classAnalysisMains}>
            <BredCrumb title="Class Analysis" />
            <div className="container">
                <div className={style.classAnalysisMain}>
                    <h1 className={style.pageTitle}>Class Analysis</h1>

                    <div className={style.analysisContent}>
                        <div className={style.tableContainer}>
                            <table className={style.detailsTable}>
                                <thead>
                                    <tr>
                                        <th>Details</th>
                                        <th>Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Total Students</td>
                                        <td>{classData.totalStudents}</td>
                                    </tr>
                                    <tr>
                                        <td>Present</td>
                                        <td>{present}</td>
                                    </tr>
                                    <tr>
                                        <td>Absent</td>
                                        <td>{classData.absent}</td>
                                    </tr>
                                    <tr>
                                        <td>New Joiners</td>
                                        <td>{classData.newJoiners}</td>
                                    </tr>
                                    {/* LMS-related sections */}
                                    <tr>
                                        <td>Assignments Completed</td>
                                        <td>{classData.assignments.completed} / {classData.assignments.total}</td>
                                    </tr>
                                    <tr>
                                        <td>Assignments Pending</td>
                                        <td>{classData.assignments.pending}</td>
                                    </tr>
                                    <tr>
                                        <td>Course Progress</td>
                                        <td>{classData.courseProgress}%</td>
                                    </tr>
                                    <tr>
                                        <td>Positive Feedback</td>
                                        <td>{classData.feedback.positive}%</td>
                                    </tr>
                                    <tr>
                                        <td>Negative Feedback</td>
                                        <td>{classData.feedback.negative}%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className={style.chartContainer}>
                            <h2 className={style.chartTitle}>Attendance and Feedback Distribution</h2>
                            <Pie data={data} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default page;
