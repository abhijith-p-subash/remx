import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow-md flex items-center justify-between">
      <div className="text-lg font-semibold">🔍 MyApp</div>
      <div className="flex space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={clsx(
              "hover:text-blue-400",
              location.pathname === item.path && "text-blue-400"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
