"use client"
import React, { useState } from 'react';
import style from "./EnrolldeStudent.module.css";
import BredCrumb from '@/app/Components/breadcrumb/BreadCrumb';

const page = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 5;

    const students = [
        { name: 'John Doe', course: 'Mathematics', enrollmentDate: '2024-01-15', status: 'Enrolled' },
        { name: 'Jane Smith', course: 'Science', enrollmentDate: '2024-02-10', status: 'Completed' },
        { name: 'Sam Wilson', course: 'English', enrollmentDate: '2023-12-20', status: 'Pending' },
        { name: 'Alice Johnson', course: 'Physics', enrollmentDate: '2024-01-30', status: 'Enrolled' },
        { name: 'Bob Brown', course: 'Chemistry', enrollmentDate: '2023-11-20', status: 'Completed' },
        { name: 'Charlie Green', course: 'Biology', enrollmentDate: '2024-03-05', status: 'Pending' },
        { name: 'David Black', course: 'History', enrollmentDate: '2024-01-18', status: 'Enrolled' },
        { name: 'Eva White', course: 'Geography', enrollmentDate: '2023-12-25', status: 'Completed' },
    ];

    const filteredStudents = students.filter((student) => {
        return (
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.course.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    const currentStudents = filteredStudents.slice(
        (currentPage - 1) * studentsPerPage,
        currentPage * studentsPerPage
    );

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Completed':
                return style.completed;
            case 'Pending':
                return style.pending;
            case 'Enrolled':
            default:
                return style.enrolled;
        }
    };

    return (
        <div className={style.EnrolledStudentMains}>
            <BredCrumb title="Enrolled Student" />
            <div className="container">
                <div className={style.EnrolledStudentMain}>
                    <h1>Enrolled Students</h1>
                    <div className={style.searchBar}>
                        <input
                            type="text"
                            placeholder="Search by name or course"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button>Search</button>
                    </div>
                    <div className={style.ReportsTable}>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Course</th>
                                    <th>Enrollment Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentStudents.map((student, index) => (
                                    <tr key={index} className={style.tableRow}>
                                        <td>{student.name}</td>
                                        <td>{student.course}</td>
                                        <td>{student.enrollmentDate}</td>
                                        <td >
                                            <p className={getStatusClass(student.status)}>{student.status}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={style.pagination}>
                        <span className={style.pageNumber}>
                            Page {currentPage} of {totalPages}
                        </span>
                        <div className={style.paginationBtn}>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
