import { useEffect, useState } from "react";
import { apiRequest } from "../api";
import { useAuth } from "../context/AuthContext";

export default function StudentPanel() {
  const { token } = useAuth();
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([apiRequest("/grades", { token }), apiRequest("/attendance", { token })])
      .then(([gradesData, attendanceData]) => {
        setGrades(gradesData);
        setAttendance(attendanceData);
      })
      .catch((err) => setError(err.message));
  }, [token]);

  return (
    <div className="flex flex-col gap-6">
      {error && <p className="text-error text-sm">{error}</p>}

      <div>
        <h3 className="font-semibold mb-2">My grades</h3>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Score</th>
                <th>Term</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g) => (
                <tr key={g._id}>
                  <td>{g.subject}</td>
                  <td>{g.score}</td>
                  <td>{g.term}</td>
                </tr>
              ))}
              {grades.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center text-base-content/60">
                    No grades yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">My attendance</h3>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((a) => (
                <tr key={a._id}>
                  <td>{new Date(a.date).toLocaleDateString()}</td>
                  <td>
                    <span className="badge badge-outline">{a.status}</span>
                  </td>
                </tr>
              ))}
              {attendance.length === 0 && (
                <tr>
                  <td colSpan={2} className="text-center text-base-content/60">
                    No attendance records yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
