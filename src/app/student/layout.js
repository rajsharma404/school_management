import React from 'react'
import StudentMainLayout from '../Software_Component/studeentMainLayout/StudentMainLayout'

const layout = ({ children }) => {
    return (
        <div>


            <StudentMainLayout>
                {children}
            </StudentMainLayout>
        </div>
    )
}

export default layout
