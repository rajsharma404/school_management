"use client"
import React, { useState } from 'react';
import style from "./mentorAnalysis.module.css";
import BredCrumb from '@/app/Components/breadcrumb/BreadCrumb';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const MentorAnalysis = () => {
    const allMentors = [
        { name: "John Doe", performance: "Excellent", rating: "9/10" },
        { name: "Jane Smith", performance: "Good", rating: "8/10" },
        { name: "Michael Johnson", performance: "Average", rating: "6/10" },
        { name: "Sarah Williams", performance: "Below Average", rating: "5/10" },
        { name: "David Brown", performance: "Good", rating: "7/10" },
        { name: "David Brown", performance: "Good", rating: "7/10" },
        { name: "David Brown", performance: "Good", rating: "7/10" },
        { name: "David Brown", performance: "Good", rating: "7/10" },
        { name: "David Brown", performance: "Good", rating: "7/10" },
        { name: "David Brown", performance: "Good", rating: "7/10" },
    ];

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const mentorsPerPage = 7;

    // Filtering mentors based on search input
    const filteredMentors = allMentors.filter(mentor =>
        mentor.name.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination logic
    const indexOfLastMentor = currentPage * mentorsPerPage;
    const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;
    const currentMentors = filteredMentors.slice(indexOfFirstMentor, indexOfLastMentor);
    const totalPages = Math.ceil(filteredMentors.length / mentorsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleSearch = () => {
        setCurrentPage(1); // Reset pagination on search
    };

    const data = {
        labels: ['Excellent', 'Good', 'Average', 'Below Average'],
        datasets: [
            {
                data: [30, 40, 20, 10],
                backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0'],
            }
        ]
    };

    return (
        <div className={style.mentorAnalysisMains}>
            <BredCrumb title="Mentor Analysis" />
            <div className="container mt-5">
                <div className={style.analysisContainer}>
                    {/* Left Side - Table */}
                    <div className={style.tableSection}>
                        <h2>Mentor Performance</h2>
                        <div className={style.searchContainer}>
                            <input
                                type="text"
                                placeholder="Search mentors..."
                                className={style.searchBar}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button className={style.searchButton} onClick={handleSearch}>Search</button>
                        </div>
                        <table className={style.analysisTable}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Performance</th>
                                    <th>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentMentors.map((mentor, index) => (
                                    <tr key={index}>
                                        <td>{mentor.name}</td>
                                        <td>{mentor.performance}</td>
                                        <td>{mentor.rating}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={style.pagination}>
                            <span>Page{currentPage} of {totalPages}</span>
                            <div className={style.paginationBtn}>
                                <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>

                                <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Circular Chart */}
                    <div className={style.chartSection}>
                        <h2>Overall Performance</h2>
                        <Pie data={data} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentorAnalysis;
