import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/AttendanceRecords.css";

// const url = "http://localhost:8000";
const url = "https://assignment-backend-zeta.vercel.app";

const AttendanceRecords = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${url}/attendance`, config);
        setAttendanceRecords(response.data);
      } catch (error) {
        console.error("Error fetching attendance records:", error);
        toast.error("Failed to fetch attendance records");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="attendance-container">
      <h2>Attendance Records</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Person ID</th>
            <th>Person Name</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record) => (
            <tr key={record._id}>
              <td>{record.date}</td>
              <td>{record.personId}</td>
              <td>{record.name}</td>{" "}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceRecords;
