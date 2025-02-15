import React from 'react'
import style from "./registration.module.css"
import BredCrumb from '@/app/Components/breadcrumb/BreadCrumb'

const VolunteerRegistration = () => {
    return (
        <div className={style.volunteerRegistrationMains}>
            <BredCrumb title="Volunteer Registration" />
            <div className="container">
                <div className={style.volunteerRegistrationMain}>
                    <h1>Volunteer Registration</h1>
                    <form className={style.registrationForm}>
                        <div className="row">
                            <div className="col-md-6">
                                <label>First Name <span>*</span></label>

                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter your first name"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter your last name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <label>Email <span>*</span></label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label>Phone <span>*</span></label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <label>Date of Birth <span>*</span></label>
                                <input
                                    type="date"
                                    name="dob"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label>Gender <span>*</span></label>
                                <select
                                    name="gender"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <label>Qualification <span>*</span></label>
                                <select name="qualification" required>
                                    <option value="">Select Qualification</option>
                                    <option value="10thPass">10th Pass</option>
                                    <option value="12thPass">12th Pass</option>
                                    <option value="Graduation">Graduation</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label>Preferred Role <span>*</span></label>
                                <select name="preferredRole" required>
                                    <option value="">Select Role</option>
                                    <option value="developer">Developer</option>
                                    <option value="designer">Designer</option>
                                    <option value="editor">Editor</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <label>Availability</label>
                                <textarea
                                    name="availability"
                                    placeholder="Enter your availability"
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <button type="submit" className={style.submitBtn}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VolunteerRegistration;
