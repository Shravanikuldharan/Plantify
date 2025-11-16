import React from 'react'
import { Link } from 'react-router';

function Navbar() {

  return (
    <nav className="bg-orange-100 shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-xl font-bold text-green-700">PlantShop</h1>

        {/* Links */}
        <div className="flex space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <Link to="/about" className="hover:text-green-600">About</Link>
          <Link to="/cart" className="hover:text-green-600">Cart</Link>
          <Link to="/login" className="hover:text-green-600">Login</Link>
          <Link to="/signup" className="hover:text-green-600">Signup</Link>
        </div>

      </div>
    </nav>
  );
}
export default Navbar;