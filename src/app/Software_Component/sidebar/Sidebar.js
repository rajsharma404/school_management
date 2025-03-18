"use client";
import React, { useState, useRef, useEffect } from "react";
import style from "./Sidebar.module.css";
import { useRouter } from "next/navigation";
const Sidebar = ({ mobile, isCollapsed, isHidden, dashboardAccess, dashboardAccessTeacher, studentAcees }) => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("/");
  const [studentOpen, setStudentOpen] = useState(false)
  const [feeOpen, setFeeOpen] = useState(false)
  const [attendanceOpen, setAttendanceOpen] = useState(false)
  const [teacherOpen, setTeacherOpen] = useState(false)
  const [rotatedItem, setRotatedItem] = useState(null);

  const [isStudentOpen, setIsStudentOpen] = useState(false);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isFeeOpen, setIsFeeOpen] = useState(false);
  const [isTeacherOpen, setIsTeacherOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Toggle Student submenu
  const handleStudentClick = () => {
    setIsStudentOpen((prev) => !prev);
    setIsAttendanceOpen(false);
    setIsFeeOpen(false)// Close Attendance if open
    setIsTeacherOpen(false)
  };

  // Toggle Attendance submenu
  const handleAttendanceClick = () => {
    setIsAttendanceOpen((prev) => !prev);
    setIsStudentOpen(false); // Close Student if open
    setIsFeeOpen(false)// Close Attendance if open
    setIsTeacherOpen(false)
  };
  const handleFeeClick = () => {
    setIsFeeOpen((prev) => !prev);
    setIsStudentOpen(false); // Close Student if open
    setIsAttendanceOpen(false);
    setIsTeacherOpen(false)
  };
  const handleTeacherClick = () => {
    setIsTeacherOpen((prev) => !prev);
    setIsStudentOpen(false); // Close Student if open
    setIsAttendanceOpen(false);
    setIsFeeOpen(false)// Close Attendance if open
  };

  // Close submenus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsStudentOpen(false);
        setIsAttendanceOpen(false);
        setIsFeeOpen(false)
        setIsTeacherOpen(false)

      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  const toggleMenu = (menu) => {
    if (menu === "student") {
      setStudentOpen((prev) => !prev);
      setTeacherOpen(false);
      setFeeOpen(false);
      setAttendanceOpen(false);
    } else if (menu === "teacher") {
      setTeacherOpen((prev) => !prev);
      setStudentOpen(false);
      setFeeOpen(false);
      setAttendanceOpen(false);
    } else if (menu === "fee") {
      setFeeOpen((prev) => !prev);
      setStudentOpen(false);
      setTeacherOpen(false);
      setAttendanceOpen(false);
    } else if (menu === "attendance") {
      setAttendanceOpen((prev) => !prev);
      setStudentOpen(false);
      setTeacherOpen(false);
      setFeeOpen(false);
    }
  };

  // Function to handle submenu item click
  const handleItemClick = (path) => {
    setActiveItem(path);

    // Close all menus when clicking a submenu item EXCEPT if it's under the same open parent
    if (!path.includes("student")) setStudentOpen(false);
    if (!path.includes("teacher")) setTeacherOpen(false);
    if (!path.includes("fee")) setFeeOpen(false);
    if (!path.includes("attendance")) setAttendanceOpen(false);

    router.push(`/${path}`);
  };


  return (
    <div className={`${style.mainContainer} ${isCollapsed ? style.collapsed : ""} ${mobile ? style.mobileSidebar : ""}`}>
      <div className={`${style.logo}`}>
        {isCollapsed ? (
          <h1 className={isCollapsed ? style.show : ""}>N</h1>
        ) : (
          <img style={{ cursor: 'pointer' }} onClick={() => handleItemClick(dashboardAccess ? dashboardAccessTeacher ? "teacher" : "student" : "dashboard")} className={isCollapsed ? style.hidden : ""} src="https://netxperia.com/images/newlogo.png" alt="Netxperia Logo" />
        )}
      </div>

      <div className={style.profileDashboard}>
        <div className={style.profileTitle}>
          <div className={style.profile}>
            <img

              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpkITbb7nWHDCRxGfvdxukLljSoPFm6eAALw&s"
              alt="Profile"
            />
          </div>
          <h5 className={isCollapsed ? style.hidden : ""}>DVM School</h5>
        </div>
        <span className={isCollapsed ? style.hidden : ""}><i className="fa-solid fa-ellipsis-vertical"></i></span>
      </div>

      <div className={style.sidebarItem}>
        <ul ref={sidebarRef}>
          <li
            className={`${activeItem === "/" ? style.active : ""} ${isCollapsed ? style.removehover : style.onHover}`}
            onClick={() => handleItemClick(dashboardAccess ? dashboardAccessTeacher ? "teacher" : "student" : "dashboard")}
          >
            <div className={style.iconWithItem}>
              <span className={style.socialIcons}><i className="fa-solid fa-house"></i></span>

              <span className={isCollapsed ? style.hidden : ""}>Dashboard</span>
            </div>


          </li>
          <li

            className={`${isStudentOpen ? "active" : ""} ${activeItem === "student" ? style.active : ""} ${isCollapsed ? style.removehover : style.onHover}`}
            onClick={() => {
              toggleMenu("student")
              handleStudentClick()
            }}
          >

            <div className={style.iconWithItem}>
              <span className={style.socialIcons}><i className="fa-regular fa-user"></i></span>
              <span className={isCollapsed ? style.hidden : ""}>Student</span>
            </div>
            <span className={`${style.socialSubItem} ${isCollapsed ? style.hidden : ""}`}> <i className={`fa-solid fa-angle-left ${rotatedItem === "student" ? style.rotated : style.Norotated}`}></i>

            </span>
          </li>
          {/* sub meu of engagekkj */}
          <ul
            className={` ${style.subMenu} ${studentOpen ? style.open : ""} ${isCollapsed ? style.sidebarCollapse : ""}`}>
            <li onClick={() => {
              handleItemClick(`${(dashboardAccess ? dashboardAccessTeacher ? "teacher/student" : "student" : "dashboard/student")}/registration`)
            }}>
              <div className={style.iconWithItem}>
                <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                <span className={isCollapsed ? style.hidden : ""}>Registration</span>
              </div>
            </li>
            <li style={{ display: isHidden ? "none" : "block" }} onClick={() => {
              handleItemClick("dashboard/student/allstudent")
            }}>
              <div className={style.iconWithItem}>
                <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                <span className={isCollapsed ? style.hidden : ""}>All Student</span>
              </div>
            </li>
            <li onClick={() => {
              handleItemClick(`${(dashboardAccess ? dashboardAccessTeacher ? "teacher/student" : "student" : "dashboard/student")}/performance`)
            }}>
              <div className={style.iconWithItem}>
                <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                <span className={isCollapsed ? style.hidden : ""}>Performace</span>
              </div>
            </li>

          </ul>






          {isStudentOpen && (
            <ul style={{ display: isCollapsed ? "block" : "none" }}
              className={` ${isCollapsed ? style.sidebarCollapses : ""}`}>
              <li onClick={() => {
                handleItemClick(`${(dashboardAccess ? dashboardAccessTeacher ? "teacher/student" : "student" : "dashboard/student")}/registration`)
              }}>
                <div className={style.iconWithItem}>
                  <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                  <span>Registration</span>
                </div>
              </li>
              <li style={{ display: isHidden ? "none" : "block" }} onClick={() => {
                handleItemClick("dashboard/student/allstudent")
              }}>
                <div className={style.iconWithItem}>
                  <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                  <span>All Student</span>
                </div>
              </li>
              <li onClick={() => {
                handleItemClick(`${(dashboardAccess ? dashboardAccessTeacher ? "teacher/student" : "student" : "dashboard/student")}/performance`)
              }}>
                <div className={style.iconWithItem}>
                  <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                  <span>Performace</span>
                </div>
              </li>

            </ul>
          )}

          <li

            className={` ${isAttendanceOpen ? "active" : ""} ${activeItem === "attendance" ? style.active : ""} ${isCollapsed ? style.removehover : style.onHover}`}
            onClick={() => {
              toggleMenu("attendance");
              handleAttendanceClick(); // Correct function
            }}


          >
            <div className={style.iconWithItem}>
              <span className={style.socialIcons}> <i className="fa-solid fa-list-check"></i></span>
              <span className={isCollapsed ? style.hidden : ""}> Attendance</span>
            </div>
            <span className={`${style.socialSubItem} ${isCollapsed ? style.hidden : ""}`}> <i className={`fa-solid fa-angle-left ${rotatedItem === "attendance" ? style.rotated : style.Norotated}`}></i>
            </span>
          </li>
          {/* sub menu of payroll */}



          <ul className={`${style.subMenu} ${attendanceOpen ? style.open : ""} ${isCollapsed ? style.sidebarCollapse : ""}`}>
            <li style={{ display: studentAcees ? "none" : "flex" }} onClick={() => {
              handleItemClick(`${(dashboardAccess ? "teacher" : "dashboard")}/student/attendance`)
            }}>
              <div className={style.iconWithItem}>
                <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                <span className={isCollapsed ? style.hidden : ""}>Mark Attendance</span>
              </div>
            </li>
            <li onClick={() => {
              handleItemClick(`${(dashboardAccess ? dashboardAccessTeacher ? "teacher/student" : "student" : "dashboard/student")}/view_attendance`)
            }}>
              <div className={style.iconWithItem}>
                <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                <span className={isCollapsed ? style.hidden : ""}>View Attendance</span>
              </div>
            </li>
          </ul>

          {isAttendanceOpen && (
            <ul style={{ display: isCollapsed ? "block" : "none" }}
              className={` ${isCollapsed ? style.sidebarCollapses : ""}`}>

              <li style={{ display: studentAcees ? "none" : "flex" }} onClick={() => {
                handleItemClick(`${(dashboardAccess ? "teacher" : "dashboard")}/student/attendance`)
              }}>
                <div className={style.iconWithItem}>
                  <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                  <span>Mark Attendance</span>
                </div>
              </li>
              <li onClick={() => {
                handleItemClick(`${(dashboardAccess ? dashboardAccessTeacher ? "teacher/student" : "student" : "dashboard/student")}/view_attendance`)
              }}>
                <div className={style.iconWithItem}>
                  <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                  <span>View Attendance</span>
                </div>
              </li>

            </ul>
          )}



          <li style={{ display: isHidden ? "none" : "flex" }}
            className={`${isFeeOpen ? "active" : ""} ${activeItem === "fee" ? style.active : ""} ${isCollapsed ? style.removehover : style.onHover}`}
            onClick={() => {
              toggleMenu("fee")
              handleFeeClick()
            }}
          >
            <div className={style.iconWithItem}>
              <span className={style.socialIcons}> <i className="fa-solid fa-hand-holding-droplet"></i></span>
              <span className={isCollapsed ? style.hidden : ""}>Fees</span>
            </div>
            <span className={`${style.socialSubItem} ${isCollapsed ? style.hidden : ""}`}> <i className={`fa-solid fa-angle-left ${rotatedItem === "fee" ? style.rotated : style.Norotated}`}></i>
            </span>
          </li>
          {/* sub menu of task */}
          <ul className={`${style.subMenu} ${feeOpen ? style.open : ""} ${isCollapsed ? style.sidebarCollapse : ""}`}>
            <li onClick={() => {
              handleItemClick("dashboard/student/allstudent")
            }}>
              <div className={style.iconWithItem}>
                <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                <span className={isCollapsed ? style.hidden : ""}>Fee pay</span>
              </div>


            </li>
            <li onClick={() => {
              handleItemClick("dashboard/fee/fee_details")
            }}>
              <div className={style.iconWithItem}>
                <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                <span className={isCollapsed ? style.hidden : ""}>Fee Details</span>
              </div>
            </li>
            <li style={{ display: isHidden ? "none" : "block" }} onClick={() => {
              handleItemClick("dashboard/fee/set_universal_fee")
            }}>
              <div className={style.iconWithItem}>
                <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                <span className={isCollapsed ? style.hidden : ""}>Set Universal Fee</span>
              </div>


            </li>
          </ul>

          {isFeeOpen && (
            <ul style={{ display: isCollapsed ? "block" : "none" }}
              className={` ${isCollapsed ? style.sidebarCollapses : ""}`}>
              <li onClick={() => {
                handleItemClick("dashboard/student/allstudent")
              }}>
                <div className={style.iconWithItem}>
                  <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                  <span >Fee pay</span>
                </div>


              </li>
              <li onClick={() => {
                handleItemClick("dashboard/fee/fee_details")
              }}>
                <div className={style.iconWithItem}>
                  <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                  <span>Fee Details</span>
                </div>
              </li>
              <li style={{ display: isHidden ? "none" : "block" }} onClick={() => {
                handleItemClick("dashboard/fee/set_universal_fee")
              }}>
                <div className={style.iconWithItem}>
                  <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                  <span>Set Universal Fee</span>
                </div>


              </li>
            </ul>
          )}


          <li style={{ display: dashboardAccessTeacher ? "flex" : "none" }}
            className={`${isTeacherOpen ? "active" : ""} ${activeItem === "teacher" ? style.active : ""} ${isCollapsed ? style.removehover : style.onHover}`}
            onClick={() => {
              toggleMenu("teacher")
              handleTeacherClick()
            }}
          >
            <div className={style.iconWithItem}>
              <span className={style.socialIcons}><i className="fa-regular fa-clipboard"></i></span>
              <span className={isCollapsed ? style.hidden : ""}>Teacher</span>
            </div>
            <span className={`${style.socialSubItem} ${isCollapsed ? style.hidden : ""}`}> <i className={`fa-solid fa-angle-left ${rotatedItem === "teacher" ? style.rotated : style.Norotated}`}></i>
            </span>
          </li>
          {/* sub menu of teacher */}
          <ul className={`${style.subMenu} ${teacherOpen ? style.open : ""} ${isCollapsed ? style.sidebarCollapse : ""}`}>
            <li onClick={() => {
              handleItemClick(`${dashboardAccess ? "teacher" : "dashboard/teacher"}/registration`)
            }}>
              <div className={style.iconWithItem}>
                <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                <span className={isCollapsed ? style.hidden : ""}>Registration</span>
              </div>
            </li>
            <li style={{ display: isHidden ? "none" : "block" }} onClick={() => {
              handleItemClick("dashboard/teacher/all_teacher")
            }}>
              <div className={style.iconWithItem}>
                <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                <span className={isCollapsed ? style.hidden : ""}>All Teacher</span>
              </div>
            </li>
            <li style={{ display: isHidden ? "none" : "block" }} onClick={() => {
              handleItemClick("dashboard/teacher/mark_attendance")
            }}>
              <div className={style.iconWithItem}>
                <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                <span className={isCollapsed ? style.hidden : ""}>Mark Attendance</span>
              </div>
            </li>
            <li onClick={() => {
              handleItemClick(`${dashboardAccess ? "teacher" : "dashboard/teacher"}/view_attendance`)
            }}>
              <div className={style.iconWithItem}>
                <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                <span className={isCollapsed ? style.hidden : ""}>View Attendance</span>
              </div>
            </li>
            <li style={{ display: isHidden ? "none" : "block" }} onClick={() => {
              handleItemClick("dashboard/teacher/all_teacher")
            }}>
              <div className={style.iconWithItem}>
                <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                <span className={isCollapsed ? style.hidden : ""}>Salary Pay</span>
              </div>
            </li>
            <li style={{ display: isHidden ? "none" : "block" }} onClick={() => {
              handleItemClick("dashboard/teacher/fee_details")
            }}>
              <div className={style.iconWithItem}>
                <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                <span className={isCollapsed ? style.hidden : ""}>Salary Details</span>
              </div>
            </li>


          </ul>

          {isTeacherOpen && (
            <ul style={{ display: isCollapsed ? "block" : "none" }}
              className={` ${isCollapsed ? style.sidebarCollapses : ""} ${isCollapsed ? style.sidebarCollapsesLast : ""}`}>
              <li onClick={() => {
                handleItemClick(`${dashboardAccess ? "teacher" : "dashboard/teacher"}/registration`)
              }}>
                <div className={style.iconWithItem}>
                  <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                  <span >Registration</span>
                </div>
              </li>
              <li style={{ display: isHidden ? "none" : "block" }} onClick={() => {
                handleItemClick("dashboard/teacher/all_teacher")
              }}>
                <div className={style.iconWithItem}>
                  <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                  <span >All Teacher</span>
                </div>
              </li>
              <li style={{ display: isHidden ? "none" : "block" }} onClick={() => {
                handleItemClick("dashboard/teacher/mark_attendance")
              }}>
                <div className={style.iconWithItem}>
                  <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                  <span >Mark Attendance</span>
                </div>
              </li>
              <li onClick={() => {
                handleItemClick(`${dashboardAccess ? "teacher" : "dashboard/teacher"}/view_attendance`)
              }}>
                <div className={style.iconWithItem}>
                  <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                  <span >View Attendance</span>
                </div>
              </li>
              <li style={{ display: isHidden ? "none" : "block" }} onClick={() => {
                handleItemClick("dashboard/teacher/all_teacher")
              }}>
                <div className={style.iconWithItem}>
                  <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                  <span >Salary Pay</span>
                </div>
              </li>
              <li style={{ display: isHidden ? "none" : "block" }} onClick={() => {
                handleItemClick("dashboard/teacher/fee_details")
              }}>
                <div className={style.iconWithItem}>
                  <span className={`${style.socialIcons} ${style.subIconOfSub}`}><i className="fa-regular fa-circle-check"> </i></span>
                  <span>Salary Details</span>
                </div>
              </li>


            </ul>
          )}



        </ul>
      </div>
    </div >
  );
};

export default Sidebar;
