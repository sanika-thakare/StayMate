import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProperty() {
    const { id } = useParams();
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

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/properties/${id}`
                );

                const data = await response.json();

                if (!response.ok) {
                    alert(data.message);
                    return;
                }

                const property = data.property;

                setFormData({
                    name: property.name || "",
                    description: property.description || "",
                    type: property.type || "pg",
                    gender: property.gender || "girls",
                    location: property.location || "",
                    address: property.address || "",
                    rent: property.rent || "",
                    available_beds: property.available_beds || "",
                    total_beds: property.total_beds || "",
                    contact: property.contact || ""
                });

            } catch (error) {
                console.error("Error fetching property:", error);
                alert("Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `http://localhost:5000/api/properties/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            alert("Property updated successfully!");

            navigate("/owner-dashboard");

        } catch (error) {
            console.error("Error updating property:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading property...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">

            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">

                <h1 className="text-3xl font-bold mb-6">
                    Edit Property
                </h1>

                <form onSubmit={handleSubmit}>

                    {/* Property Name */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Property Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            rows="3"
                        />
                    </div>

                    {/* Type */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Property Type
                        </label>

                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            required
                        >
                            <option value="pg">PG</option>
                            <option value="hostel">Hostel</option>
                            <option value="private_room">
                                Private Room
                            </option>
                        </select>
                    </div>

                    {/* Gender */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Gender</label>

                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            required
                        >
                            <option value="girls">Girls</option>
                            <option value="boys">Boys</option>
                            <option value="unisex">Unisex</option>
                        </select>
                    </div>

                    {/* Location */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Address
                        </label>

                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            rows="3"
                        />
                    </div>

                    {/* Rent */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Monthly Rent
                        </label>

                        <input
                            type="number"
                            name="rent"
                            value={formData.rent}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            required
                        />
                    </div>

                    {/* Available Beds */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Available Beds
                        </label>

                        <input
                            type="number"
                            name="available_beds"
                            value={formData.available_beds}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                    </div>

                    {/* Total Beds */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Total Beds
                        </label>

                        <input
                            type="number"
                            name="total_beds"
                            value={formData.total_beds}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                    </div>

                    {/* Contact */}
                    <div className="mb-6">
                        <label className="block mb-2 font-medium">
                            Contact
                        </label>

                        <input
                            type="tel"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    >
                        Update Property
                    </button>

                </form>
            </div>
        </div>
    );
}

export default EditProperty;