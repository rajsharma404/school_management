"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../pay.module.css"; // Ensure this file exists

const PayPage = () => {
    const router = useRouter();
    const { id } = useParams(); // Get student ID from URL

    // ✅ Memoized current date
    const getCurrentDate = useMemo(() => new Date().toISOString().split("T")[0], []);

    const [formData, setFormData] = useState({
        studentID: id || "",
        studentName: "",
        fatherName: "",
        rollNumber: "",
        className: "",
        amount: "",
        paymentMethod: "",
        date: getCurrentDate, // ✅ Automatically pre-fill the date
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch(`/api/students/${id}`);
                if (!response.ok) throw new Error("Failed to fetch student data");

                const data = await response.json();

                setFormData((prev) => ({
                    ...prev,
                    studentID: data._id || "",
                    studentName: data.name || "",
                    fatherName: data.fName || "",
                    rollNumber: data.rollNumber || "",
                    className: data.class || "",
                }));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching student:", error);
                setLoading(false);
            }
        };

        if (id) fetchStudent();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form data:", formData);

        try {
            const response = await fetch("/api/fee_payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log("API Response:", result);

            if (response.ok) {
                toast.success("Payment submitted successfully!", { autoClose: 3000 });
                router.push("/dashboard/fee/fee_details");
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
                    <p>Fee Payment</p>
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
                                    <label>Student Name:</label>
                                    <input type="text" name="studentName" value={formData.studentName} readOnly />
                                </div>
                                <div className={styles.column}>
                                    <label>Father Name:</label>
                                    <input type="text" name="fatherName" value={formData.fatherName} readOnly />
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <label>Roll Number:</label>
                                    <input type="text" name="rollNumber" value={formData.rollNumber} readOnly />
                                </div>
                                <div className={styles.column}>
                                    <label>Class:</label>
                                    <input type="text" name="className" value={formData.className} readOnly />
                                </div>
                            </div>
                            <div className={styles.row}>

                                <div className={styles.column}>
                                    <label>Amount:</label>
                                    <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
                                </div>
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

                            </div>
                            <label>Date:</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} required />



                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PayPage;
