import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvalidPage from "./components/InvalidPage";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div>
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

