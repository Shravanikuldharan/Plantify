import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../Components/AdminLayout";

function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.log("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AdminLayout title="Users List">

    
      <div className="overflow-x-auto shadow-lg border rounded-xl bg-white">

        <table className="w-full text-left">

          <thead className="bg-green-600 text-white text-sm uppercase">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Address</th>
              <th className="p-4">Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="border-b hover:bg-gray-50 transition text-sm"
              >
                {/* Name */}
                <td className="p-4 font-medium">{u.name}</td>

                {/* Email */}
                <td className="p-4">{u.email}</td>

                {/* Phone */}
                <td className="p-4">{u.phone}</td>

                {/* Address */}
                <td className="p-4">{u.address}</td>

                {/* Role */}
                <td className="p-4 font-semibold">
                  {u.role === "admin" ? (
                    <span className="text-green-700">Admin</span>
                  ) : (
                    <span className="text-gray-700">User</span>
                  )}
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-5 text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </AdminLayout>
  );
}

export default Users;
