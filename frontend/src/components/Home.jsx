import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4">
          <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-4">
            Welcome Home
          </h2>
          <p className="text-center text-xl text-gray-900 mb-4">
            Hello, {user.username}!
          </p>
          <p className="text-center text-sm text-gray-600 mb-8">
            We're glad to see you here.
          </p>
          <div className="flex items-center justify-center">
            <button
              onClick={handleLogout}
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
