import { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/AppNavbar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Categories from "./pages/Categories";
import Category from "./pages/Category";

function App() {
  useEffect(() => {
    // Force dark mode on mount
    document.documentElement.classList.add("dark");

    // Disable right-click
    const disableContextMenu = (e: MouseEvent) => e.preventDefault();
    window.addEventListener("contextmenu", disableContextMenu);

    return () => {
      window.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  return (
    <main className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors">
      <Router>
        <div className="h-screen flex flex-col">
          <Navbar />
          <div className="flex-1 p-2">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:id" element={<Category />} />
            </Routes>
          </div>
        </div>
      </Router>
    </main>
  );
}

export default App;
