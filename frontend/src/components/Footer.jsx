function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-auto">

            <div className="max-w-7xl mx-auto px-6 py-10">

                <div className="grid md:grid-cols-3 gap-8">

                    <div>
                        <h2 className="text-2xl font-bold text-blue-400">
                            StayMate
                        </h2>

                        <p className="text-gray-400 mt-3">
                            A student accommodation platform that
                            helps students find PGs, hostels and
                            private rooms near their college.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-2 mt-3">
                            <a
                                href="/"
                                className="text-gray-400 hover:text-white"
                            >
                                Home
                            </a>

                            <a
                                href="/properties"
                                className="text-gray-400 hover:text-white"
                            >
                                Properties
                            </a>

                            <a
                                href="/login"
                                className="text-gray-400 hover:text-white"
                            >
                                Login
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg">
                            StayMate
                        </h3>

                        <p className="text-gray-400 mt-3">
                            Find a place that feels like home.
                        </p>
                    </div>

                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center">

                    <p className="text-gray-400">
                        © 2026 StayMate. All rights reserved.
                    </p>

                </div>

            </div>

        </footer>
    );
}

export default Footer;