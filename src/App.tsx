import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Categories from "./pages/Categories";

function App() {
  useEffect(() => {
    const disableContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener("contextmenu", disableContextMenu);
    return () => {
      window.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  return (
    <main className=" bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <Router>
        <div className="h-screen flex flex-col ">
          <Navbar />
          <div className="flex-1 p-2">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </div>
        </div>
      </Router>
    </main>
  );
}

export default App;
