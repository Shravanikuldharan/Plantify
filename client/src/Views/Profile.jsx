import React, { useEffect, useState } from "react";
import axios from "axios";
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
            }
        } catch (err) {
            console.log(err);
            alert("Update failed");
        } finally {
            setSaving(false);
        }
    };

    if (!user) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="h-48 w-full bg-green-400 relative">
                <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2">

                    <div className="w-32 h-32 rounded-full bg-orange-500 border-4 border-white shadow-lg 
                    flex items-center justify-center text-white text-4xl font-bold">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto mt-20 px-4">

                <div className="text-center">
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <div className="flex justify-center space-x-6 text-gray-600 mt-2">
                        <p>📞 {user.phone || "No phone"}</p>
                        <p>📧 {user.email}</p>
                        <p>📍 {user.address || "No address"}</p>
                    </div>
                </div>

                <div className="mt-10 bg-white shadow-md rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">My Details</h2>

                        <button
                            className="text-green-600 flex items-center gap-2 hover:text-green-800"
                            onClick={() => setEditing(true)}
                        >
                            <FiEdit2 /> Edit
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">

                        <div>
                            <p className="font-medium text-gray-600">Name</p>
                            {!editing ? (
                                <div className="bg-gray-100 p-3 rounded-lg">{user.name}</div>
                            ) : (
                                <input
                                    className="w-full p-3 border rounded-lg"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                            )}
                        </div>

                        <div>
                            <p className="font-medium text-gray-600">Mobile</p>
                            {!editing ? (
                                <div className="bg-gray-100 p-3 rounded-lg">{user.phone}</div>
                            ) : (
                                <input
                                    className="w-full p-3 border rounded-lg"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                />
                            )}
                        </div>

                        <div>
                            <p className="font-medium text-gray-600">Address</p>
                            {!editing ? (
                                <div className="bg-gray-100 p-3 rounded-lg">{user.address}</div>
                            ) : (
                                <textarea
                                    rows="3"
                                    className="w-full p-3 border rounded-lg"
                                    value={form.address}
                                    onChange={(e) =>
                                        setForm({ ...form, address: e.target.value })
                                    }
                                ></textarea>
                            )}
                        </div>

                        <div>
                            <p className="font-medium text-gray-600">Role</p>
                            <div className="bg-gray-100 p-3 rounded-lg">{user.role}</div>
                        </div>
                    </div>

                    {editing && (
                        <div className="text-right mt-5">
                            <button
                                onClick={handleUpdate}
                                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;