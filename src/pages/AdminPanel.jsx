import { useEffect, useState } from "react";
import { apiRequest } from "../api";
import { useAuth } from "../context/AuthContext";

const emptyUserForm = { name: "", email: "", password: "", role: "student", classId: "" };
const emptyClassForm = { name: "", grade: "", teacherId: "" };

const inputClass =
  "font-body text-sm border-b border-manila-line focus:border-ink outline-none py-2 bg-transparent px-1";
const selectClass =
  "font-body text-sm border-b border-manila-line focus:border-ink outline-none py-2 bg-transparent px-1";
const primaryBtn =
  "font-body text-sm font-medium px-5 py-2.5 rounded-sm bg-ink text-manila hover:bg-brick transition-colors disabled:opacity-60";
const ghostBtn = "font-mono text-xs uppercase tracking-[0.1em] text-ink-soft hover:text-ink";
const dangerBtn = "font-mono text-xs uppercase tracking-[0.1em] text-brick hover:text-ink";

export default function AdminPanel() {
  const { token } = useAuth();
  const [tab, setTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");

  const [userForm, setUserForm] = useState(emptyUserForm);
  const [classForm, setClassForm] = useState(emptyClassForm);

  // Editing state: null = no modal open, otherwise holds the form data being edited
  const [editingUser, setEditingUser] = useState(null);
  const [editingClass, setEditingClass] = useState(null);

  // Search & filters for the users table
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");

  // Pagination for the users table
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const loadData = async () => {
    try {
      const [usersData, classesData] = await Promise.all([
        apiRequest("/users", { token }),
        apiRequest("/classes", { token }),
      ]);
      setUsers(usersData);
      setClasses(classesData);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset to page 1 whenever the search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, roleFilter, classFilter]);

  // --- Users: add / edit / delete ---

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await apiRequest("/users", { method: "POST", body: userForm, token });
      setUserForm(emptyUserForm);
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const openEditUser = (u) => {
    setEditingUser({
      id: u._id,
      name: u.name,
      email: u.email,
      password: "",
      role: u.role,
      classId: u.classId?._id || "",
    });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { id, ...body } = editingUser;
      // Don't send an empty password - it means "leave unchanged"
      if (!body.password) delete body.password;
      await apiRequest(`/users/${id}`, { method: "PUT", body, token });
      setEditingUser(null);
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await apiRequest(`/users/${id}`, { method: "DELETE", token });
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  // --- Classes: add / edit / delete ---

  const handleAddClass = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await apiRequest("/classes", { method: "POST", body: classForm, token });
      setClassForm(emptyClassForm);
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const openEditClass = (c) => {
    setEditingClass({
      id: c._id,
      name: c.name,
      grade: c.grade,
      teacherId: c.teacherId?._id || "",
    });
  };

  const handleUpdateClass = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { id, ...body } = editingClass;
      await apiRequest(`/classes/${id}`, { method: "PUT", body, token });
      setEditingClass(null);
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteClass = async (id) => {
    try {
      await apiRequest(`/classes/${id}`, { method: "DELETE", token });
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const teachers = users.filter((u) => u.role === "teacher");

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesClass = classFilter === "all" || u.classId?._id === classFilter;
    return matchesSearch && matchesRole && matchesClass;
  });

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / usersPerPage));
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-brick mb-2">
          Admin
        </p>
        <h1 className="font-display text-3xl text-ink">School records</h1>
      </div>

      <div className="flex gap-8 border-b border-manila-line">
        <button
          className={`font-body text-sm pb-3 border-b-2 -mb-px transition-colors ${
            tab === "users"
              ? "border-ink text-ink"
              : "border-transparent text-ink-soft hover:text-ink"
          }`}
          onClick={() => setTab("users")}
        >
          Users
        </button>
        <button
          className={`font-body text-sm pb-3 border-b-2 -mb-px transition-colors ${
            tab === "classes"
              ? "border-ink text-ink"
              : "border-transparent text-ink-soft hover:text-ink"
          }`}
          onClick={() => setTab("classes")}
        >
          Classes
        </button>
      </div>

      {error && <p className="text-brick text-sm font-body">{error}</p>}

      {tab === "users" && (
        <div className="flex flex-col gap-6">
          <form
            onSubmit={handleAddUser}
            className="bg-card border border-manila-line rounded-sm p-6 flex flex-row flex-wrap gap-4 items-end"
          >
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                Name
              </span>
              <input
                className={inputClass}
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                Email
              </span>
              <input
                type="email"
                className={inputClass}
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                Password
              </span>
              <input
                type="password"
                className={inputClass}
                value={userForm.password}
                onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                Role
              </span>
              <select
                className={selectClass}
                value={userForm.role}
                onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {userForm.role === "student" && (
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                  Class
                </span>
                <select
                  className={selectClass}
                  value={userForm.classId}
                  onChange={(e) => setUserForm({ ...userForm, classId: e.target.value })}
                >
                  <option value="">No class</option>
                  {classes.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button className={primaryBtn} type="submit">
              Add user
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-4 justify-between">
            <input
              className="font-body text-sm border-b border-manila-line focus:border-ink outline-none py-2 bg-transparent px-1 w-full max-w-xs"
              placeholder="Search by name or email…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex gap-1 border border-manila-line rounded-sm p-1">
                {["all", "admin", "teacher", "student"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRoleFilter(r)}
                    className={`font-mono text-xs uppercase tracking-[0.1em] px-3 py-1.5 rounded-sm transition-colors ${
                      roleFilter === r
                        ? "bg-ink text-manila"
                        : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <select
                className={selectClass}
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
              >
                <option value="all">All classes</option>
                {classes.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border border-manila-line rounded-sm bg-card">
            <table className="w-full font-body text-sm">
              <thead>
                <tr className="border-b border-manila-line font-mono text-xs uppercase tracking-[0.1em] text-ink-soft">
                  <th className="text-left px-5 py-3 font-normal">Name</th>
                  <th className="text-left px-5 py-3 font-normal">Email</th>
                  <th className="text-left px-5 py-3 font-normal">Role</th>
                  <th className="text-left px-5 py-3 font-normal">Class</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-manila-line">
                {paginatedUsers.map((u) => (
                  <tr key={u._id}>
                    <td className="px-5 py-3 text-ink">{u.name}</td>
                    <td className="px-5 py-3 text-ink-soft">{u.email}</td>
                    <td className="px-5 py-3">
                      <span className="font-mono text-xs uppercase tracking-[0.1em] border border-manila-line rounded-sm px-2 py-1 text-ink-soft">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-ink-soft">{u.classId?.name || "—"}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-4 justify-end">
                        <button className={ghostBtn} onClick={() => openEditUser(u)}>
                          Edit
                        </button>
                        <button className={dangerBtn} onClick={() => handleDeleteUser(u._id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-ink-soft py-6 font-body text-sm">
                      No users match your search
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredUsers.length > 0 && (
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs text-ink-soft">
                Showing {(currentPage - 1) * usersPerPage + 1}–
                {Math.min(currentPage * usersPerPage, filteredUsers.length)} of{" "}
                {filteredUsers.length}
              </p>
              <div className="flex items-center gap-1">
                <button
                  className="font-mono text-xs uppercase tracking-[0.1em] px-3 py-1.5 rounded-sm text-ink-soft hover:text-ink disabled:opacity-30 disabled:hover:text-ink-soft"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`font-mono text-xs px-3 py-1.5 rounded-sm transition-colors ${
                      currentPage === page
                        ? "bg-ink text-manila"
                        : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="font-mono text-xs uppercase tracking-[0.1em] px-3 py-1.5 rounded-sm text-ink-soft hover:text-ink disabled:opacity-30 disabled:hover:text-ink-soft"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "classes" && (
        <div className="flex flex-col gap-6">
          <form
            onSubmit={handleAddClass}
            className="bg-card border border-manila-line rounded-sm p-6 flex flex-row flex-wrap gap-4 items-end"
          >
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                Class name
              </span>
              <input
                className={inputClass}
                value={classForm.name}
                onChange={(e) => setClassForm({ ...classForm, name: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                Grade
              </span>
              <input
                className={inputClass}
                value={classForm.grade}
                onChange={(e) => setClassForm({ ...classForm, grade: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                Teacher
              </span>
              <select
                className={selectClass}
                value={classForm.teacherId}
                onChange={(e) => setClassForm({ ...classForm, teacherId: e.target.value })}
              >
                <option value="">No teacher</option>
                {teachers.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <button className={primaryBtn} type="submit">
              Add class
            </button>
          </form>

          <div className="overflow-x-auto border border-manila-line rounded-sm bg-card">
            <table className="w-full font-body text-sm">
              <thead>
                <tr className="border-b border-manila-line font-mono text-xs uppercase tracking-[0.1em] text-ink-soft">
                  <th className="text-left px-5 py-3 font-normal">Name</th>
                  <th className="text-left px-5 py-3 font-normal">Grade</th>
                  <th className="text-left px-5 py-3 font-normal">Teacher</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-manila-line">
                {classes.map((c) => (
                  <tr key={c._id}>
                    <td className="px-5 py-3 text-ink">{c.name}</td>
                    <td className="px-5 py-3 text-ink-soft">{c.grade}</td>
                    <td className="px-5 py-3 text-ink-soft">{c.teacherId?.name || "—"}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-4 justify-end">
                        <button className={ghostBtn} onClick={() => openEditClass(c)}>
                          Edit
                        </button>
                        <button className={dangerBtn} onClick={() => handleDeleteClass(c._id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit user modal */}
      {editingUser && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/40 px-6">
          <div className="bg-card border border-manila-line rounded-sm p-8 w-full max-w-sm">
            <h3 className="font-display text-xl text-ink mb-6">Edit user</h3>
            <form onSubmit={handleUpdateUser} className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                  Name
                </span>
                <input
                  className={inputClass}
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  required
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                  Email
                </span>
                <input
                  className={inputClass}
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  required
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                  New password (leave blank to keep current)
                </span>
                <input
                  className={inputClass}
                  type="password"
                  value={editingUser.password}
                  onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                  Role
                </span>
                <select
                  className={selectClass}
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
              {editingUser.role === "student" && (
                <label className="flex flex-col gap-1.5">
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                    Class
                  </span>
                  <select
                    className={selectClass}
                    value={editingUser.classId}
                    onChange={(e) => setEditingUser({ ...editingUser, classId: e.target.value })}
                  >
                    <option value="">No class</option>
                    {classes.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <div className="flex justify-end gap-4 mt-3">
                <button type="button" className={ghostBtn} onClick={() => setEditingUser(null)}>
                  Cancel
                </button>
                <button type="submit" className={primaryBtn}>
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit class modal */}
      {editingClass && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/40 px-6">
          <div className="bg-card border border-manila-line rounded-sm p-8 w-full max-w-sm">
            <h3 className="font-display text-xl text-ink mb-6">Edit class</h3>
            <form onSubmit={handleUpdateClass} className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                  Class name
                </span>
                <input
                  className={inputClass}
                  value={editingClass.name}
                  onChange={(e) => setEditingClass({ ...editingClass, name: e.target.value })}
                  required
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                  Grade
                </span>
                <input
                  className={inputClass}
                  value={editingClass.grade}
                  onChange={(e) => setEditingClass({ ...editingClass, grade: e.target.value })}
                  required
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                  Teacher
                </span>
                <select
                  className={selectClass}
                  value={editingClass.teacherId}
                  onChange={(e) =>
                    setEditingClass({ ...editingClass, teacherId: e.target.value })
                  }
                >
                  <option value="">No teacher</option>
                  {teachers.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex justify-end gap-4 mt-3">
                <button type="button" className={ghostBtn} onClick={() => setEditingClass(null)}>
                  Cancel
                </button>
                <button type="submit" className={primaryBtn}>
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
