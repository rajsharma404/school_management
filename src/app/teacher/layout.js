import React from 'react'
import TeacherMainLayout from '../Software_Component/teacherMainLayout/TeacherMainLayout'

const layout = ({ children }) => {
    return (
        <div>


            <TeacherMainLayout>
                {children}
            </TeacherMainLayout>
        </div>
    )
}

export default layout
