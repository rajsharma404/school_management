"use client";
import React, { useState, useEffect } from "react";
import style from "./teacher_fee_details.module.css";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
    const router = useRouter();
    const [students, setStudents] = useState([]);
    const [feePayments, setFeePayments] = useState({});
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const studentsPerPage = 7;

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/teacher_registration");
                if (!response.ok) {
                    throw new Error("Failed to fetch students");
                }
                const data = await response.json();
                setStudents(data.result || []);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        const fetchFeePayments = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/teacher_fee_payment");
                if (!response.ok) {
                    throw new Error(`Failed to fetch fee payments: ${response.status}`);
                }

                const data = await response.json();
                console.log("Raw Fee Payment Response:", data);

                if (!Array.isArray(data.data)) {
                    console.warn("Expected an array under `data.data`, but got:", data);
                    return;
                }

                // Transform fee payments into an object keyed by student ID
                const paymentsMap = data.data.reduce((acc, payment) => {
                    const studentID = payment.studentID || payment._id;
                    acc[studentID] = (acc[studentID] || 0) + (payment.amount || 0);
                    return acc;
                }, {});

                setFeePayments(paymentsMap);
            } catch (error) {
                console.error("Error fetching fee payments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
        fetchFeePayments();
    }, []);

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    return (
        <div className={style.allStudentMains}>
            <ToastContainer />
            <div className="container">
                <div className={style.bredcrums}>
                    <h4>Fee Details</h4>
                    <div className={style.bredcrum}>
                        <p onClick={() => router.push("/dashboard")}>Dashboard / </p>
                        <p>Fee Details</p>
                    </div>
                </div>

                <div className={style.allStudentMain}>
                    <h1>Fee Details</h1>
                    <div className={style.searchContainer}>
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={style.searchBar}
                        />
                    </div>
                    {loading ? (
                        <p>Loading students...</p>
                    ) : (
                        <>
                            <div className={style.tableContainer}>
                                <table className={style.studentTable}>
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Name</th>
                                            <th>Roll Number</th>
                                            <th>Class</th>
                                            <th>Father</th>
                                            <th>Total Fee</th>
                                            <th>Due Amount</th>
                                            <th>Advance Amount</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="9" style={{ textAlign: "center" }}>Loading students...</td>
                                            </tr>
                                        ) : currentStudents.length === 0 ? (
                                            <tr>
                                                <td colSpan="9" style={{ textAlign: "center" }}>No Data Found</td>
                                            </tr>
                                        ) : (
                                            currentStudents.map((student, index) => {
                                                const paidAmount = feePayments[student._id] || 0;
                                                const totalFee = Number(student.fee) || 0;
                                                const dueAmount = totalFee - paidAmount;
                                                const advanceAmount = dueAmount < 0 ? Math.abs(dueAmount) : 0;

                                                return (
                                                    <tr key={student.id || student._id || index}>
                                                        <td>{indexOfFirstStudent + index + 1}</td>
                                                        <td>{student.name}</td>
                                                        <td>{student.rollNumber}</td>
                                                        <td>{student.class}</td>
                                                        <td>{student.fName}</td>
                                                        <td className={style.totalAmount}>₹{totalFee}</td>
                                                        <td className={style.dueAmount}>₹{dueAmount > 0 ? dueAmount : 0}</td>
                                                        <td className={style.advanceAmount}>₹{advanceAmount}</td>
                                                        <td className={style.actionBtn}>
                                                            <button onClick={() => router.push("/dashboard/student/" + student._id)} className="btn btn-primary">
                                                                <i className="fa-solid fa-eye"></i>
                                                            </button>
                                                            <button onClick={() => router.push(`/dashboard/fee/pay/${student._id}`)} className="btn btn-success">
                                                                <i className="fa-solid fa-money-bill-wave"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>

                                </table>
                            </div>
                            <div className={style.pagination}>
                                <span>
                                    Page {currentPage} of {totalPages}
                                </span>
                                <div className={style.paginationBtn}>
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage((prev) => prev - 1)}
                                    >
                                        Prev
                                    </button>
                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage((prev) => prev + 1)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;
