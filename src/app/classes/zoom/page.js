import React from 'react'
import style from "./zoom.module.css"
import BredCrumb from '@/app/Components/breadcrumb/BreadCrumb'
const page = () => {
  return (
    <div className={style.zoomMains}>
      <BredCrumb title="Zoom" />
      <div className="container">
        <div className={style.zoomMain}>
          <h1>Zoom</h1>
        </div>
      </div>
    </div>
  )
}

export default page
