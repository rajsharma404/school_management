"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./page.module.css";

const AttendancePage = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [attendance, setAttendance] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // Default to today

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("http://localhost:3000/api");
                if (!response.ok) {
                    throw new Error("Failed to fetch students");
                }
                const data = await response.json();
                setStudents(data.result || []);

                // Set default attendance to "Present"
                const defaultAttendance = {};
                data.result?.forEach((student) => {
                    defaultAttendance[student._id] = { status: "Present" };
                });
                setAttendance(defaultAttendance);
            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleStatusChange = (id, newStatus) => {
        setAttendance((prev) => ({
            ...prev,
            [id]: { status: newStatus },
        }));
    };

    const addAttendance = async (event) => {
        event.preventDefault();

        try {
            const attendanceData = students.map((student) => ({
                studentId: student._id,
                name: student.name,
                class: student.class,
                rollNumber: student.rollNumber,
                status: attendance[student._id]?.status || "Present",
                date: selectedDate, // Include selected date
            }));

            const response = await fetch("http://localhost:3000/api/attendance_marking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ attendance: attendanceData }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Attendance Marked Successfully!", { position: "top-right" });
            } else {
                toast.error("Failed to mark attendance.", { position: "top-right" });
            }
        } catch (error) {
            toast.error("Error submitting attendance.", { position: "top-right" });
            console.error("Error submitting attendance:", error);
        }
    };

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={style.attendanceMains}>
            <div className="container">
                <ToastContainer />
                <div className={style.bredcrums}>
                    <h4>Attendance Marking</h4>
                    <div className={style.bredcrum}>
                        <p onClick={() => router.push("/dashboard")}>Dashboard / </p>
                        <p>Attendance Marking</p>
                    </div>
                </div>
                <div className={style.attendanceContainer}>
                    <h1 className={style.title}>Mark Attendance </h1>


                    <div className={style.dateContainer}>
                        <div className={style.searchContainer}>
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={style.searchInput}
                            />
                        </div>
                        <div className={style.date}>
                            <label>Select Date:</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className={style.dateInput}
                            />
                        </div>
                    </div>
                    <div className={style.tableWrapper}>
                        <table className={style.attendanceTable}>
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Name</th>
                                    <th>Roll Number</th>
                                    <th>Class</th>
                                    <th>Father's Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((student, index) => (
                                        <tr key={student._id || index}>
                                            <td>{index + 1}</td>
                                            <td>{student.name}</td>
                                            <td>{student.rollNumber}</td>
                                            <td>{student.class}</td>
                                            <td>{student.fName}</td>
                                            <td>
                                                <select
                                                    value={attendance[student._id]?.status || "Present"}
                                                    onChange={(e) =>
                                                        handleStatusChange(student._id, e.target.value)
                                                    }
                                                >
                                                    <option value="Present">Present</option>
                                                    <option value="Absent">Absent</option>
                                                    <option value="Late">Lave</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: "center" }}>
                                            No students found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className={style.buttonContainer}>
                        <button onClick={addAttendance} className={style.submitButton}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendancePage;
