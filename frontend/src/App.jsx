import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InvalidPage from "./components/InvalidPage";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />
          {/* Fallback */}
          <Route
            path="*"
            element={
              <InvalidPage
                errorText="Unfortunately, this page does not exist."
                redirectPath="/"
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

