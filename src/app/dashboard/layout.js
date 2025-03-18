
import React from 'react'
import MainLayout from '../Software_Component/mainlayout/MainLayout'

const layout = ({ children }) => {
    return (
        <div>
            <MainLayout>
                {children}
            </MainLayout>


        </div>
    )
}

export default layout
