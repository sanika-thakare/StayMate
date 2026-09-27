import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            console.log("Login successful:", data);

            // Save token
            localStorage.setItem("token", data.token);

            // Save user information
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );
            window.dispatchEvent(new Event("storage"));

            alert("Login successful!");

if (data.user.role === "owner") {
    navigate("/owner-dashboard");
} else {
    navigate("/properties");
}

        } catch (error) {

            console.error("Login error:", error);

            alert("Something went wrong. Please try again.");

        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-50">

            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Login to StayMate
                </h1>

                <form onSubmit={handleLogin}>

                    {/* Email */}

                    <div className="mb-4">

                        <label className="block mb-2 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            required
                        />

                    </div>


                    {/* Password */}

                    <div className="mb-6">

                        <label className="block mb-2 font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            required
                        />

                    </div>


                    {/* Login button */}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>

    );
}

export default Login;