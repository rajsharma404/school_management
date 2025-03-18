"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from "./registration.module.css";

const TeacherRegistration = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        specialty: '',
        techedClass: '',
        date: new Date().toISOString().split('T')[0]
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/teacher_registration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                toast.success(`Teacher registered successfully!`);
                setTimeout(() => router.push("/dashboard"), 2000); // Delay redirection for user to see toast
            } else {
                toast.error(result.result || 'Failed to register teacher.');
            }
        } catch (error) {
            toast.error('An error occurred while registering.');
        }
    };


    return (
        <div className={style.RegistrationMains}>
            <div className="container">
                <div className={style.bredcrums}>
                    <h4>Teacher Registration</h4>
                    <div className={style.bredcrum}>
                        <p onClick={() => router.push("/dashboard")}>Dashboard / </p>
                        <p>Teacher Registration</p>
                    </div>
                </div>
                <div className={style.TeacherRegistration}>
                    <div className={style.RegistrationMain}>
                        <h1>Teacher Registration</h1>
                        <form onSubmit={handleSubmit} className={style.RegistrationForm}>

                            {/* Name and Email in One Row */}
                            <div className={style.Row}>
                                <div className={style.FormGroup}>
                                    <label>Name:</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className={style.FormGroup}>
                                    <label>Email:</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* Phone and Specialty in One Row */}
                            <div className={style.Row}>
                                <div className={style.FormGroup}>
                                    <label>Phone:</label>
                                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                                </div>
                                <div className={style.FormGroup}>
                                    <label>Specialty:</label>
                                    <select name="specialty" value={formData.specialty} onChange={handleChange} required>
                                        <option value="">Select Subject</option>
                                        <option value="hindi">Hindi</option>
                                        <option value="english">English</option>
                                        <option value="math">Math</option>
                                        <option value="physics">Physics</option>
                                        <option value="chemistry">Chemistry</option>
                                        <option value="history">History</option>
                                        <option value="geography">Geography</option>
                                    </select>
                                </div>
                            </div>

                            {/* Date and Teched Class in One Row */}
                            <div className={style.Row}>
                                <div className={style.FormGroup}>
                                    <label>Teched Class:</label>
                                    <select name="techedClass" value={formData.techedClass} onChange={handleChange} required>
                                        <option value="">Select a class</option>
                                        <option value="nursery">Nursery</option>
                                        <option value="kindergarten">Kindergarten</option>
                                        <option value="Class 1">Class 1</option>
                                        <option value="Class 2">Class 2</option>
                                        <option value="Class 3">Class 3</option>
                                        <option value="Class 4">Class 4</option>
                                        <option value="Class 5">Class 5</option>
                                    </select>
                                </div>
                                <div className={style.FormGroup}>
                                    <label>Date:</label>
                                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                                </div>
                            </div>

                            <button type="submit" className={style.SubmitButton}>Register</button>
                        </form>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default TeacherRegistration;
