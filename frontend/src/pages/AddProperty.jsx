import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProperty() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        type: "pg",
        gender: "girls",
        location: "",
        address: "",
        rent: "",
        available_beds: "",
        total_beds: "",
        contact: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !formData.name ||
            !formData.location ||
            !formData.address ||
            !formData.rent ||
            !formData.total_beds ||
            !formData.contact
        ) {
            alert("Please fill all required fields.");
            return;
        }

        if (
            Number(formData.available_beds) >
            Number(formData.total_beds)
        ) {
            alert("Available beds cannot be greater than total beds.");
            return;
        }

        if (!/^\d{10}$/.test(formData.contact)) {
            alert("Please enter a valid 10-digit contact number.");
            return;
        }

        const token = localStorage.getItem("token");

        setLoading(true);

        try {

            const response = await fetch(
                "http://localhost:5000/api/properties",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Failed to add property");
                return;
            }

            alert("Property added successfully!");

            navigate("/owner-dashboard");

        } catch (error) {

            console.error(error);
            alert("Something went wrong. Please try again.");

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="min-h-screen bg-gray-50 py-10 px-6">

            <div className="max-w-3xl mx-auto">

                <button
                    onClick={() => navigate("/owner-dashboard")}
                    className="text-blue-600 mb-5"
                >
                    ← Back to Dashboard
                </button>

                <div className="bg-white rounded-2xl shadow-lg p-8">

                    <h1 className="text-3xl font-bold">
                        Add Property
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Add your PG, hostel or private room.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-5"
                    >

                        <input
                            name="name"
                            placeholder="Property Name *"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="grid md:grid-cols-2 gap-5">

                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="pg">PG</option>
                                <option value="hostel">Hostel</option>
                                <option value="private_room">
                                    Private Room
                                </option>
                            </select>

                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="girls">Girls</option>
                                <option value="boys">Boys</option>
                                <option value="unisex">Unisex</option>
                            </select>

                        </div>

                        <input
                            name="location"
                            placeholder="Location *"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <textarea
                            name="address"
                            placeholder="Full Address *"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="grid md:grid-cols-3 gap-5">

                            <input
                                type="number"
                                name="rent"
                                placeholder="Monthly Rent *"
                                value={formData.rent}
                                onChange={handleChange}
                                min="0"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <input
                                type="number"
                                name="available_beds"
                                placeholder="Available Beds"
                                value={formData.available_beds}
                                onChange={handleChange}
                                min="0"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <input
                                type="number"
                                name="total_beds"
                                placeholder="Total Beds *"
                                value={formData.total_beds}
                                onChange={handleChange}
                                min="1"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                        <input
                            type="tel"
                            name="contact"
                            placeholder="Contact Number *"
                            value={formData.contact}
                            onChange={handleChange}
                            maxLength="10"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-300"
                        >
                            {loading
                                ? "Adding Property..."
                                : "Add Property"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default AddProperty;