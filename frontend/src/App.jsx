import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Login from "./pages/Login";
import OwnerDashboard from "./pages/OwnerDashboard";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";
import PropertyDetails from "./pages/PropertyDetails";

function App() {

    return (

        <BrowserRouter>

            <div className="min-h-screen bg-gray-50 flex flex-col">

                <Navbar />

                <main className="flex-grow">

                    <Routes>

                        <Route
                            path="/"
                            element={<Home />}
                        />

                        <Route
                            path="/properties"
                            element={<Properties />}
                        />

                        <Route
                            path="/login"
                            element={<Login />}
                        />

                        <Route
                            path="/property/:id"
                            element={<PropertyDetails />}
                        />

                        <Route
                            path="/owner-dashboard"
                            element={
                                <ProtectedRoute role="owner">
                                    <OwnerDashboard />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/add-property"
                            element={
                                <ProtectedRoute role="owner">
                                    <AddProperty />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/edit-property/:id"
                            element={
                                <ProtectedRoute role="owner">
                                    <EditProperty />
                                </ProtectedRoute>
                            }
                        />

                    </Routes>

                </main>

                <Footer />

            </div>

        </BrowserRouter>
    );
}

export default App;