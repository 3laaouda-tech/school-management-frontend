import { useEffect, useState } from "react";
import { apiRequest } from "../api";
import { useAuth } from "../context/AuthContext";

export default function TeacherPanel() {
  const { token } = useAuth();
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState("");

  const [gradeForm, setGradeForm] = useState({ studentId: "", subject: "", score: "", term: "" });
  const [attendanceForm, setAttendanceForm] = useState({
    studentId: "",
    date: "",
    status: "present",
  });

  // Editing state: null = no modal open, otherwise holds the form data being edited
  const [editingGrade, setEditingGrade] = useState(null);
  const [editingAttendance, setEditingAttendance] = useState(null);

  useEffect(() => {
    apiRequest("/classes", { token }).then(setClasses).catch((err) => setError(err.message));
  }, [token]);

  const loadClassData = async (classId) => {
    if (!classId) return;
    try {
      const [studentsData, gradesData, attendanceData] = await Promise.all([
        apiRequest(`/classes/${classId}/students`, { token }),
        apiRequest(`/grades?classId=${classId}`, { token }),
        apiRequest(`/attendance?classId=${classId}`, { token }),
      ]);
      setStudents(studentsData);
      setGrades(gradesData);
      setAttendance(attendanceData);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSelectClass = (classId) => {
    setSelectedClass(classId);
    loadClassData(classId);
  };

  const handleAddGrade = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await apiRequest("/grades", {
        method: "POST",
        body: { ...gradeForm, classId: selectedClass, score: Number(gradeForm.score) },
        token,
      });
      setGradeForm({ studentId: "", subject: "", score: "", term: "" });
      loadClassData(selectedClass);
    } catch (err) {
      setError(err.message);
    }
  };

  const openEditGrade = (g) => {
    setEditingGrade({
      id: g._id,
      studentName: g.studentId?.name,
      subject: g.subject,
      score: g.score,
      term: g.term,
    });
  };

  const handleUpdateGrade = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { id, studentName, ...body } = editingGrade;
      await apiRequest(`/grades/${id}`, {
        method: "PUT",
        body: { ...body, score: Number(body.score) },
        token,
      });
      setEditingGrade(null);
      loadClassData(selectedClass);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddAttendance = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await apiRequest("/attendance", {
        method: "POST",
        body: { ...attendanceForm, classId: selectedClass },
        token,
      });
      setAttendanceForm({ studentId: "", date: "", status: "present" });
      loadClassData(selectedClass);
    } catch (err) {
      setError(err.message);
    }
  };

  const openEditAttendance = (a) => {
    setEditingAttendance({
      id: a._id,
      studentName: a.studentId?.name,
      // Convert to yyyy-mm-dd for the date input
      date: new Date(a.date).toISOString().slice(0, 10),
      status: a.status,
    });
  };

  const handleUpdateAttendance = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { id, studentName, ...body } = editingAttendance;
      await apiRequest(`/attendance/${id}`, { method: "PUT", body, token });
      setEditingAttendance(null);
      loadClassData(selectedClass);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <select
        className="select select-bordered w-full max-w-xs"
        value={selectedClass}
        onChange={(e) => handleSelectClass(e.target.value)}
      >
        <option value="">Select a class</option>
        {classes.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name} ({c.grade})
          </option>
        ))}
      </select>

      {error && <p className="text-error text-sm">{error}</p>}

      {selectedClass && (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <form onSubmit={handleAddGrade} className="card bg-base-100 shadow p-4 flex flex-col gap-2">
              <h3 className="font-semibold">Add grade</h3>
              <select
                className="select select-bordered select-sm"
                value={gradeForm.studentId}
                onChange={(e) => setGradeForm({ ...gradeForm, studentId: e.target.value })}
                required
              >
                <option value="">Student</option>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <input
                className="input input-bordered input-sm"
                placeholder="Subject"
                value={gradeForm.subject}
                onChange={(e) => setGradeForm({ ...gradeForm, subject: e.target.value })}
                required
              />
              <input
                className="input input-bordered input-sm"
                placeholder="Score (0-100)"
                type="number"
                min="0"
                max="100"
                value={gradeForm.score}
                onChange={(e) => setGradeForm({ ...gradeForm, score: e.target.value })}
                required
              />
              <input
                className="input input-bordered input-sm"
                placeholder="Term (e.g. Term 1)"
                value={gradeForm.term}
                onChange={(e) => setGradeForm({ ...gradeForm, term: e.target.value })}
                required
              />
              <button className="btn btn-primary btn-sm" type="submit">
                Add grade
              </button>
            </form>

            <form
              onSubmit={handleAddAttendance}
              className="card bg-base-100 shadow p-4 flex flex-col gap-2"
            >
              <h3 className="font-semibold">Add attendance</h3>
              <select
                className="select select-bordered select-sm"
                value={attendanceForm.studentId}
                onChange={(e) => setAttendanceForm({ ...attendanceForm, studentId: e.target.value })}
                required
              >
                <option value="">Student</option>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <input
                className="input input-bordered input-sm"
                type="date"
                value={attendanceForm.date}
                onChange={(e) => setAttendanceForm({ ...attendanceForm, date: e.target.value })}
                required
              />
              <select
                className="select select-bordered select-sm"
                value={attendanceForm.status}
                onChange={(e) => setAttendanceForm({ ...attendanceForm, status: e.target.value })}
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
              </select>
              <button className="btn btn-primary btn-sm" type="submit">
                Add attendance
              </button>
            </form>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="overflow-x-auto">
              <h3 className="font-semibold mb-2">Grades</h3>
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Subject</th>
                    <th>Score</th>
                    <th>Term</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((g) => (
                    <tr key={g._id}>
                      <td>{g.studentId?.name}</td>
                      <td>{g.subject}</td>
                      <td>{g.score}</td>
                      <td>{g.term}</td>
                      <td>
                        <button className="btn btn-ghost btn-xs" onClick={() => openEditGrade(g)}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="overflow-x-auto">
              <h3 className="font-semibold mb-2">Attendance</h3>
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((a) => (
                    <tr key={a._id}>
                      <td>{a.studentId?.name}</td>
                      <td>{new Date(a.date).toLocaleDateString()}</td>
                      <td>
                        <span className="badge badge-outline">{a.status}</span>
                      </td>
                      <td>
                        <button className="btn btn-ghost btn-xs" onClick={() => openEditAttendance(a)}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Edit grade modal */}
      <div className={`modal ${editingGrade ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-semibold text-lg mb-4">Edit grade</h3>
          {editingGrade && (
            <form onSubmit={handleUpdateGrade} className="flex flex-col gap-3">
              <p className="text-sm text-base-content/60">Student: {editingGrade.studentName}</p>
              <label className="form-control">
                <span className="label-text mb-1">Subject</span>
                <input
                  className="input input-bordered input-sm"
                  value={editingGrade.subject}
                  onChange={(e) => setEditingGrade({ ...editingGrade, subject: e.target.value })}
                  required
                />
              </label>
              <label className="form-control">
                <span className="label-text mb-1">Score (0-100)</span>
                <input
                  className="input input-bordered input-sm"
                  type="number"
                  min="0"
                  max="100"
                  value={editingGrade.score}
                  onChange={(e) => setEditingGrade({ ...editingGrade, score: e.target.value })}
                  required
                />
              </label>
              <label className="form-control">
                <span className="label-text mb-1">Term</span>
                <input
                  className="input input-bordered input-sm"
                  value={editingGrade.term}
                  onChange={(e) => setEditingGrade({ ...editingGrade, term: e.target.value })}
                  required
                />
              </label>
              <div className="modal-action">
                <button type="button" className="btn btn-sm" onClick={() => setEditingGrade(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Edit attendance modal */}
      <div className={`modal ${editingAttendance ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-semibold text-lg mb-4">Edit attendance</h3>
          {editingAttendance && (
            <form onSubmit={handleUpdateAttendance} className="flex flex-col gap-3">
              <p className="text-sm text-base-content/60">Student: {editingAttendance.studentName}</p>
              <label className="form-control">
                <span className="label-text mb-1">Date</span>
                <input
                  className="input input-bordered input-sm"
                  type="date"
                  value={editingAttendance.date}
                  onChange={(e) => setEditingAttendance({ ...editingAttendance, date: e.target.value })}
                  required
                />
              </label>
              <label className="form-control">
                <span className="label-text mb-1">Status</span>
                <select
                  className="select select-bordered select-sm"
                  value={editingAttendance.status}
                  onChange={(e) =>
                    setEditingAttendance({ ...editingAttendance, status: e.target.value })
                  }
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="late">Late</option>
                </select>
              </label>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() => setEditingAttendance(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
