"use client";

import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from "recharts";
import style from "./TeacherPerformance.module.css"; // Import CSS Module

const data = [
    { name: "Mr. A", subject: "Math", classesPerWeek: 20, feedback: 85 },
    { name: "Ms. B", subject: "Science", classesPerWeek: 18, feedback: 88 },
    { name: "Mr. C", subject: "English", classesPerWeek: 22, feedback: 80 },
    { name: "Ms. D", subject: "History", classesPerWeek: 20, feedback: 75 },
];

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"];

export default function TeacherPerformance() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className={style.container}>
            <h2 className={style.heading}>Faculty Overview</h2>

            <div className={style.flexContainer}>
                {/* Table Section */}
                <div className={style.tableContainer}>
                    <table>
                        <thead>
                            <tr>
                                <th>Teacher Name</th>
                                <th>Subject</th>
                                <th>Classes per Week</th>
                                <th>Student Feedback (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.subject}</td>
                                    <td>{item.classesPerWeek}</td>
                                    <td className={style.feedback}>{item.feedback}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pie Chart Section */}
                {isClient && (
                    <div className={style.chartContainer}>
                        <ResponsiveContainer width="100%" height={350}>
                            <PieChart>
                                <Tooltip />
                                <Legend />
                                <Pie
                                    data={data}
                                    dataKey="feedback"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    fill="#8884d8"
                                    label
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
}
