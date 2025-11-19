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
import AddPlant from './Views/Admin/AddPlant';
import AllPlants from './Views/AllPlants';
import PlantDetails from './Views/PlantDetails';
import AdminRoute from './Components/AdminRoute';
import NotFound from './Views/NotFound';
import ManagePlants from './Views/Admin/ManagePlants';
import EditPlant from './Views/Admin/EditPlant';
import Profile from './Views/Profile';
import Wishlist from './Views/Wishlist';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/plants" element={<AllPlants />} />
            <Route path="/plants/slug/:slug" element={<PlantDetails />} />
            <Route path="*" element={<NotFound/>} />
            <Route path={"/profile"} element={<Profile />} />
            <Route path="/wishlist" element={<Wishlist />} />


            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><Users /></AdminRoute>} />
            <Route path="/admin/add-plant" element={<AdminRoute><AddPlant /></AdminRoute>} />
            <Route path="/admin/manage-plants" element={<AdminRoute><ManagePlants /></AdminRoute>} />
            <Route path="/admin/edit-plant/:id" element={<AdminRoute><EditPlant /></AdminRoute>} />
        </Routes>
    </BrowserRouter>
)