import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Settings", path: "/settings" },
  ];

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="text-white border-b border-gray-700 px-2 py-2">
      <div className="flex justify-start gap-4 items-center">
        {/* Main nav links */}
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={clsx(
              "px-1 rounded-sm transition-colors duration-200",
              location.pathname === item.path
                ? "text-green-500"
                : "text-gray-300 hover:text-green-200"
            )}
          >
            {item.name}
          </Link>
        ))}

        {/* Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-gray-300 hover:text-green-200 px-1 rounded-sm transition-colors duration-200"
          >
            More ▾
          </button>

          {dropdownOpen && (
            <div className="absolute mt-1 left-0 bg-gray-800 border border-gray-600 rounded-md shadow-md z-50 min-w-[140px]">
              <ul className="text-sm text-gray-200">
                <li>
                  <Link
                    to="/about"
                    className="block px-4 py-2 hover:bg-green-700 hover:text-white transition"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/help"
                    className="block px-4 py-2 hover:bg-green-700 hover:text-white transition"
                  >
                    Help
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => alert("Sign out")}
                    className="w-full text-left px-4 py-2 hover:bg-green-700 hover:text-white transition"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
