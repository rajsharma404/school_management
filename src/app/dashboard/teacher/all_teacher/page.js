"use client";
import React, { useState, useEffect } from "react";
import style from "./all_teacher.module.css";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
    const router = useRouter();
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const studentsPerPage = 7;

    // Fetch students inside useEffect
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
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        if (!id) return;

        try {
            const response = await fetch(`http://localhost:3000/api/teacher_id/${id}`, {
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

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(
        indexOfFirstStudent,
        indexOfLastStudent
    );

    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    return (
        <div className={style.allStudentMains}>
            <ToastContainer />
            <div className="container">
                <div className={style.bredcrums}>
                    <h4>All Teachers</h4>
                    <div className={style.bredcrum}>
                        <p onClick={() => router.push("/dashbord")}>Dashboard / </p>
                        <p> All Teachers</p>
                    </div>
                </div>

                <div className={style.allStudentMain}>
                    <h1>All Teachers</h1>
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
                            <div className={style.teacherTable}>
                                <table className={style.studentTable}>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>email</th>
                                            <th>Teached Class</th>
                                            <th>Speciality</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentStudents.map((student, index) => (
                                            <tr key={student.id || student._id || index}>
                                                <td>{student.name}</td>
                                                <td>{student.phone}</td>
                                                <td>{student.email}</td>
                                                <td>{student.techedClass}</td>
                                                <td>{student.specialty}</td>
                                                <td className={style.actionBtn}>
                                                    <button onClick={() => router.push("/dashboard/teacher/" + student._id)} className="btn btn-primary">
                                                        <i className="fa-solid fa-eye"></i>
                                                    </button>
                                                    <button onClick={() => router.push("/dashboard/teacher/all_teacher/" + student._id)} className="btn btn-warning">
                                                        <i className="fa-solid fa-pen-to-square"></i>
                                                    </button>
                                                    <button className="btn btn-danger" onClick={() => handleDelete(student._id)}>
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                    <button onClick={() => router.push(`/dashboard/teacher/fee_pay/${student._id}`)} className="btn btn-success">
                                                        <i className="fa-solid fa-money-bill-wave"></i>
                                                    </button>

                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Page;
