import React from "react";
import style from "./student_details_view.module.css";


const studentData = async (id) => {
    let response = await fetch(`http://localhost:3000/api/${id}`);
    response = await response.json();
    return response.result;
};


const studentFeeData = async () => {
    let response = await fetch(`http://localhost:3000/api/fee_payment`);
    response = await response.json();
    return response.data;
};


const universalFeeData = async () => {
    let response = await fetch(`http://localhost:3000/api/set_universal_fee`);
    response = await response.json();
    console.log("Universal Fee Data:", response);
    return response;
};

const AdmissionPage = async ({ params }) => {
    const data = await studentData(params.studentdetailsview);
    const studentId = params.studentdetailsview;
    console.log("Student ID:", studentId);

    const fee = await studentFeeData();
    const universalFees = await universalFeeData();

    const studentFees = fee.filter(item => item.studentID === data._id);

    const totalAmount = studentFees.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    console.log("Total Amount Paid:", totalAmount);

    const studentUniversalFee = universalFees.find(item =>
        item.className.trim().toLowerCase() === data.class.trim().toLowerCase()
    );
    const requiredFee = studentUniversalFee ? (data.fee == 0 ? studentUniversalFee.feeAmount : data.fee) : "N/A";


    return (
        <div className={style.studentDetailsContainer}>
            <div className={style.studentDetailsCard}>
                <div className={style.profileContainer}>
                    {/* If the photo is Base64-encoded, use it directly in src */}
                    {/* <img src={`data:image/jpeg;base64,${data.photo}`} alt="Student" className={style.profileImage} /> */}
                </div>

                <h2 className={style.heading}>Student Details</h2>

                <div className={style.details}>
                    <p><strong>Name:</strong> {data.name}</p>
                    <p><strong>Father's Name:</strong> {data.fName}</p>
                    <p><strong>Mother's Name:</strong> {data.mName}</p>
                    <p><strong>Email:</strong> {data.email}</p>
                    <p><strong>Phone:</strong> {data.phone}</p>
                    <p><strong>Gender:</strong> {data.gender}</p>
                    <p><strong>Date of Birth:</strong> {data.dob}</p>
                    <p><strong>Address:</strong> {data.address}, {data.city}, {data.state}, {data.pinCode}</p>
                    <p><strong>Aadhaar Number:</strong> {data.adhar}</p>
                    <p><strong>Highest Qualification:</strong> {data.highestQualification}</p>
                    <p><strong>Previous School:</strong> {data.previousSchool}</p>
                    <p><strong>Class:</strong> {data.class}</p>
                    <p><strong>Roll Number:</strong> {data.rollNumber}</p>
                    <p><strong>Fee (Required for Course):</strong> ₹{requiredFee}</p>
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
