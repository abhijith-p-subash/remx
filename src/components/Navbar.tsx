import {
  Navbar,
  // NavbarToggle,
  NavbarCollapse,
  NavbarLink,
  Dropdown,
  // DropdownHeader,
  DropdownItem,
  // DropdownDivider,
  // Avatar,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

export default function AppNavbar() {
  const location = useLocation();

  return (
    <Navbar
      fluid
      rounded
      className="bg-gray-900 border-b border-gray-700 py-1 gap-0"
    >
      {/* <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar rounded alt="user" img="/avatar.png" />}
        >
          <DropdownHeader>
            <span className="block text-sm">Dev User</span>
            <span className="block truncate text-sm font-medium">
              user@dev.com
            </span>
          </DropdownHeader>
          <DropdownItem as={Link} to="/settings">
            Settings
          </DropdownItem>
          <DropdownItem as={Link} to="/about">
            About
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem>Sign out</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div> */}

      <NavbarCollapse>
        <NavbarLink active={location.pathname === "/"}>
          <Link to={"/"}>Home</Link>
        </NavbarLink>
        <Dropdown label="Files" inline>
          <DropdownItem as={Link} to="/categories">
            Categories
          </DropdownItem>
          <DropdownItem as={Link} to="/">
            Home
          </DropdownItem>
          <DropdownItem as={Link} to="/preference">
            Preference
          </DropdownItem>
        </Dropdown>
        <NavbarLink as={Link} active={location.pathname === "/settings"}>
          Settings
        </NavbarLink>
        <Dropdown label="More" inline>
          <DropdownItem as={Link} to="/help">
            Help
          </DropdownItem>
          <DropdownItem as={Link} to="/support-us">
            Support Us
          </DropdownItem>
        </Dropdown>
      </NavbarCollapse>
    </Navbar>
  );
}
