import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <nav className=" text-white border-b border-gray-700 px-2 py-2">
      <div className="flex justify-start">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={clsx(
              "px-1 rounded-sm transition-colors duration-200",
              location.pathname === item.path
                ? " text-green-500"
                : "text-gray-300 hover:text-white hover:bg-green-800 hover:bg-opacity-40"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
