import {
  Navbar,
  NavbarCollapse,
  NavbarLink,
  Dropdown,
  DropdownItem,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    name: "Home",
    path: "/home",
    subItems: [],
  },
  {
    name: "File",
    path: '/file',
    subItems: [
      { name: "Categories", path: "/categories" },
      { name: "Gemini", path: "/gemini" },
      { name: "Preference", path: "/preference" },
    ],
  },
  {
    name: "Settings",
    path: "/settings",
    subItems: [],
  },
  {
    name: "More",
    path: '/more',
    subItems: [
      { name: "About", path: "/about" },
      { name: "Help", path: "/help" },
      { name: "Support Us", path: "/support-us" },
    ],
  },
];

export default function AppNavbar() {
  const location = useLocation();

  return (
    <Navbar
      fluid
      rounded
      className="bg-gray-900 border-b border-gray-700 py-1 gap-0"
    >
      <NavbarCollapse>
        {navItems.map((item) =>
          item.subItems.length > 0 ? (
            <Dropdown key={item.name} label={item.name} inline>
              {item.subItems.map((sub) => (
                <DropdownItem key={sub.name} as={Link} to={sub.path}>
                  {sub.name}
                </DropdownItem>
              ))}
            </Dropdown>
          ) : (
            <NavbarLink
              key={item.name}
              as={Link}
              active={location.pathname === item.path}
            >
              <Link to={item.path}>{item.name}</Link>
            </NavbarLink>
          )
        )}
      </NavbarCollapse>
    </Navbar>
  );
}
