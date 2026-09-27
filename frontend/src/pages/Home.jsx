import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen">

            {/* Hero Section */}

            <section className="bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-6 py-24">

                    <div className="max-w-3xl">

                        <p className="text-blue-200 text-lg font-medium mb-3">
                            Welcome to StayMate
                        </p>

                        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                            Find Your Perfect
                            <br />
                            Student Accommodation
                        </h1>

                        <p className="text-xl text-blue-100 mt-6 max-w-2xl">
                            Discover PGs, hostels and private rooms
                            near your college. Find a comfortable,
                            affordable and convenient place to stay.
                        </p>

                        <div className="flex gap-4 mt-8">

                            <button
                                onClick={() => navigate("/properties")}
                                className="bg-white text-blue-600 px-7 py-3 rounded-lg font-semibold hover:bg-gray-100"
                            >
                                Find Accommodation
                            </button>

                            <button
                                onClick={() => navigate("/login")}
                                className="border border-white px-7 py-3 rounded-lg font-semibold hover:bg-blue-700"
                            >
                                Get Started
                            </button>

                        </div>

                    </div>

                </div>
            </section>


            {/* Features */}

            <section className="py-16 bg-gray-50">

                <div className="max-w-7xl mx-auto px-6">

                    <h2 className="text-3xl font-bold text-center">
                        Why Choose StayMate?
                    </h2>

                    <p className="text-center text-gray-600 mt-3">
                        Everything you need to find your next home.
                    </p>


                    <div className="grid md:grid-cols-3 gap-8 mt-10">

                        <div className="bg-white p-8 rounded-xl shadow text-center">

                            <div className="text-4xl mb-4">
                                🔍
                            </div>

                            <h3 className="text-xl font-bold">
                                Easy Search
                            </h3>

                            <p className="text-gray-600 mt-3">
                                Search accommodations by location,
                                property type, gender and budget.
                            </p>

                        </div>


                        <div className="bg-white p-8 rounded-xl shadow text-center">

                            <div className="text-4xl mb-4">
                                🏠
                            </div>

                            <h3 className="text-xl font-bold">
                                Multiple Options
                            </h3>

                            <p className="text-gray-600 mt-3">
                                Explore PGs, hostels and private rooms
                                according to your requirements.
                            </p>

                        </div>


                        <div className="bg-white p-8 rounded-xl shadow text-center">

                            <div className="text-4xl mb-4">
                                📞
                            </div>

                            <h3 className="text-xl font-bold">
                                Contact Owners
                            </h3>

                            <p className="text-gray-600 mt-3">
                                View property details and directly
                                contact the property owner.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* How It Works */}

            <section className="py-16 bg-white">

                <div className="max-w-7xl mx-auto px-6">

                    <h2 className="text-3xl font-bold text-center">
                        How StayMate Works
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8 mt-10">

                        <div className="text-center">

                            <div className="text-3xl font-bold text-blue-600">
                                01
                            </div>

                            <h3 className="text-xl font-semibold mt-3">
                                Search
                            </h3>

                            <p className="text-gray-600 mt-2">
                                Enter your preferred location
                                and accommodation requirements.
                            </p>

                        </div>


                        <div className="text-center">

                            <div className="text-3xl font-bold text-blue-600">
                                02
                            </div>

                            <h3 className="text-xl font-semibold mt-3">
                                Compare
                            </h3>

                            <p className="text-gray-600 mt-2">
                                Compare available properties,
                                rent and facilities.
                            </p>

                        </div>


                        <div className="text-center">

                            <div className="text-3xl font-bold text-blue-600">
                                03
                            </div>

                            <h3 className="text-xl font-semibold mt-3">
                                Contact
                            </h3>

                            <p className="text-gray-600 mt-2">
                                View property details and
                                contact the owner directly.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* CTA */}

            <section className="bg-gray-900 text-white py-16">

                <div className="max-w-4xl mx-auto text-center px-6">

                    <h2 className="text-3xl md:text-4xl font-bold">
                        Looking for a place to stay?
                    </h2>

                    <p className="text-gray-300 mt-4">
                        Find student-friendly accommodation near
                        your college with StayMate.
                    </p>

                    <button
                        onClick={() => navigate("/properties")}
                        className="mt-7 bg-blue-600 px-7 py-3 rounded-lg font-semibold hover:bg-blue-700"
                    >
                        Explore Properties
                    </button>

                </div>

            </section>

        </div>
    );
}

export default Home;