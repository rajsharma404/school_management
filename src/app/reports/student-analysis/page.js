"use client"
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import style from './studentAnalysis.module.css';
import BredCrumb from '@/app/Components/breadcrumb/BreadCrumb';

ChartJS.register(ArcElement, Tooltip, Legend);

const page = () => {
    // Pie chart data for multiple students, including Attendance and Engagement
    const pieChartData = {
        labels: ['A Grade', 'B Grade', 'C Grade', 'D Grade', 'E Grade', 'Attendance', 'Engagement'],
        datasets: [
            {
                data: [
                    40, 30, 20, 5, 5, // Grade data
                    85, 80 // Attendance and Engagement data (example)
                ],
                backgroundColor: [
                    '#007bff', '#28a745', '#ffc107', '#dc3545', '#6c757d',
                    '#17a2b8', '#f39c12' // New colors
                ],
                borderColor: [
                    '#0056b3', '#218838', '#e0a800', '#c82333', '#5a6268',
                    '#138496', '#e67e22' // Border colors
                ],
                borderWidth: 1,
            },
        ],
    };

    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (context.parsed) {
                            label += `: ${context.parsed}%`;
                        }
                        return label;
                    },
                },
            },
        },
    };

    // Dummy data for students
    const studentsData = [
        { name: "John Doe", studentId: "12345", grade: "B", attendance: "90%", engagement: "85%", performance: "75%" },
        { name: "Jane Smith", studentId: "67890", grade: "A", attendance: "95%", engagement: "92%", performance: "88%" },
        { name: "Robert Brown", studentId: "11223", grade: "C", attendance: "80%", engagement: "75%", performance: "65%" },
        { name: "Emily Davis", studentId: "33445", grade: "B", attendance: "85%", engagement: "80%", performance: "70%" },
        { name: "Michael Johnson", studentId: "55678", grade: "A", attendance: "92%", engagement: "90%", performance: "85%" },
        { name: "Sarah Lee", studentId: "66789", grade: "C", attendance: "78%", engagement: "70%", performance: "60%" },
        { name: "David King", studentId: "78901", grade: "D", attendance: "75%", engagement: "65%", performance: "55%" },
        { name: "Sophia Wilson", studentId: "89012", grade: "A", attendance: "97%", engagement: "95%", performance: "90%" },
        { name: "James Thomas", studentId: "90123", grade: "B", attendance: "88%", engagement: "80%", performance: "72%" },
        { name: "Olivia Martinez", studentId: "10234", grade: "C", attendance: "82%", engagement: "74%", performance: "68%" },
    ];

    const [students, setStudents] = useState(studentsData);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 5;

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handlePrev = () => setCurrentPage(currentPage - 1);
    const handleNext = () => setCurrentPage(currentPage + 1);

    return (
        <div className={style.studentAnalysisMains}>
            <BredCrumb title="Student Analysis" />
            <div className="container">
                <div className={style.studentAnalysisMain}>
                    <h1>Student Performance Dashboard</h1>
                    <p className={style.introText}>Analyze student data from performance, engagement, and attendance metrics. Get detailed insights to improve learning outcomes.</p>

                    <div className="row">
                        {/* Student Details Table */}
                        <div className="col-lg-8 col-md-12">
                            <div className={`${style.card} ${style.detailsCard}`}>
                                <div className={style.cardHeader}>Student Performance Details</div>
                                <div className={style.cardBody}>
                                    <div className="mb-3 d-flex">
                                        <input
                                            type="text"
                                            placeholder="Search by Student Name"
                                            value={searchQuery}
                                            onChange={handleSearch}
                                        />
                                        <button onClick={() => setSearchQuery(searchQuery)}>
                                            Search
                                        </button>
                                    </div>
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Student Name</th>
                                                <th scope="col">Student ID</th>
                                                <th scope="col">Grade</th>
                                                <th scope="col">Attendance</th>
                                                <th scope="col">Engagement</th>
                                                <th scope="col">Performance</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentStudents.map((student, index) => (
                                                <tr key={index}>
                                                    <td>{student.name}</td>
                                                    <td>{student.studentId}</td>
                                                    <td>{student.grade}</td>
                                                    <td>{student.attendance}</td>
                                                    <td>{student.engagement}</td>
                                                    <td>{student.performance}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Pagination */}
                                    <div className="d-flex justify-content-between mt-3">
                                        <div className="d-flex align-items-center">
                                            <span>Page {currentPage} of {Math.ceil(filteredStudents.length / studentsPerPage)}</span>
                                        </div>
                                        <div className={style.prevNextBtn}>
                                            <button
                                                onClick={handlePrev}
                                                disabled={currentPage === 1}
                                            >
                                                Prev
                                            </button>

                                            <button
                                                onClick={handleNext}
                                                disabled={currentPage === Math.ceil(filteredStudents.length / studentsPerPage)}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pie chart displaying overall performance */}
                        <div className="col-lg-4 col-md-12">
                            <div className={`${style.card} ${style.performanceCard}`}>
                                <div className={style.cardHeader}>Overall Performance</div>
                                <div className={style.cardBody}>
                                    <Pie data={pieChartData} options={pieChartOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page;
