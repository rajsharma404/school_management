import React from "react";
import style from "./teacher_details_view.module.css";

// Fetch student data
const studentData = async (id) => {
    let response = await fetch(`http://localhost:3000/api/teacher_id/${id}`);
    response = await response.json();
    return response.result;
};

const studentFeeData = async () => {
    let response = await fetch(`http://localhost:3000/api/teacher_fee_payment`);
    response = await response.json();
    return response.data; // Access 'data' array directly
};

const AdmissionPage = async ({ params }) => {
    const data = await studentData(params.teacherdetailsview);
    const studentId = params.teacherdetailsview;
    console.log(studentId);
    const fee = await studentFeeData();

    // Filter fees for the student
    // Filter fees for the teacher instead of student
    const studentFees = fee.filter(item => item.TeacherName === data.name);


    // Calculate total amount
    const totalAmount = studentFees.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    console.log(totalAmount + "ggg")

    return (
        <div className={style.studentDetailsContainer}>
            <div className={style.studentDetailsCard}>
                <div className={style.profileContainer}>
                    {/* If the photo is Base64-encoded, use it directly in src */}
                    {/* <img src={`data:image/jpeg;base64,${data.photo}`} alt="Student" className={style.profileImage} /> */}
                </div>

                <h2 className={style.heading}>Teacher Details</h2>

                <div className={style.details}>
                    <p><strong>Name:</strong> {data.name}</p>
                    <p><strong>Email:</strong> {data.email}</p>
                    <p><strong>Phone:</strong> {data.phone}</p>
                    <p><strong>Teached Class:</strong> {data.techedClass}</p>
                    <p><strong>Speciality:</strong> {data.specialty}</p>
                    <p><strong>Fee:</strong> {data.fee}</p>
                </div>

                <div className={style.fee}>
                    <h1>Fee Details</h1>
                    <table className={style.feeTable}>
                        <thead>
                            <tr>
                                <th>Amount</th>
                                <th>Payment Method</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentFees.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.amount}</td>
                                    <td>{item.paymentMethod}</td>
                                    <td>{new Date(item.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={style.totalAmount}>
                        <h2>Total Amount Paid: ₹{totalAmount.toFixed(2)}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdmissionPage;