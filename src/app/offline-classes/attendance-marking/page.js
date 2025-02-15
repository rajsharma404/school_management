"use client";
import React, { useState, useEffect } from 'react';
import style from "./attendance-marking.module.css";
import BreadCrumb from '@/app/Components/breadcrumb/BreadCrumb';
import { Table, Form, Button, Modal } from 'react-bootstrap';

const AttendanceMarking = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const [modalMounted, setModalMounted] = useState(false); // 🔹 New State to Control Modal Rendering

    useEffect(() => {
        setModalMounted(true);
    }, []);

    const [attendance, setAttendance] = useState([
        { id: 1, name: "John Doe", date: "2025-02-15", status: "Present" },
        { id: 2, name: "Jane Smith", date: "2025-02-15", status: "Absent" },
        { id: 3, name: "Alice Brown", date: "2025-02-15", status: "Present" },
        { id: 4, name: "Bob Johnson", date: "2025-02-15", status: "Late" },
        { id: 5, name: "Charlie Davis", date: "2025-02-15", status: "Present" },
        { id: 6, name: "Diana Prince", date: "2025-02-15", status: "Absent" }
    ]);

    const handleStatusChange = (id, status) => {
        setAttendance(prevState => prevState.map(student =>
            student.id === id ? { ...student, status } : student
        ));
    };

    const filteredAttendance = attendance.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredAttendance.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAttendance.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleEditClick = (student) => {
        setSelectedStudent(student);
        setNewStatus(student.status);
        setShowModal(true);
    };

    const handleSaveChanges = () => {
        if (selectedStudent) {
            handleStatusChange(selectedStudent.id, newStatus);
        }
        setShowModal(false);
        setTimeout(() => {
            setSelectedStudent(null); // Reset selectedStudent after closing
        }, 0);
    };

    return (
        <div className={style.attendanceMarkingMains}>
            <BreadCrumb title="Attendance Marking" />
            <div className="container mt-4">
                <div className={style.attendanceMarkingMain}>
                    <h2 className="mb-3">Attendance Marking</h2>
                    <div className={style.searchTerm}>
                        <input
                            type="text"
                            placeholder="Search student..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button>Search</button>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Student Name</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((student, index) => (
                                <tr key={student.id}>
                                    <td>{indexOfFirstItem + index + 1}</td>
                                    <td>{student.name}</td>
                                    <td>{student.date}</td>
                                    <td>{student.status}</td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={() => handleEditClick(student)}>Edit</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <span>Page {currentPage} of {totalPages}</span>
                        <div className={style.PaginationBtn}>
                            <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</Button>
                            <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Render Modal Only When Mounted */}
            {modalMounted && (
                <Modal key={selectedStudent?.id || 'default'} show={showModal} onHide={() => setShowModal(false)} enforceFocus={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Attendance Status</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                        >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Late">Late</option>
                        </Form.Select>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                        <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default AttendanceMarking;
