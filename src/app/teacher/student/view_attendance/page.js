"use client";
import React, { useState, useEffect } from "react";
import style from "./View_Attendance.module.css";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const [students, setStudents] = useState([]);
    const [attendanceData, setAttendanceData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [hasAttendance, setHasAttendance] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("http://localhost:3000/api");
                const data = await response.json();
                if (data && Array.isArray(data.result)) {
                    setStudents(data.result);
                } else {
                    console.error("Unexpected API response format:", data);
                    setStudents([]);
                }
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };
        fetchStudents();
    }, []);

    useEffect(() => {
        const fetchAttendanceData = async () => {
            setLoading(true);
            setHasAttendance(false);
            setAttendanceData({}); // CLEAR PREVIOUS DATA

            console.log(`Fetching attendance for: Month=${currentMonth + 1}, Year=${currentYear}`);

            try {
                const response = await fetch(`http://localhost:3000/api/attendance_marking?month=${currentMonth + 1}&year=${currentYear}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch attendance data");
                }
                const data = await response.json();

                if (Array.isArray(data.result) && data.result.length > 0) {
                    setHasAttendance(true);
                    const formattedData = {};
                    data.result.forEach((entry) => {
                        const studentId = entry.studentId;
                        const entryDate = new Date(entry.date);
                        const entryMonth = entryDate.getMonth();
                        const entryYear = entryDate.getFullYear();

                        // CHECK IF ATTENDANCE MATCHES THE CURRENT MONTH & YEAR
                        if (entryMonth === currentMonth && entryYear === currentYear) {
                            const day = entryDate.getDate();
                            let status = entry.status === "Present" ? "P" :
                                entry.status === "Absent" ? "A" :
                                    entry.status === "Late" ? "L" : "";

                            if (!formattedData[studentId]) {
                                formattedData[studentId] = {};
                            }
                            formattedData[studentId][day] = status;
                        }
                    });

                    setAttendanceData(formattedData);
                } else {
                    setAttendanceData({}); // No data available
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAttendanceData();
    }, [currentMonth, currentYear]);

    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

    if (!isMounted) return null;
    if (loading) return <p>Loading attendance data...</p>;
    if (error) return <p>Error: {error}</p>;

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber?.toString().includes(searchTerm)
    );


    return (
        <div className={style.ViewAttendanceMains}>
            <div className="container">
                <div className={style.bredcrums}>
                    <h4>View Attendance</h4>
                    <div className={style.bredcrum}>
                        <p onClick={() => router.push("/teacher")}>Teacher Dashboard / </p>
                        <p>View Attendance </p>
                    </div>
                </div>
                <div className={style.ViewAttendanceMain}>
                    <h1>View Attendance - {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}</h1>

                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search by Roll Number or Name"
                        className={style.SearchBar}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />


                    {/* Month Tabs */}
                    <div className={style.MonthTabs}>
                        {[...Array(12)].map((_, i) => (
                            <button
                                key={i}
                                className={currentMonth === i ? style.activeTab : ""}
                                onClick={() => setCurrentMonth(i)}
                            >
                                {new Date(currentYear, i).toLocaleString('default', { month: 'short' }).toUpperCase()}
                            </button>
                        ))}

                        {/* Year Selection Dropdown */}
                        <select className={style.YearSelector} value={currentYear} onChange={(e) => setCurrentYear(parseInt(e.target.value))}>
                            {Array.from({ length: 5 }, (_, i) => currentYear - i).map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Attendance Table */}
                    <div className={style.TableContainer}>
                        {hasAttendance ? (
                            <table className={style.AttendanceTable}>
                               <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Roll No</th>
                                        <th>Name</th>
                                        <th>Class</th>
                                        {[...Array(getDaysInMonth(currentMonth, currentYear))].map((_, i) => (
                                            <th key={i + 1} className={(i + 1) % 7 === 0 ? style.sunday : ""}>{i + 1}</th>
                                        ))}
                                        <th>Total Present</th>
                                        <th>Total Absent</th>
                                        <th>Total Leave</th>
                                        <th>Attendance %</th>
                                    </tr>
                                </thead>

                             
                                <tbody>
                                    {filteredStudents.length > 0 ? (
                                        filteredStudents.map((student, index) => {
                                            let presentCount = 0;
                                            let absentCount = 0;
                                            let lateCount = 0;
                                            // let totalDay = (presentCount + absentCount + lateCount);
                                            // let attendancePercentage = (presentCount * 100) / totalDay

                                            const studentAttendance = [...Array(getDaysInMonth(currentMonth, currentYear))].map((_, i) => {
                                                const day = i + 1;
                                                const status = attendanceData[student._id]?.[day] || "-";

                                                if (status === "P") presentCount++;
                                                else if (status === "A") absentCount++;
                                                else if (status === "L") lateCount++;

                                                return status;
                                            });
                                            let totalDay = presentCount + absentCount + lateCount;
                                            let attendancePercentage = totalDay > 0 ? ((presentCount * 100) / totalDay) : "";
                                            // Log the counts for each student
                                            console.log(`Student: ${student.name}, Roll No: ${student.rollNumber}, Present: ${presentCount}, Absent: ${absentCount}, Late: ${lateCount}`);

                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{student.rollNumber}</td>
                                                    <td>{student.name}</td>
                                                    <td>{student.class}</td>
                                                    {studentAttendance.map((status, i) => (
                                                        <td key={i + 1} className={
                                                            status === "P" ? style.present :
                                                                status === "A" ? style.absent :
                                                                    status === "L" ? style.late : ""
                                                        }>
                                                            {status}
                                                        </td>
                                                    ))}
                                                    <td className={style.present}>{presentCount}</td>
                                                    <td className={style.absent}>{absentCount}</td>
                                                    <td className={style.late}>{lateCount}</td>
                                                    <td className={style.percentage}>{attendancePercentage}%</td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="37">No students found</td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        ) : (
                            <p>No attendance data available for this month.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
