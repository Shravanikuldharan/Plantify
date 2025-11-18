import { Navigate } from "react-router";

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!token || !user || user.role !== "admin") {
    return <Navigate to="/" />; // redirect
  }

  return children;
}

export default AdminRoute;