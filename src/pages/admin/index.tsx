import DashboardLayout from "./layout";

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <h1>Admin Dashboard</h1>
      {/* Admin dashboard content goes here */}
      <button onClick={() => console.log("Admin dashboard clicked!")}>
        Click me
      </button>
      {/* Additional admin-specific components */}
      {/*... */}
    </DashboardLayout>
  );
}
