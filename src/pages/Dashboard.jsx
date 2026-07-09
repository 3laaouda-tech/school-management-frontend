import { useAuth } from "../context/AuthContext";
import DashboardHeader from "../components/DashboardHeader";
import AdminPanel from "./AdminPanel";
import TeacherPanel from "./TeacherPanel";
import StudentPanel from "./StudentPanel";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-manila font-body">
      <DashboardHeader />

      <main className="max-w-6xl mx-auto px-6 py-10">
        {user?.role === "admin" && <AdminPanel />}
        {user?.role === "teacher" && <TeacherPanel />}
        {user?.role === "student" && <StudentPanel />}
      </main>
    </div>
  );
}
