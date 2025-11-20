// import { useState } from "react";
// import { Link } from "react-router";
// import {
//   FaUsers,
//   FaPlusCircle,
//   FaLeaf,
//   FaShoppingCart,
//   FaSignOutAlt,
//   FaBars,
// } from "react-icons/fa";

// function AdminLayout({ children }) {
//   const admin = JSON.parse(localStorage.getItem("loggedInUser"));
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       <div
//         className={`${
//           sidebarOpen ? "w-64" : "w-20"
//         } bg-white shadow-lg transition-all duration-300 flex flex-col`}
//       >
//         <div className="p-5 flex items-center border-b gap-4">
//           <FaBars
//             className="text-gray-700 text-2xl cursor-pointer"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           />
//           {sidebarOpen && (
//             <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
//           )}
//         </div>

//         <div className="flex flex-col gap-4 mt-6 px-3">
//           <Link to="/admin/users">
//             <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-green-100 cursor-pointer">
//               <FaUsers className="text-green-700 text-xl" />
//               {sidebarOpen && <span>View Users</span>}
//             </div>
//           </Link>

//           <Link to="/admin/add-plant">
//             <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-100 cursor-pointer">
//               <FaPlusCircle className="text-blue-700 text-xl" />
//               {sidebarOpen && <span>Add Plant</span>}
//             </div>
//           </Link>

//           <Link to="/admin/manage-plants">
//             <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-green-100 cursor-pointer">
//               <FaLeaf className="text-green-600 text-xl" />
//               {sidebarOpen && <span>Manage Plants</span>}
//             </div>
//           </Link>

//           <Link to="/admin/manage-orders">
//             <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-yellow-100 cursor-pointer">
//               <FaShoppingCart className="text-yellow-600 text-xl" />
//               {sidebarOpen && <span>Manage Orders</span>}
//             </div>
//           </Link>

//           <div
//             onClick={() => {
//               localStorage.removeItem("loggedInUser");
//               localStorage.removeItem("token");
//               window.location.href = "/login";
//             }}
//             className="flex items-center gap-4 p-3 rounded-xl hover:bg-red-100 cursor-pointer"
//           >
//             <FaSignOutAlt className="text-red-600 text-xl" />
//             {sidebarOpen && <span>Logout</span>}
//           </div>
//         </div>
//       </div>

//       <div className="flex-1 p-8">
//         <div className="w-full flex justify-end items-center mb-10">
//           <Link
//             to="/admin/dashboard"
//             className="bg-white px-6 py-2 rounded-full shadow hover:shadow-lg transition cursor-pointer"
//           >
//             <p className="text-gray-700 font-semibold">{admin?.name}</p>
//           </Link>
//         </div>

//         {children}
//       </div>
//     </div>
//   );
// }

// export default AdminLayout;

import { useState } from "react";
import { Link } from "react-router";
import {
  FaUsers,
  FaPlusCircle,
  FaLeaf,
  FaShoppingCart,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

function AdminLayout({ children, title }) {
  const admin = JSON.parse(localStorage.getItem("loggedInUser"));
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300 flex flex-col`}
      >
        <div className="p-5 flex items-center border-b gap-4">
          <FaBars
            className="text-gray-700 text-2xl cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
          {sidebarOpen && (
            <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          )}
        </div>

        <div className="flex flex-col gap-4 mt-6 px-3">

          <Link to="/admin/users">
            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-green-100 cursor-pointer">
              <FaUsers className="text-green-700 text-xl" />
              {sidebarOpen && <span>View Users</span>}
            </div>
          </Link>

          <Link to="/admin/add-plant">
            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-100 cursor-pointer">
              <FaPlusCircle className="text-blue-700 text-xl" />
              {sidebarOpen && <span>Add Plant</span>}
            </div>
          </Link>

          <Link to="/admin/manage-plants">
            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-green-100 cursor-pointer">
              <FaLeaf className="text-green-600 text-xl" />
              {sidebarOpen && <span>Manage Plants</span>}
            </div>
          </Link>

          <Link to="/admin/manage-orders">
            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-yellow-100 cursor-pointer">
              <FaShoppingCart className="text-yellow-600 text-xl" />
              {sidebarOpen && <span>Manage Orders</span>}
            </div>
          </Link>

          <div
            onClick={() => {
              localStorage.removeItem("loggedInUser");
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-red-100 cursor-pointer"
          >
            <FaSignOutAlt className="text-red-600 text-xl" />
            {sidebarOpen && <span>Logout</span>}
          </div>

        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 bg-gradient-to-br from-green-50 to-green-100/40">

        {/* NAVBAR with TITLE + ADMIN NAME */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">{title}</h1>

          <Link
            to="/admin/dashboard"
            className="bg-white px-6 py-2 rounded-full shadow hover:shadow-lg transition cursor-pointer"
          >
            <p className="text-gray-700 font-semibold">{admin?.name}</p>
          </Link>
        </div>

        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
