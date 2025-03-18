"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../fee_pay.module.css"; // Ensure this file exists

const PayPage = () => {
    const router = useRouter();
    const { id } = useParams(); // Get teacher ID from URL

    // ✅ Memoized current date
    const getCurrentDate = useMemo(() => new Date().toISOString().split("T")[0], []);

    const [formData, setFormData] = useState({
        TeacherID: id || "",
        TeacherName: "",
        Phone: "",
        Email: "",
        TechedClass: "",
        Speciality: "",
        amount: "",
        paymentMethod: "",
        date: getCurrentDate, // ✅ Automatically pre-fill the date
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const response = await fetch(`/api/teachers/${id}`);
                if (!response.ok) throw new Error("Failed to fetch teacher data");

                const data = await response.json();

                setFormData((prev) => ({
                    ...prev,
                    TeacherID: data._id || "",
                    TeacherName: data.name || "",
                    Phone: data.phone || "",
                    Email: data.email || "",
                    TechedClass: data.techedClass || "",  // ✅ Fixed casing
                    Speciality: data.specialty || "",     // ✅ Fixed casing
                    amount: data.amount || "",            // ✅ Fixed casing
                }));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching teacher:", error);
                setLoading(false);
            }
        };

        if (id) fetchTeacher();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form data:", formData);

        try {
            const response = await fetch("/api/teacher_fee_payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log("API Response:", result);

            if (response.ok) {
                toast.success("Payment submitted successfully!", { autoClose: 3000 });
                router.push("/dashboard");
            } else {
                toast.error(result.error || "Payment failed", { autoClose: 3000 });
            }
        } catch (error) {
            toast.error("Something went wrong. Try again.", { autoClose: 3000 });
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className={styles.feePay}>
            <div className={styles.bredcrums}>
                <h4>Fee Payment</h4>
                <div className={styles.bredcrum}>
                    <p onClick={() => router.push("dashbord")}>Dashboard / </p>
                    <p>Fee payment</p>
                </div>
            </div>
            <div className={styles.payMains}>
                <ToastContainer />

                <div className={styles.payMainCard}>

                    <div className={styles.payMain}>
                        <h1>Fee Payment</h1>
                        <form className={styles.paymentForm} onSubmit={handleSubmit}>
                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <label>Teacher Name:</label>
                                    <input type="text" name="TeacherName" value={formData.TeacherName} readOnly />
                                </div>
                                <div className={styles.column}>
                                    <label>Phone:</label>
                                    <input type="text" name="Phone" value={formData.Phone} readOnly />
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <label>Email:</label>
                                    <input type="text" name="Email" value={formData.Email} readOnly />
                                </div>
                                <div className={styles.column}>
                                    <label>Teached Class:</label>
                                    <input type="text" name="TechedClass" value={formData.TechedClass} readOnly />
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <label>Speciality:</label>
                                    <input type="text" name="Speciality" value={formData.Speciality} readOnly />
                                </div>
                                <div className={styles.column}>
                                    <label>Amount:</label>
                                    <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
                                </div>

                            </div>
                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <label>Payment Method:</label>
                                    <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
                                        <option value="">Select Method</option>
                                        <option value="Credit Card">Credit Card</option>
                                        <option value="Debit Card">Debit Card</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="Cash">Cash</option>
                                    </select>
                                </div>
                                <div className={styles.column}>
                                    <label>Date:</label>
                                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                                </div>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PayPage;
