"use client"
import React, { useState, useEffect } from 'react';
import style from "./onTheSpotRegistration.module.css";
import BreadCrumb from '@/app/Components/breadcrumb/BreadCrumb';

const OnTheSpotRegistration = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        course: ''
    });

    useEffect(() => {
        let isMounted = true; // To prevent setting state on unmounted component

        if (typeof window !== "undefined") {
            console.log("Component Mounted");

            return () => {
                isMounted = false; // Cleanup function
            };
        }
    }, []);

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone || !formData.course) {
            alert("All fields are required!");
            return;
        }
        console.log("Registration Data:", formData);
        alert("Student Registered Successfully!");
    };

    return (
        <div className={style.onTheSpotRegistrationMains}>
            <BreadCrumb title='On The Spot Registration' />
            <div className="container mt-5">
                <div className={style.registrationBox}>
                    <h1>On The Spot Registration</h1>
                    <form onSubmit={handleSubmit} className={style.registrationForm}>
                        <div className={style.formGroup}>
                            <label>Name:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className={style.formGroup}>
                            <label>Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className={style.formGroup}>
                            <label>Phone:</label>
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div className={style.formGroup}>
                            <label>Course:</label>
                            <input type="text" name="course" value={formData.course} onChange={handleChange} required />
                        </div>
                        <button type="submit" className={style.submitButton}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OnTheSpotRegistration;
