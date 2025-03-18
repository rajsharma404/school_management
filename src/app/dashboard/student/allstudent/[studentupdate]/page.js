"use client";

import React, { useState, useEffect } from "react";
import style from "./studentupdate.module.css";
import { useRouter, useParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdmissionPage = () => {
    const router = useRouter();
    const params = useParams();
    const studentId = params?.studentupdate || "";

    const defaultFormData = {
        name: "", fName: "", mName: "", phone: "", email: "", gender: "", dob: "",
        address: "", city: "", state: "", pinCode: "", adhar: "", highestQualification: "",
        previousSchool: "", class: "", photo: "", rollNumber: "", adharPhoto: "", message: "",
        fee: "" // Added fee field
    };

    const [formData, setFormData] = useState(defaultFormData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (studentId) {
            getStudentDetail();
        } else {
            setLoading(false);
        }
    }, [studentId]);

    const getStudentDetail = async () => {
        try {
            let response = await fetch(`/api/${studentId}`);
            let studentData = await response.json();

            if (studentData.success) {
                setFormData({ ...defaultFormData, ...studentData.result });
            }

            // Fetch universal fee data
            let feeResponse = await fetch("http://localhost:3000/api/set_universal_fee");
            let feeData = await feeResponse.json();
            console.log("Universal Fee Data:", feeData);
            console.log("Available Classes:", feeData.map(fee => fee.className));

            // Find the fee object matching the student class
            let matchingFee = feeData.find(
                fee => fee.className.toLowerCase() === studentData.result.class.toLowerCase()
            );

            if (matchingFee) {
                console.log("Fee Amount:", matchingFee.feeAmount);

                // Check if the fee is 0 from student data and use feeResponse if true
                if (studentData.result.fee == 0) {
                    console.log("Using fee from feeResponse");
                    setFormData(prev => ({
                        ...prev,
                        fee: matchingFee.feeAmount.toString() // Use feeResponse if fee is 0
                    }));
                } else {
                    console.log("Using student fee data");
                    setFormData(prev => ({
                        ...prev,
                        fee: studentData.result.fee.toString() // Use student fee if it's non-zero
                    }));
                }
            } else {
                console.log("No matching class found in fee data.");
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
            let response = await fetch(`/api/${studentId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            let data = await response.json();
            if (data.success) {
                toast.success("Update successful");
                // setTimeout(() => {
                //     router.push("/dashboard/student/allstudent");
                // }, 2000);
            }
        } catch (error) {
            toast.error("Error updating student details");
            console.error("Error updating student details:", error);
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value || "" }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: reader.result,
                }));
            };
            reader.onerror = (error) => {
                console.error("Error uploading file:", error);
            };
        }
    };

    if (loading) return <p>Loading student data...</p>;

    return (
        <div className={style.admissionMains}>
            <ToastContainer position="top-right" autoClose={10000} />
            <div className="container">
                <div className={style.bredcrums}>
                    <h4>Fee Pay</h4>
                    <div className={style.bredcrum}>
                        <p onClick={() => router.push("dashbord")}>Dashboard / </p>
                        <p> Fee pay</p>
                    </div>
                </div>
                <div className={style.admissionMain}>
                    <h1>Update Student Details</h1>
                    <form onSubmit={updateData}>
                        <div className={style.formRow}>
                            <div className={style.formGroup}>
                                <label>Name <span>*</span></label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className={style.formGroup}>
                                <label>Father Name <span>*</span></label>
                                <input type="text" name="fName" value={formData.fName} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className={style.formRow}>
                            <div className={style.formGroup}>
                                <label>Mother Name</label>
                                <input type="text" name="mName" value={formData.mName} onChange={handleChange} />
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
                                <label>Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

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
                                <label>Roll Number</label>
                                <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} />
                            </div>

                        </div>

                        {/* Fee Field */}
                        <div className={style.formRow}>

                            <div className={style.formGroup}>
                                <label>Fee</label>
                                <input type="text" name="fee" value={formData.fee} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Photo Upload Fields */}
                        <div className={style.formRow}>
                            <div className={style.formGroup}>
                                <label>Photo</label>
                                <input type="file" name="photo" accept="image/*" onChange={handleFileChange} />
                            </div>
                            <div className={style.formGroup}>
                                <label>Aadhar Photo</label>
                                <input type="file" name="adharPhoto" accept="image/*" onChange={handleFileChange} />
                            </div>
                        </div>

                        <button className={style.fullWidthButton} type="submit">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdmissionPage;
