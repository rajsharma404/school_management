"use client";
import React, { useState, useEffect } from "react";
import style from "./fee_details.module.css";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
    const router = useRouter();
    const [students, setStudents] = useState([]);
    const [universalFee, setUniversalFee] = useState([]);
    const [feePayments, setFeePayments] = useState({});
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selectedClass, setSelectedClass] = useState("All");
    const [selectedFeeStatus, setSelectedFeeStatus] = useState("All");
    const studentsPerPage = 7;

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("http://localhost:3000/api");
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
                const response = await fetch("http://localhost:3000/api/fee_payment");
                if (!response.ok) {
                    throw new Error(`Failed to fetch fee payments: ${response.status}`);
                }
                const data = await response.json();
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

        const fetchFeeAmount = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/set_universal_fee");
                if (!response.ok) {
                    throw new Error("Failed to fetch fee amount");
                }
                const data = await response.json();

                // Check if the response is an array
                if (Array.isArray(data)) {
                    setUniversalFee(data)
                    console.log("Fee Data:", data);
                    data.forEach(item => {
                        console.log(`Class: ${item.className}, Fee Amount: ${item.feeAmount}`);
                    });
                } else {
                    console.log("Unexpected data format:", data);
                }
            } catch (error) {
                console.error("Error fetching fee amount:", error);
            }
        };


        fetchStudents();
        fetchFeePayments();
        fetchFeeAmount();
    }, []);
    const handleDelete = async (id) => {
        if (!id) return;

        try {
            const response = await fetch(`http://localhost:3000/api/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete student");
            }

            setStudents((prevStudents) =>
                prevStudents.filter((student) => student._id !== id)
            );

            toast.success("Student deleted successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error("Error deleting student:", error);

            toast.error("Failed to delete student. Try again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    const classTabs = ["All", "Nursery", "Kindergarten", "Class1", "Class2", "Class3", "Class4", "Class5"];
    const feeStatusTabs = ["All", "Unpaid", "Advance"];



    const filteredStudents = students.filter((student) => {
        const paidAmount = feePayments[student._id] || 0;
        let totalFee = Number(student.fee) || 0;

        // Find className from universalFee and match with student's class
        const matchingFee = universalFee.find(fee =>
            fee.className.trim().toLowerCase() === student.class.trim().toLowerCase()
        );

        // If a match is found, get the feeAmount
        if (matchingFee) {
            totalFee = Number(matchingFee.feeAmount) || 0;
        }

        const dueAmount = totalFee - paidAmount;
        const advanceAmount = dueAmount < 0 ? Math.abs(dueAmount) : 0;

        const classMatch =
            selectedClass === "All" ||
            (student.class && student.class.trim().toLowerCase() === selectedClass.trim().toLowerCase());

        const nameMatch = student.name.toLowerCase().includes(search.toLowerCase());

        const rollNumberMatch = student.rollNumber
            ? student.rollNumber.toString().toLowerCase().includes(search.toLowerCase())
            : false;

        let feeStatusMatch = false;

        if (selectedFeeStatus === "All") {
            feeStatusMatch = true;
        } else if (selectedFeeStatus === "Unpaid") {
            feeStatusMatch = dueAmount > 0;
        } else if (selectedFeeStatus === "Advance") {
            feeStatusMatch = advanceAmount > 0;
        }

        return classMatch && (nameMatch || rollNumberMatch) && feeStatusMatch;
    });

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
                    <div className={style.classTab}>
                        <div className={style.classTabs}>
                            {classTabs.map(cls => (
                                <button
                                    key={cls}
                                    className={selectedClass === cls ? style.activeTab : ""}
                                    onClick={() => setSelectedClass(cls)}
                                >
                                    {cls}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className={style.feeTabs}>
                        {feeStatusTabs.map(status => (
                            <button
                                key={status}
                                className={selectedFeeStatus === status ? style.activeTab : ""}
                                onClick={() => setSelectedFeeStatus(status)}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    <div className={style.searchContainer}>
                        <input
                            type="text"
                            placeholder=" Search by name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={style.searchBar}
                        />
                    </div>
                    {loading ? (
                        <p>Loading students...</p>
                    ) : (
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
                                    {/* 
                                    {currentStudents.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" style={{ textAlign: "center" }}>No Data Found</td>
                                        </tr>
                                    ) : (
                                        currentStudents.map((student, index) => {
                                            const paidAmount = feePayments[student._id] || 0;

                                            // Find the matching fee for the student's class
                                            const matchingFee = universalFee.find(fee =>
                                                fee.className.trim().toLowerCase() === student.class.trim().toLowerCase()
                                            );

                                            // If found, use the universal fee amount; otherwise, use student's fee
                                            const totalFee = matchingFee ? Number(matchingFee.feeAmount) : Number(student.fee) || 0;

                                            const dueAmount = totalFee - paidAmount;
                                            const advanceAmount = dueAmount < 0 ? Math.abs(dueAmount) : 0;

                                            return (
                                                <tr key={student._id || index}>
                                                    <td>{indexOfFirstStudent + index + 1}</td>
                                                    <td>{student.name}</td>
                                                    <td>{student.rollNumber}</td>
                                                    <td>{student.class}</td>
                                                    <td>{student.fName}</td>
                                                    <td className={style.totalAmount}>₹{totalFee}</td>
                                                    <td className={style.dueAmount}>₹{dueAmount > 0 ? dueAmount : 0}</td>

                                                    <td className={style.advanceAmount}>
                                                        ₹{totalFee < advanceAmount ? Math.abs(advanceAmount) : 0}
                                                    </td>


                                                    <td className={style.actionBtn}>
                                                        <button onClick={() => router.push("/dashboard/student/" + student._id)} className="btn btn-primary">
                                                            <i className="fa-solid fa-eye"></i>
                                                        </button>
                                                        <button onClick={() => router.push("/dashboard/student/allstudent/" + student._id)} className="btn btn-warning">
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                        <button className="btn btn-danger" onClick={() => handleDelete(student._id)}>
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                        <button onClick={() => router.push(`/dashboard/fee/pay/${student._id}`)} className="btn btn-success">
                                                            <i className="fa-solid fa-money-bill-wave"></i>
                                                        </button>

                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )} */}

                                    {currentStudents.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" style={{ textAlign: "center" }}>No Data Found</td>
                                        </tr>
                                    ) : (
                                        currentStudents.map((student, index) => {
                                            const paidAmount = feePayments[student._id] || 0;

                                            // Find the matching fee for the student's class
                                            const matchingFee = universalFee.find(fee =>
                                                fee.className.trim().toLowerCase() === student.class.trim().toLowerCase()
                                            );

                                            // If student's fee is 0 or not provided, use universalFee's feeAmount
                                            const totalFee = Number(student.fee) === 0 || !student.fee
                                                ? (matchingFee ? Number(matchingFee.feeAmount) : 0)
                                                : Number(student.fee);

                                            const dueAmount = totalFee - paidAmount;
                                            const advanceAmount = dueAmount < 0 ? Math.abs(dueAmount) : 0;

                                            return (
                                                <tr key={student._id || index}>
                                                    <td>{indexOfFirstStudent + index + 1}</td>
                                                    <td>{student.name}</td>
                                                    <td>{student.rollNumber}</td>
                                                    <td>{student.class}</td>
                                                    <td>{student.fName}</td>
                                                    <td className={style.totalAmount}>₹{totalFee}</td>
                                                    <td className={style.dueAmount}>₹{dueAmount > 0 ? dueAmount : 0}</td>

                                                    <td className={style.advanceAmount}>
                                                        ₹{totalFee < advanceAmount ? Math.abs(advanceAmount) : 0}
                                                    </td>

                                                    <td className={style.actionBtn}>
                                                        <button onClick={() => router.push("/dashboard/student/" + student._id)} className="btn btn-primary">
                                                            <i className="fa-solid fa-eye"></i>
                                                        </button>
                                                        <button onClick={() => router.push("/dashboard/student/allstudent/" + student._id)} className="btn btn-warning">
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                        <button className="btn btn-danger" onClick={() => handleDelete(student._id)}>
                                                            <i className="fa-solid fa-trash"></i>
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

                    )}
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
                </div>
            </div>
        </div>
    );
};

export default Page;
