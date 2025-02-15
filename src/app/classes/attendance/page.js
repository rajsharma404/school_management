"use client"
import React, { useState } from 'react';
import style from './attendance.module.css';
import BredCrumb from '@/app/Components/breadcrumb/BreadCrumb';

const Page = () => {
    const [attendanceData, setAttendanceData] = useState([
        { studentName: 'John Doe', date: '2024-02-01', status: 'Present', notes: 'On time' },
        { studentName: 'Jane Smith', date: '2024-02-01', status: 'Absent', notes: 'Sick leave' },
        { studentName: 'Michael Brown', date: '2024-02-02', status: 'Late', notes: 'Traffic delay' },
        { studentName: 'Emily Davis', date: '2024-02-03', status: 'Present', notes: '' },
        { studentName: 'Daniel Wilson', date: '2024-02-03', status: 'Present', notes: '' },
        { studentName: 'Sophia Johnson', date: '2024-02-04', status: 'Absent', notes: 'Family emergency' },
        { studentName: 'Chris Lee', date: '2024-02-05', status: 'Late', notes: 'Overslept' },
        { studentName: 'Olivia Martinez', date: '2024-02-06', status: 'Present', notes: '' },
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [studentName, setStudentName] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const [notes, setNotes] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleAddAttendance = (e) => {
        e.preventDefault();
        const newAttendance = { studentName, date, status, notes };
        setAttendanceData([...attendanceData, newAttendance]);
        setStudentName('');
        setDate('');
        setStatus('');
        setNotes('');
        closeModal();
    };

    const filteredRecords = attendanceData.filter(record =>
        record.studentName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

    return (
        <div className={style.attendanceMains}>
            <BredCrumb title="Attendance" />
            <div className={style.attendanceMain}>
                <div className="container">
                    <div className={style.attendance}>
                        <div className={style.header}>
                            <h1>Attendance</h1>
                            <div className={style.controls}>
                                <div className={style.searchContainer}>
                                    <input
                                        type="text"
                                        placeholder="Search Student..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className={style.searchBar}
                                    />
                                    <button onClick={() => {/* Add search logic if necessary */ }} className={style.searchButton}>
                                        Search
                                    </button>
                                </div>
                                <button onClick={openModal} className={style.addButton}>Add Attendance</button>
                            </div>
                        </div>

                        <div className={style['table-container']}>
                            <table className={style.table}>
                                <thead>
                                    <tr>
                                        <th>Student Name</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentRecords.map((attendance, index) => (
                                        <tr key={index}>
                                            <td>{attendance.studentName}</td>
                                            <td>{attendance.date}</td>
                                            <td>{attendance.status}</td>
                                            <td>{attendance.notes}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className={style.pagination}>
                            <span>Page {currentPage} of {totalPages}</span>
                            <div className={style.paginationBtn}>
                                <button
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={style.paginationButton}
                                >
                                    Prev
                                </button>

                                <button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={style.paginationButton}
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                        {/* Modal */}
                        {isModalOpen && (
                            <div className={style.modal} style={{ display: 'flex' }}>
                                <div className={style['modal-content']}>
                                    <span className={style.close} onClick={closeModal}>&times;</span>
                                    <h2>Add Attendance</h2>
                                    <form onSubmit={handleAddAttendance}>
                                        <div className={style['input-field']}>
                                            <label htmlFor="studentName">Student Name</label>
                                            <input
                                                type="text"
                                                id="studentName"
                                                value={studentName}
                                                onChange={(e) => setStudentName(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className={style['input-field']}>
                                            <label htmlFor="date">Date</label>
                                            <input
                                                type="date"
                                                id="date"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className={style['input-field']}>
                                            <label htmlFor="status">Attendance Status</label>
                                            <select
                                                id="status"
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                                required
                                            >
                                                <option value="">Select status</option>
                                                <option value="Present">Present</option>
                                                <option value="Absent">Absent</option>
                                                <option value="Late">Late</option>
                                            </select>
                                        </div>

                                        <div className={style['input-field']}>
                                            <label htmlFor="notes">Notes</label>
                                            <textarea
                                                id="notes"
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                placeholder="Additional notes (e.g., reason for absence)"
                                            ></textarea>
                                        </div>

                                        <button type="submit" className={style.addButton}>Add Attendance</button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
