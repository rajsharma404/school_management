import React from 'react'
import style from "./page.module.css"
import SchoolPerformanceChart from '../Software_Component/schoolPeromanceChart/SchoolPerformanceChart'
import TeacherPerformance from '../Software_Component/Teacherperformance/TeacherPerfromance'
import Course_Details_Top from '../Software_Component/course_Details_top/Course_Details_Top'

const page = () => {
    return (
        <div className={style.coursesDetailsAllMain}>

            <Course_Details_Top />
            <div className={style.SchoolPerformanceChart}>
                <SchoolPerformanceChart />
            </div>
            <TeacherPerformance />
        </div>
    )
}

export default page
