"use client"
import React, { useState } from 'react';
import style from "./tracking.module.css";
import BredCrumb from '@/app/Components/breadcrumb/BreadCrumb';

const VolunteerTracking = () => {
    const [trackingData, setTrackingData] = useState([
        { id: 1, name: 'John Doe', role: 'Organizer', status: 'Completed', date: '2025-01-20' },
        { id: 2, name: 'Jane Smith', role: 'Volunteer', status: 'In Progress', date: '2025-01-25' },
        { id: 3, name: 'Mike Johnson', role: 'Coordinator', status: 'Pending', date: '2025-02-10' },
        { id: 4, name: 'Emma Williams', role: 'Volunteer', status: 'Completed', date: '2025-02-12' },
        { id: 5, name: 'Sophia Brown', role: 'Volunteer', status: 'In Progress', date: '2025-02-15' },
        { id: 6, name: 'William Harris', role: 'Coordinator', status: 'Completed', date: '2025-02-16' },
        { id: 7, name: 'Olivia Green', role: 'Organizer', status: 'Pending', date: '2025-02-18' },
        { id: 8, name: 'Lucas White', role: 'Volunteer', status: 'Completed', date: '2025-02-19' },
        { id: 9, name: 'Ava Martinez', role: 'Coordinator', status: 'In Progress', date: '2025-02-22' },
        { id: 10, name: 'Mason Taylor', role: 'Volunteer', status: 'Pending', date: '2025-02-24' },
        { id: 11, name: 'Liam Wilson', role: 'Volunteer', status: 'Completed', date: '2025-02-26' },
        { id: 12, name: 'Isabella Moore', role: 'Coordinator', status: 'In Progress', date: '2025-02-28' },
        // More dummy data
    ]);

    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const filteredData = trackingData.filter(volunteer =>
        volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        volunteer.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage, currentPage * rowsPerPage
    );

    const handleViewClick = (volunteer) => {
        setSelectedVolunteer(volunteer);
    };

    // const handleCloseModal = () => {
    //     setSelectedVolunteer(null);
    // };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleSearchClick = () => {

    };

    const handlePageChange = (direction) => {
        setCurrentPage((prevPage) => {
            const newPage = prevPage + direction;
            return Math.max(1, Math.min(newPage, totalPages));
        });
    };

    const handleCloseModal = () => {
        if (selectedVolunteer) {
            setSelectedVolunteer(null);
        }
    };

    return (
        <div className={style.trackingMains}>
            <BredCrumb title="Volunteer Tracking" />
            <div className="container">
                <div className={style.trackingMain}>
                    <h1>Volunteer Tracking</h1>

                    {/* Search Bar with Search Button */}
                    <div className={style.searchBar}>
                        <input
                            type="text"
                            placeholder="Search by name or role"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button
                            className={style.searchButton}
                            onClick={handleSearchClick}
                        >
                            Search
                        </button>
                    </div>

                    {/* Table */}
                    <table className={style.trackingTable}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((volunteer) => (
                                <tr key={volunteer.id}>
                                    <td>{volunteer.name}</td>
                                    <td>{volunteer.role}</td>
                                    <td>
                                        <span
                                            className={`${style.status} ${style[volunteer.status.replace(/\s+/g, '').toLowerCase()]}`}
                                        >
                                            {volunteer.status}
                                        </span>
                                    </td>
                                    <td>{volunteer.date}</td>
                                    <td>
                                        <button
                                            className={style.trackButton}
                                            onClick={() => handleViewClick(volunteer)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={style.pagination}>
                        <span className={style.pageNumber}>
                            Page {currentPage} of {totalPages}
                        </span>
                        <div className={style.paginationdBtn}>
                            <button
                                onClick={() => handlePageChange(-1)}
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>


                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>

                    </div>


                    {/* Modal or Centered Page */}
                    {selectedVolunteer && (
                        <div className={style.modalOverlay}>
                            <div className={style.modalContent}>
                                <h2>Volunteer Details</h2>
                                <p><strong>Name:</strong> {selectedVolunteer.name}</p>
                                <p><strong>Role:</strong> {selectedVolunteer.role}</p>
                                <p><strong>Status:</strong> {selectedVolunteer.status}</p>
                                <p><strong>Date:</strong> {selectedVolunteer.date}</p>
                                <button className={style.closeButton} onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VolunteerTracking;
