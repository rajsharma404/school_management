"use client";
import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

const SchoolPerformanceChart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const totalMarks = 100;
        const passingMarks = 40; // Minimum marks required to pass

        const data = [
            { subject: "Math", score: 85 },
            { subject: "Science", score: 78 },
            { subject: "English", score: 90 },
            { subject: "History", score: 35 }, // Failed
            { subject: "Geography", score: 75 },
        ];

        // Calculate pass and fail percentages & pass/fail status
        const updatedData = data.map(item => {
            const passPercentage = (item.score / totalMarks) * 100;
            const failPercentage = item.score < passingMarks ? 100 - passPercentage : 0;
            const status = item.score >= passingMarks ? "Passed" : "Failed"; // ✅ Pass/Fail Status

            return {
                ...item,
                passPercentage: parseFloat(passPercentage.toFixed(2)), // Numeric value
                failPercentage: parseFloat(failPercentage.toFixed(2)), // Numeric value
                status, // Add Pass/Fail status
            };
        });

        setChartData(updatedData);
    }, []);

    return (
        <div className="container">
            <div className="p-6 bg-white rounded-lg shadow-lg py-5">
                <h4 className="text-xl font-bold mb-5 text-center">Student Performance </h4>
                <ResponsiveContainer width="100%" height={350}z>
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="subject" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip
                            content={({ payload }) => {
                                if (payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="bg-white p-2 border rounded shadow-md">
                                            <p className="font-bold">{data.subject}</p>
                                            <p>🎯 Score: <b>{data.score} Marks</b></p>
                                            <p>✅ Pass %: <b>{data.passPercentage}%</b></p>
                                            <p>❌ Fail %: <b>{data.failPercentage}%</b></p>
                                            <p className={`font-bold ${data.status === "Passed" ? "text-green-500" : "text-red-500"}`}>
                                                {data.status === "Passed" ? "🎉 Passed" : "❌ Failed"}
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend />
                        <Bar dataKey="score" fill="#4F46E5" barSize={40} name="Marks Obtained" />
                        <Bar dataKey="passPercentage" fill="#34D399" barSize={40} name="Pass %" />
                        <Bar dataKey="failPercentage" fill="#EF4444" barSize={40} name="Fail %" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SchoolPerformanceChart;
