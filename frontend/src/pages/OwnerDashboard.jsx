import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OwnerDashboard() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const fetchMyProperties = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/properties/my-properties",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.error(data.message);
                return;
            }

            setProperties(data.properties);

        } catch (error) {
            console.error("Error fetching properties:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyProperties();
    }, [token]);

    const handleDelete = async (propertyId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this property?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/properties/${propertyId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            alert("Property deleted successfully!");

            setProperties(
                properties.filter(
                    (property) => property.id !== propertyId
                )
            );

        } catch (error) {
            console.error("Error deleting property:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">

            <div className="flex justify-between items-center mb-8">

                <div>
                    <h1 className="text-3xl font-bold">
                        Owner Dashboard
                    </h1>

                    <p className="text-lg text-gray-600 mt-2">
                        Welcome, {user?.name}!
                    </p>
                </div>

                <button
                    onClick={() => navigate("/add-property")}
                    className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
                >
                    + Add Property
                </button>

            </div>

            <h2 className="text-2xl font-semibold mb-4">
                My Properties
            </h2>

            {loading ? (
                <p>Loading properties...</p>

            ) : properties.length === 0 ? (

                <div className="bg-white p-8 rounded-xl shadow text-center">
                    <p className="text-gray-600 mb-4">
                        You have not added any properties yet.
                    </p>

                    <button
                        onClick={() => navigate("/add-property")}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >
                        Add Your First Property
                    </button>
                </div>

            ) : (

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {properties.map((property) => (

                        <div
                            key={property.id}
                            className="bg-white p-6 rounded-xl shadow"
                        >

                            <h3 className="text-xl font-bold">
                                {property.name}
                            </h3>

                            <p className="text-gray-600 mt-2">
                                {property.location}
                            </p>

                            <p className="mt-3">
                                Rent: ₹{property.rent}
                            </p>

                            <p>
                                Available beds: {property.available_beds}
                            </p>

                            <p>
                                Total beds: {property.total_beds}
                            </p>

                            <div className="flex gap-3 mt-5">

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/edit-property/${property.id}`
                                        )
                                    }
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(property.id)
                                    }
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default OwnerDashboard;