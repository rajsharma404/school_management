"use client";
import React, { useState, useEffect } from "react";
import style from "./performance.module.css";
import { useRouter } from "next/navigation";
import { AiOutlineCloudDownload } from "react-icons/ai";

const StudentPerformance = () => {
    const router = useRouter();
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const recordsPerPage = 7;

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                // Fetch student data
                const studentResponse = await fetch("http://localhost:3000/api");
                if (!studentResponse.ok) throw new Error("Failed to fetch students");
                const studentData = await studentResponse.json();
                const studentsArray = Array.isArray(studentData.result) ? studentData.result : [];

                // Fetch attendance data
                const attendanceResponse = await fetch("http://localhost:3000/api/attendance_marking");
                if (!attendanceResponse.ok) throw new Error("Failed to fetch attendance");
                const attendanceData = await attendanceResponse.json();
                const attendanceArray = Array.isArray(attendanceData.result) ? attendanceData.result : [];

                // Group attendance by studentId
                const attendanceMap = {};
                const uniqueDates = new Set();

                attendanceArray.forEach((record) => {
                    if (record.status === "Present") {
                        if (!attendanceMap[record.studentId]) {
                            attendanceMap[record.studentId] = 0;
                        }
                        attendanceMap[record.studentId] += 1;
                        uniqueDates.add(record.date);
                    }
                });

                const totalDays = uniqueDates.size; // Total unique attendance days

                // Process student performance data
                const performanceData = studentsArray.map((student, index) => {
                    const presentDays = attendanceMap[student._id] || 0;
                    const attendancePercentage = totalDays > 0 ? `${((presentDays / totalDays) * 100).toFixed(2)}%` : "0%";

                    console.log(`Student: ${student.name}, Attendance: ${attendancePercentage}`);

                    return {
                        id: index + 1,
                        rollNumber: student.rollNumber,
                        name: student.name,
                        attendance: attendancePercentage,
                        test1: 0,
                        test2: 0,
                        finalExam: 0,
                        totalMarks: 0,
                        grade: "N/A",
                        certificate: "#",
                    };
                });

                console.log("Updated Student Data with Attendance:", performanceData);
                setStudents(performanceData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchStudents();
    }, []);

    const filteredStudents = students.filter(student => {
        const nameMatch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
        const rollNumberMatch = student.rollNumber && student.rollNumber.toString().toLowerCase().includes(searchTerm.toLowerCase());
        return nameMatch || rollNumberMatch;
    });



    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredStudents.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredStudents.length / recordsPerPage);

    return (
        <div className={style.performanceMainA}>
            <div className="container">
                <div className={style.bredcrums}>
                    <h4>Student Performance</h4>
                    <div className={style.bredcrum}>
                        <p onClick={() => router.push("/dashboard")}>Dashboard / </p>
                        <p>Student Performance</p>
                    </div>
                </div>

                <div className={style.performanceMains}>
                    <input
                        type="text"
                        placeholder="Search by roll number..."
                        className={style.searchBar}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <table className={style.performanceTable}>
                        <thead>
                            <tr>
                                <th>SN.</th>
                                <th>Roll Number</th>
                                <th>Name</th>
                                <th>Attendance</th>
                                <th>Test 1</th>
                                <th>Test 2</th>
                                <th>Final Exam</th>
                                <th>Total Marks</th>
                                <th>Grade</th>
                                <th>Certificate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.rollNumber}</td>
                                    <td>{student.name}</td>
                                    <td>{student.attendance}</td>
                                    <td>{student.test1}</td>
                                    <td>{student.test2}</td>
                                    <td>{student.finalExam}</td>
                                    <td>{student.totalMarks}</td>
                                    <td>{student.grade}</td>
                                    <td>
                                        <a href={student.certificate} download className={style.downloadLink}>
                                            <AiOutlineCloudDownload className={style.downloadIcon} />
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className={style.pagination}>
                        <span className={style.pageInfo}>{currentPage} of {totalPages}</span>
                        <div className={style.paginationButtons}>
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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

export default StudentPerformance;
