import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import "../src/components/Loader.css";

function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDataLoaded(true);
    }, 4007);
  }, []);
  return (
    <>
      <AuthContextProvider>
        {dataLoaded && <Navbar className={dataLoaded ? "" : "hide-navbar"} />}{" "}
        {/* Show Navbar when data is loaded */}
        <Routes>
          {dataLoaded ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
            </>
          ) : (
            <Route path="/" element={<Loader />} />
          )}
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
