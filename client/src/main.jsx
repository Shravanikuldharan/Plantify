import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css'
import Login from './Views/Login';
import Signup from './Views/Signup';
import Home from './Views/Home';
import About from './Views/About';
import Cart from './Views/Cart';
import AdminDashboard from './Views/Admin/AdminDashnoard';
import Users from './Views/Admin/Users';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<Users />} />
        </Routes>
    </BrowserRouter>
)