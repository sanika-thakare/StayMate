import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

    useEffect(() => {

        const handleStorageChange = () => {
            setUser(JSON.parse(localStorage.getItem("user")));
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener(
                "storage",
                handleStorageChange
            );
        };

    }, []);

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);

        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md">

            <div className="max-w-7xl mx-auto px-6 py-4">

                <div className="flex justify-between items-center">

                    {/* Logo */}

                    <Link
                        to="/"
                        className="text-2xl font-bold text-blue-600"
                    >
                        StayMate
                    </Link>

                    {/* Navigation */}

                <div className="flex items-center gap-3">

    <Link
        to="/"
        className="hidden sm:block text-gray-700 hover:text-blue-600"
    >
        Home
    </Link>

    <Link
        to="/properties"
        className="hidden sm:block text-gray-700 hover:text-blue-600"
    >
        Properties
    </Link>

    {user?.role === "owner" && (
        <Link
            to="/owner-dashboard"
            className="hidden md:block text-gray-700 hover:text-blue-600"
        >
            Dashboard
        </Link>
    )}

    {!user ? (

        <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
            Login
        </Link>

    ) : (

        <>

            <span className="hidden md:block text-gray-600">
                Hi, {user.name}
            </span>

            <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
                Logout
            </button>

        </>

    )}

</div>
                </div>

            </div>

        </nav>
    );
}

export default Navbar;