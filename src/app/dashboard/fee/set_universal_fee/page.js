"use client"
import React, { useState } from 'react';
import style from "./set_universal_fee.module.css";

const Page = () => {
    const [selectedClass, setSelectedClass] = useState("Class 1");
    const [fee, setFee] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/set_universal_fee", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ className: selectedClass, feeAmount: Number(fee) })
        });

        const data = await response.json();
        alert(data.message);
    };

    return (
        <div className={style.set_Universal_FeeMains}>
            <div className={style.bredcrums}>
                <h4>Set Universal Fee</h4>
                <div className={style.bredcrum}>
                    <p onClick={() => router.push("dashbord")}>Dashboard / </p>
                    <p>Set Universal Fee</p>
                </div>
            </div>
            <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={style.set_Universal_FeeMain}>
                    <h1>Set Universal Fee</h1>
                    <form onSubmit={handleSubmit}>
                        <label>Choose Class:</label>
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                        >
                            <option value="">Select Class</option>
                            <option value="nursery">Nursery</option>
                            <option value="kindergarten">Kindergarten</option>
                            <option value="Class1">Class 1</option>
                            <option value="Class2">Class 2</option>
                            <option value="Class3">Class 3</option>
                            <option value="Class4">Class 4</option>
                            <option value="Class5">Class 5</option>
                        </select>

                        <label>Set Fee:</label>
                        <input
                            type="number"
                            value={fee}
                            onChange={(e) => setFee(e.target.value)}
                            placeholder="Enter fee amount"
                        />

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Page;
