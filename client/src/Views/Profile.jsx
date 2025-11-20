import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { FiEdit2 } from "react-icons/fi";

function Profile() {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("loggedInUser"));
        if (data) {
            setUser(data);
            setForm({
                name: data.name,
                phone: data.phone || "",
                address: data.address || "",
            });
        }
    }, []);

    const handleUpdate = async () => {
        try {
            setSaving(true);
            const token = localStorage.getItem("token");

            const res = await axios.put(
                `${import.meta.env.VITE_API_URL}/users/${user._id}`,
                form,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.success) {
                localStorage.setItem("loggedInUser", JSON.stringify(res.data.user));
                setUser(res.data.user);
                setEditing(false);
                toast.success("Profile updated successfully!");
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to update profile!");
        } finally {
            setSaving(false);
        }
    };


    if (!user) return <div className="p-10 text-center">Loading...</div>;

    return (
        <>
            <Navbar />
            <Toaster position="top-center" />

            <div className="min-h-screen bg-gray-100">
                <div
                    className="h-48 w-full relative bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.pexels.com/photos/1423600/pexels-photo-1423600.jpeg')",
                    }}
                >
                    <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2 z-10">
                        <div className="w-32 h-32 rounded-full bg-white border-4 border-green-600 shadow-xl flex items-center justify-center text-green-700 text-4xl font-bold">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto pt-24 pb-16 px-4 bg-gray-100">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-semibold text-gray-800">{user.name}</h1>
                        <p className="mt-2 text-gray-600">Manage your personal details</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-orange-500">My Details</h2>

                            {!editing && (
                                <button
                                    className="cursor-pointer text-green-600 bg-green-100 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-green-200 transition shadow-sm"
                                    onClick={() => setEditing(true)}
                                >
                                    <FiEdit2 /> Edit Profile
                                </button>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">

                            {/* name */}
                            <div>
                                <p className="text-gray-600 font-medium mb-1">Name</p>
                                {!editing ? (
                                    <div className="bg-gray-100 p-3 rounded-lg">{user.name}</div>
                                ) : (
                                    <input
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                                        value={form.name}
                                        onChange={(e) =>
                                            setForm({ ...form, name: e.target.value })
                                        }
                                    />
                                )}
                            </div>

                            {/* phone */}
                            <div>
                                <p className="text-gray-600 font-medium mb-1">Mobile No</p>
                                {!editing ? (
                                    <div className="bg-gray-100 p-3 rounded-lg">{user.phone}</div>
                                ) : (
                                    <input
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                                        value={form.phone}
                                        onChange={(e) =>
                                            setForm({ ...form, phone: e.target.value })
                                        }
                                    />
                                )}
                            </div>

                            {/* address */}
                            <div className="md:col-span-2">
                                <p className="text-gray-600 font-medium mb-1">Address</p>
                                {!editing ? (
                                    <div className="bg-gray-100 p-3 rounded-lg">
                                        {user.address || "No address added"}
                                    </div>
                                ) : (
                                    <textarea
                                        rows="3"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                                        value={form.address}
                                        onChange={(e) =>
                                            setForm({ ...form, address: e.target.value })
                                        }
                                    ></textarea>
                                )}
                            </div>

                            <div>
                                <p className="text-gray-600 font-medium mb-1">Role</p>
                                <div className="bg-gray-100 p-3 rounded-lg">{user.role}</div>
                            </div>
                        </div>

                        {editing && (
                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={handleUpdate}
                                    className="cursor-pointer bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition shadow"
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;