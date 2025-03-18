"use client";
import React, { useState, useRef } from "react";
import style from "./registration.module.css";
import { useRouter } from "next/navigation";
import BredCrumb from "@/app/Components/breadcrumb/BreadCrumb";
import Header from "@/app/Components/header/Header";
import Footer from "@/app/Components/footer/Footer";


const AdmissionPage = () => {
    const photoRef = useRef(null);
    const signatureRef = useRef(null);
    const adharCardRef = useRef(null);
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        fName: "",
        mName: "",
        phone: "",
        email: "",
        gender: "",
        dob: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        adhar: "",
        highestQualification: "",
        previousSchool: "",
        class: "",
        message: "",
        photo: "",
        signature: "",
        adharCard: ""
    });

    // Handles text inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handles file uploads by converting to Base64
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const name = e.target.name;

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFormData((prev) => ({ ...prev, [name]: reader.result }));
            };
        }
    };

    // Submits form data as JSON
    const addUser = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                alert("Registration Successful!");

                // Reset form fields
                setFormData({
                    name: "",
                    fName: "",
                    mName: "",
                    phone: "",
                    email: "",
                    gender: "",
                    dob: "",
                    address: "",
                    city: "",
                    state: "",
                    pinCode: "",
                    adhar: "",
                    highestQualification: "",
                    previousSchool: "",
                    class: "",
                    message: "",
                    photo: "",
                    signature: "",
                    adharCard: "",

                });

                // Reset file input fields
                if (photoRef.current) photoRef.current.value = "";
                if (signatureRef.current) signatureRef.current.value = "";
                if (adharCardRef.current) adharCardRef.current.value = "";
            }
            console.log(data);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };



    return (
        <div className={style.main}>
            <Header />
            <div className={style.admissionMains}>
                <BredCrumb title="Student Registration" />
                <div className="container">

                    <div className={style.admissionMain}>
                        <h1>Student Registration</h1>
                        <form >
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
                                    <label>Mother Name <span>*</span></label>
                                    <input type="text" name="mName" value={formData.mName} onChange={handleChange} required />
                                </div>
                                <div className={style.formGroup}>
                                    <label>Phone <span>*</span></label>
                                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className={style.formRow}>
                                <div className={style.formGroup}>
                                    <label>Email <span>*</span></label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className={style.formGroup}>
                                    <label>Gender <span>*</span></label>
                                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className={style.formRow}>
                                <div className={style.formGroup}>
                                    <label>Date of Birth <span>*</span></label>
                                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                                </div>
                                <div className={style.formGroup}>
                                    <label>Address <span>*</span></label>
                                    <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className={style.formRow}>
                                <div className={style.formGroup}>
                                    <label>City <span>*</span></label>
                                    <select name="city" value={formData.city} onChange={handleChange} required>
                                        <option value="">Select</option>
                                        <option value="motihari">Motihari</option>
                                        <option value="patna">Patna</option>
                                        <option value="lucknow">Lucknow</option>
                                    </select>
                                </div>
                                <div className={style.formGroup}>
                                    <label>State <span>*</span></label>
                                    <select name="state" value={formData.state} onChange={handleChange} required>
                                        <option value="">Select</option>
                                        <option value="bihar">bihar</option>
                                        <option value="up">up</option>
                                        <option value="punjab">punjab</option>
                                    </select>
                                </div>
                            </div>

                            <div className={style.formRow}>
                                <div className={style.formGroup}>
                                    <label>Pin Code <span>*</span></label>
                                    <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} required />
                                </div>
                                <div className={style.formGroup}>
                                    <label>Aadhar Number </label>
                                    <input type="text" name="adhar" value={formData.adhar} onChange={handleChange} />
                                </div>
                            </div>

                    

                            <div className={style.formRow}>
                                <div className={style.formGroup}>
                                    <label>Class <span>*</span></label>
                                    <select name="class" value={formData.class} onChange={handleChange} required>
                                        <option value="">Select</option>
                                        <option value="nursery">Nursery</option>
                                        <option value="kindergarten">Kindergarten</option>
                                        <option value="class1">Class1</option>
                                        <option value="class2">Class2</option>
                                        <option value="class3">Class3</option>
                                        <option value="class4">Class4</option>
                                        <option value="class5">Class4</option>
                                    </select>
                                </div>
                                <div className={style.formGroup}>
                                    <label>Upload Photo<span>*</span></label>
                                    <input type="file" ref={photoRef} name="photo" onChange={handleFileChange} required />
                                </div>
                            </div>

                            <div className={style.formRow}>
                                <div className={style.formGroup}>
                                    <label>Upload Signature</label>
                                    <input type="file" ref={signatureRef} name="signature" onChange={handleFileChange} />
                                </div>
                                <div className={style.formGroup}>
                                    <label>Upload Aadhar Card</label>
                                    <input type="file" ref={adharCardRef} name="adharphoto" onChange={handleFileChange} />
                                </div>
                            </div>

                            <div className={style.formRow}>
                                <div className={style.formGroup}>
                                    <label>Message (optional)</label>
                                    <textarea rows={4} name="message" value={formData.message} onChange={handleChange}  ></textarea>
                                </div>
                            </div>

                            <button onClick={addUser} className={style.fullWidthButton} type="submit">Apply</button>
                        </form>
                    </div>
                </div>

            </div >
            <Footer />
        </div>
    );
};

export default AdmissionPage;
