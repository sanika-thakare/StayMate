import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Properties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);

    const [location, setLocation] = useState("");
    const [type, setType] = useState("");
    const [gender, setGender] = useState("");
    const [maxRent, setMaxRent] = useState("");

    const navigate = useNavigate();

    const fetchProperties = async () => {
        setLoading(true);

        try {
            const params = new URLSearchParams();

            if (location.trim()) {
                params.append("location", location.trim());
            }

            if (type) {
                params.append("type", type);
            }

            if (gender) {
                params.append("gender", gender);
            }

            if (maxRent) {
                params.append("maxRent", maxRent);
            }

            const url =
                `http://localhost:5000/api/properties?${params.toString()}`;

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Failed to fetch properties");
                return;
            }

            setProperties(data.properties || []);

        } catch (error) {
            console.error("Error:", error);
            alert("Unable to connect to server.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProperties();
    };

    const clearFilters = () => {
        setLocation("");
        setType("");
        setGender("");
        setMaxRent("");
        fetchAllProperties();
    };

    const fetchAllProperties = async () => {
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/properties"
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            setProperties(data.properties || []);

        } catch (error) {
            console.error("Error:", error);
            alert("Unable to connect to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <section className="bg-blue-600 text-white py-12">
                <div className="max-w-7xl mx-auto px-6">

                    <h1 className="text-4xl font-bold">
                        Find Your Accommodation
                    </h1>

                    <p className="text-blue-100 mt-3">
                        Find comfortable and affordable accommodation
                        near your college.
                    </p>

                </div>
            </section>

            {/* Search */}
            <div className="max-w-7xl mx-auto px-6 -mt-6">

                <form
                    onSubmit={handleSearch}
                    className="bg-white p-6 rounded-2xl shadow-lg"
                >

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                        <input
                            type="text"
                            placeholder="📍 Search location"
                            value={location}
                            onChange={(e) =>
                                setLocation(e.target.value)
                            }
                            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <select
                            value={type}
                            onChange={(e) =>
                                setType(e.target.value)
                            }
                            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Types</option>
                            <option value="pg">PG</option>
                            <option value="hostel">Hostel</option>
                            <option value="private_room">
                                Private Room
                            </option>
                        </select>

                        <select
                            value={gender}
                            onChange={(e) =>
                                setGender(e.target.value)
                            }
                            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Gender</option>
                            <option value="girls">Girls</option>
                            <option value="boys">Boys</option>
                            <option value="unisex">Unisex</option>
                        </select>

                        <input
                            type="number"
                            placeholder="Maximum rent"
                            value={maxRent}
                            onChange={(e) =>
                                setMaxRent(e.target.value)
                            }
                            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <div className="flex gap-3 mt-5">

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            🔍 Search
                        </button>

                        <button
                            type="button"
                            onClick={clearFilters}
                            className="bg-gray-200 text-gray-700 px-7 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                        >
                            Clear
                        </button>

                    </div>

                </form>

            </div>

            {/* Properties */}
            <section className="max-w-7xl mx-auto px-6 py-12">

                <div className="flex justify-between items-center mb-6">

                    <div>
                        <h2 className="text-2xl font-bold">
                            Available Properties
                        </h2>

                        <p className="text-gray-500 mt-1">
                            {properties.length} properties found
                        </p>
                    </div>

                </div>

                {loading ? (

                    <div className="flex justify-center py-16">
                        <p className="text-gray-500 text-lg">
                            Loading properties...
                        </p>
                    </div>

                ) : properties.length === 0 ? (

                    <div className="bg-white rounded-2xl shadow p-12 text-center">

                        <div className="text-5xl mb-4">
                            🏠
                        </div>

                        <h3 className="text-xl font-bold">
                            No properties found
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Try changing your search or filter.
                        </p>

                    </div>

                ) : (

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {properties.map((property) => (

                            <div
                                key={property.id}
                                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
                            >

                                {/* Card Header */}
                                <div className="bg-blue-600 text-white p-6">

                                    <div className="flex justify-between items-start">

                                        <div>
                                            <p className="text-blue-200 text-sm uppercase">
                                                {property.type}
                                            </p>

                                            <h3 className="text-2xl font-bold mt-1">
                                                {property.name}
                                            </h3>
                                        </div>

                                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                            {property.gender}
                                        </span>

                                    </div>

                                    <p className="mt-4 text-blue-100">
                                        📍 {property.location}
                                    </p>

                                </div>

                                {/* Card Body */}
                                <div className="p-6">

                                    <div className="flex justify-between items-center">

                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Monthly Rent
                                            </p>

                                            <p className="text-2xl font-bold text-gray-900">
                                                ₹{property.rent}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">
                                                Availability
                                            </p>

                                            <p className="font-semibold text-green-600">
                                                {property.available_beds} beds
                                            </p>
                                        </div>

                                    </div>

                                    <p className="text-gray-600 mt-5 line-clamp-2">
                                        {property.description}
                                    </p>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/property/${property.id}`
                                            )
                                        }
                                        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                                    >
                                        View Details →
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </div>
    );
}

export default Properties;