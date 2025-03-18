// import React from 'react';
// import style from "./student_details.module.css";

// const StudentDetails = ({ student }) => {
//     return (
//         <div className={style.studentDetailsMain}>
//             <h1 className={style.heading}>Student Details</h1>
//             <div className={style.tableContainer}>
//                 <table className={style.table}>
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Father's Name</th>
//                             <th>Mother's Name</th>
//                             <th>Email</th>
//                             <th>Phone</th>
//                             <th>Gender</th>
//                             <th>DOB</th>
//                             <th>Address</th>
//                             <th>City</th>
//                             <th>State</th>
//                             <th>Pin Code</th>
//                             <th>Aadhar</th>
//                             <th>Highest Qualification</th>
//                             <th>Previous School</th>
//                             <th>Course Applied</th>
//                             <th>Photo</th>
//                             <th>Signature</th>
//                             <th>Aadhar Photo</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>{student.name}</td>
//                             <td>{student.fName}</td>
//                             <td>{student.mName}</td>
//                             <td>{student.email}</td>
//                             <td>{student.phone}</td>
//                             <td>{student.gender}</td>
//                             <td>{student.dob}</td>
//                             <td>{student.address}</td>
//                             <td>{student.city}</td>
//                             <td>{student.state}</td>
//                             <td>{student.pinCode}</td>
//                             <td>{student.adhar}</td>
//                             <td>{student.highestQualification}</td>
//                             <td>{student.previousSchool}</td>
//                             <td>{student.courseAply}</td>
//                             <td><img src={student.photo} alt="Student" className={style.image} /></td>
//                             <td><img src={student.signature} alt="Signature" className={style.image} /></td>
//                             <td><img src={student.adharphoto} alt="Aadhar" className={style.image} /></td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default StudentDetails;