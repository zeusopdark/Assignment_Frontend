import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import "../styles/CalendarView.css";

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [markedDates, setMarkedDates] = useState([]);
  const data = useSelector((store) => store.root);

  useEffect(() => {
    const fetchMarkedDates = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.get(
          "https://assignment-backend-5mg1xpplv-ankit-nishads-projects.vercel.app/attendance",
          config
        );
        const markedDates = response.data.map(
          (attendance) => new Date(attendance.date)
        );
        setMarkedDates(markedDates);
      } catch (error) {
        console.error("Error fetching marked dates:", error);
      }
    };

    fetchMarkedDates();
  }, []);

  const markAttendance = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await toast.promise(
        axios.post(
          "http://localhost:8000/attendance",
          {
            date: selectedDate,
            personId: data.userInfo._id,
          },
          config
        ),
        {
          pending: "Marking Attendance...",
          success: "Attendance Marked successfully",
          error: "Unable to mark the Attendance",
          loading: "Marking ...",
        }
      );
      setMarkedDates([...markedDates, selectedDate]);
    } catch (error) {
      return error;
    }
  };

  const tileClassName = ({ date }) => {
    const isDisabled = markedDates.some((markedDate) =>
      isSameDay(markedDate, date)
    );
    return isDisabled ? "disabled-date" : null;
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Mark Attendance</h2>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={tileClassName}
        className="calendar"
      />
      <button className="mark-button" onClick={markAttendance}>
        Mark Attendance
      </button>
    </div>
  );
};

export default CalendarView;
