import React from "react";
import style from "./create_classes.module.css";
import BredCrumb from "@/app/Components/breadcrumb/BreadCrumb";

const CreateClassesPage = () => {
    return (
        <div className={style.createClassesMains}>
            <BredCrumb title="Create Classes" />
            <div className="container mt-5">
                <div className={style.createClassesMain}>
                    <h1 className={style.pageTitle}>Create a New Class</h1>
                    <form className={style.classForm}>
                        <div className={style.formGroup}>
                            <label>Class Name</label>
                            <input type="text" placeholder="Enter class name" required />
                        </div>

                        <div className={style.formGroup}>
                            <label>Description</label>
                            <textarea placeholder="Enter class description" required />
                        </div>

                        <div className={style.formGroup}>
                            <label>Schedule</label>
                            <input type="datetime-local" required />
                        </div>

                        <div className={style.formGroup}>
                            <label>Instructor</label>
                            <input type="text" placeholder="Enter instructor name" required />
                        </div>

                        <button type="submit" className={style.submitButton}>
                            Create Class
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateClassesPage;
