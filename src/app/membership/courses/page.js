import BredCrumb from '@/app/Components/breadcrumb/BreadCrumb'
import MembershipCourses from '@/app/Components/membership/MembershipCourse'
import React from 'react'

const page = () => {
    return (
        <div>
            <BredCrumb title="membership Courses" />
            <MembershipCourses />

        </div>
    )
}

export default page
