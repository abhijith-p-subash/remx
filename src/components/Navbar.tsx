import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

export default function Navbar() {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const navItems = [
    { name: "Home", path: "/" },
    {
      name: "Files",
      path: "/",
      subItems: [
        { name: "Categories", path: "/categories" },
        { name: "Gemini", path: "/gemini" },
        { name: "Preference", path: "/preference" },
      ],
    },
    { name: "Settings", path: "/settings" },
    {
      name: "More",
      path: "/more",
      subItems: [
        { name: "About", path: "/about" },
        { name: "Help", path: "/help" },
        { name: "Support Us", path: "/support-us" },
      ],
    },
  ];

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedInside = Object.values(dropdownRefs.current).some(
        (ref) => ref && ref.contains(event.target as Node)
      );
      if (!clickedInside) setOpenDropdown(null);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="text-white border-b border-gray-700 px-3 py-2 bg-gray-900">
      <div className="flex items-center">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            item.subItems?.some((s) => s.path === location.pathname);

          if (item.subItems) {
            return (
              <div
                key={item.name}
                className="relative"
                ref={(el) => (dropdownRefs.current[item.name] = el)}
              >
                <button
                  onClick={() =>
                    setOpenDropdown((prev) =>
                      prev === item.name ? null : item.name
                    )
                  }
                  className={clsx(
                    "px-2 py-1 rounded-sm text-sm font-medium",
                    isActive
                      ? "text-green-400"
                      : "text-gray-300 hover:text-green-300"
                  )}
                >
                  {item.name} ▾
                </button>
                {openDropdown === item.name && (
                  <div className="absolute mt-2 w-44 bg-gray-800 border border-gray-600 rounded-md shadow z-50">
                    <ul className="text-sm text-gray-200">
                      {item.subItems.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            to={sub.path}
                            className={clsx(
                              "block px-4 py-2 transition",
                              location.pathname === sub.path
                                ? "bg-green-700 text-white"
                                : "hover:bg-green-700 hover:text-white"
                            )}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.path}
              className={clsx(
                "px-2 py-1 text-sm font-medium rounded-sm transition",
                isActive
                  ? "text-green-400"
                  : "text-gray-300 hover:text-green-300"
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
