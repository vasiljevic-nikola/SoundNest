import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlineUserGroup,
  HiOutlineHeart,
} from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";

import { logo } from "../assets";

// Navigation links
const links = [
  { name: "Discover", to: "/", icon: HiOutlineHome },
  { name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },
  { name: "Top Charts", to: "/top-charts", icon: HiOutlineHashtag },
  { name: "Favorites", to: "/favorites", icon: HiOutlineHeart },
];

const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400 transition-colors duration-200"
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624] min-h-screen">
        <img
          src={logo}
          alt="logo"
          className="w-full h-20 object-contain mb-4"
        />
        <NavLinks />
      </div>

      {/* Mobile hamburger menu button */}
      <div className="absolute md:hidden block top-6 right-3 z-20">
        {!mobileMenuOpen ? (
          <HiOutlineMenu
            className="w-7 h-7 text-white cursor-pointer hover:text-cyan-400 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(true)}
          />
        ) : (
          <RiCloseLine
            className="w-7 h-7 text-white cursor-pointer hover:text-cyan-400 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 h-screen w-4/5 max-w-xs bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-20 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img
          src={logo}
          alt="logo"
          className="w-full h-16 object-contain mb-4"
        />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
