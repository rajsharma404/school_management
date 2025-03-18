"use client";

import React, { useState, useEffect } from "react";
import style from "./teacher_update.module.css";
import { useRouter, useParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdmissionPage = () => {
    const router = useRouter();
    const params = useParams();
    const teacherId = params?.teacherupdate || "";

    const defaultFormData = {
        name: "", phone: "", email: "", techedClass: "", specialty: "", fee: ""
    };

    const [formData, setFormData] = useState(defaultFormData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (teacherId) {
            getStudentDetail();
        } else {
            setLoading(false);
        }
    }, [teacherId]);

    const getStudentDetail = async () => {
        try {
            let response = await fetch(`/api/teacher_id/${teacherId}`);
            let studentData = await response.json();
            if (studentData.success) {
                setFormData({ ...defaultFormData, ...studentData.result });
            }
        } catch (error) {
            console.error("Error fetching student details:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateData = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(`/api/teacher_id/${teacherId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            let data = await response.json();
            if (data.success) {
                toast.success("Update successful");
                setTimeout(() => {
                    router.push("/dashboard/teacher/all_teacher");
                }, 2000);
            }
        } catch (error) {
            toast.error("Error updating student details");
            console.error("Error updating student details:", error);
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value || "" }));
    };



    if (loading) return <p>Loading student data...</p>;

    return (
        <div className={style.admissionMains}>
            <ToastContainer position="top-right" autoClose={10000} />
            <div className="container">
                <div className={style.bredcrums}>
                    <h4>Update Teacher Details</h4>
                    <div className={style.bredcrum}>
                        <p onClick={() => router.push("dashbord")}>Dashboard / </p>
                        <p>Update Teacher Details</p>
                    </div>
                </div>
                <div className={style.teacherUpdate}>

                    <div className={style.admissionMain}>
                        <h1>Update Teacher Details</h1>
                        <form onSubmit={updateData}>
                            <div className={style.formRow}>
                                <div className={style.formGroup}>
                                    <label>Name <span>*</span></label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className={style.formGroup}>
                                    <label>Phone <span>*</span></label>
                                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                                </div>

                            </div>

                            <div className={style.formRow}>
                                <div className={style.formGroup}>
                                    <label>Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                                </div>
                                <div className={style.formGroup}>
                                    <label>Specialist</label>
                                    <input type="text" name="specialist" value={formData.specialty} onChange={handleChange} />
                                </div>


                            </div>


                            {/* Fee Field */}
                            <div className={style.formRow}>
                                <div className={style.formGroup}>
                                    <label>Class</label>
                                    <select name="class" value={formData.class} onChange={handleChange}>
                                        <option value="">Select Class</option>
                                        <option value="nursery">Nursery</option>
                                        <option value="kindergarten">Kindergarten</option>
                                        <option value="class1">Class 1</option>
                                        <option value="class2">Class 2</option>
                                        <option value="class3">Class 3</option>
                                        <option value="class4">Class 4</option>
                                        <option value="class5">Class 5</option>
                                    </select>
                                </div>
                                <div className={style.formGroup}>
                                    <label>Fee</label>
                                    <input type="text" name="fee" value={formData.fee} onChange={handleChange} />
                                </div>
                            </div>


                            <button className={style.fullWidthButton} type="submit">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdmissionPage;
