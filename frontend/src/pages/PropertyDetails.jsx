import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PropertyDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProperty = async () => {

            try {

                const response = await fetch(
                    `http://localhost:5000/api/properties/${id}`
                );

                const data = await response.json();

                if (!response.ok) {
                    alert(data.message || "Property not found");
                    return;
                }

                setProperty(data.property);

            } catch (error) {

                console.error("Error fetching property:", error);

            } finally {

                setLoading(false);

            }
        };

        fetchProperty();

    }, [id]);

    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-lg text-gray-500">
                    Loading property...
                </p>
            </div>
        );

    }

    if (!property) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-5xl mb-4">🏠</div>

                    <h2 className="text-2xl font-bold">
                        Property Not Found
                    </h2>

                    <button
                        onClick={() => navigate("/properties")}
                        className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg"
                    >
                        Back to Properties
                    </button>
                </div>
            </div>
        );

    }

    return (

        <div className="min-h-screen bg-gray-50 py-10 px-6">

            <div className="max-w-4xl mx-auto">

                {/* Back Button */}

                <button
                    onClick={() => navigate("/properties")}
                    className="text-blue-600 font-medium mb-6 hover:text-blue-800"
                >
                    ← Back to Properties
                </button>

                {/* Main Card */}

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                    {/* Header */}

                    <div className="bg-blue-600 text-white p-8">

                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                            <div>

                                <p className="text-blue-200 uppercase text-sm">
                                    {property.type}
                                </p>

                                <h1 className="text-4xl font-bold mt-2">
                                    {property.name}
                                </h1>

                                <p className="mt-3 text-blue-100">
                                    📍 {property.location}
                                </p>

                            </div>

                            <span className="bg-white/20 px-5 py-2 rounded-full capitalize">
                                {property.gender}
                            </span>

                        </div>

                    </div>

                    {/* Content */}

                    <div className="p-8">

                        {/* Description */}

                        <div>

                            <h2 className="text-2xl font-bold">
                                About This Property
                            </h2>

                            <p className="text-gray-600 mt-3 leading-relaxed">
                                {property.description}
                            </p>

                        </div>

                        {/* Information */}

                        <div className="grid sm:grid-cols-2 gap-5 mt-8">

                            <div className="bg-gray-50 p-5 rounded-xl">
                                <p className="text-sm text-gray-500">
                                    Monthly Rent
                                </p>

                                <p className="text-2xl font-bold mt-1">
                                    ₹{property.rent}
                                </p>
                            </div>

                            <div className="bg-green-50 p-5 rounded-xl">
                                <p className="text-sm text-gray-500">
                                    Available Beds
                                </p>

                                <p className="text-2xl font-bold text-green-600 mt-1">
                                    {property.available_beds}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-xl">
                                <p className="text-sm text-gray-500">
                                    Total Beds
                                </p>

                                <p className="text-xl font-bold mt-1">
                                    {property.total_beds}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-xl">
                                <p className="text-sm text-gray-500">
                                    Property Type
                                </p>

                                <p className="text-xl font-bold uppercase mt-1">
                                    {property.type}
                                </p>
                            </div>

                        </div>

                        {/* Address */}

                        <div className="mt-8">

                            <h2 className="text-xl font-bold">
                                Address
                            </h2>

                            <div className="bg-gray-50 p-5 rounded-xl mt-3">

                                <p className="text-gray-700">
                                    📍 {property.address}
                                </p>

                            </div>

                        </div>

                        {/* Contact */}

                        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">

                            <h2 className="text-xl font-bold text-green-800">
                                Contact Owner
                            </h2>

                            <p className="text-gray-700 mt-2">
                                Phone: <strong>{property.contact}</strong>
                            </p>

                            <a
                                href={`tel:${property.contact}`}
                                className="inline-block mt-4 bg-green-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                            >
                                📞 Call Owner
                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default PropertyDetails;