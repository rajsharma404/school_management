import React from 'react'
import style from "./Course_Details_top.module.css"
const Course_Details_Top = () => {
    return (
        <div className="container my-5">
            <div className={style.coursesDetailsAll}>
                <div className={style.coursesDetails}>
                    <i className="fa-solid fa-ticket"></i>
                    <div className={style.coursesDetailsTitle}>
                        <h2>170</h2>
                        <p>New Addmission</p>

                    </div>
                </div>
                <div className={style.coursesDetails}>
                    <i className="fa-solid fa-user-tie"></i>
                    <div className={style.coursesDetailsTitle}>
                        <h2>500</h2>
                        <p>Total Student</p>

                    </div>
                </div>
                <div className={style.coursesDetails}>
                    <i className="fa-solid fa-user-graduate"></i>
                    <div className={style.coursesDetailsTitle}>
                        <h2>200</h2>
                        <p>MBA Students</p>

                    </div>
                </div>
                <div className={style.coursesDetails}>
                    <i className="fa-solid fa-certificate"></i>
                    <div className={style.coursesDetailsTitle}>
                        <h2>6K</h2>
                        <p>Certified Courses</p>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Course_Details_Top
