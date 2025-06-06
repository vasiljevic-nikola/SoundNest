import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";

import { logo } from "../assets";
import { links } from "../assets/constants";

const NavLinks = ({ handleClick }) => {
  return (
    <div className="mt-10">
      {links.map((item) => (
        <NavLink
          key={item.name}
          to={item.to}
          className={({ isActive }) =>
            isActive
              ? "flex flex-row justify-start items-center my-8 text-sm font-medium text-cyan-400"
              : "flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
          }
          onClick={() => handleClick && handleClick()}
        >
          <item.icon className="w-6 h-6 mr-2" />
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

const Sidebar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <div className="flex justify-center items-center bg-[#191624]">
          <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        </div>
        <NavLinks />
      </div>

      {/* Mobilni hamburger meni */}
      {mobileMenuOpen && (
        <>
          {/* Overlay za zatvaranje menija klikom izvan njega */}
          <div
            className="absolute top-0 left-0 w-full h-screen bg-black/50 backdrop-blur-sm md:hidden z-[5]"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Mobilni meni */}
          <div className="absolute top-0 left-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition slide-in">
            <div className="flex items-center justify-between">
              <img
                src={logo}
                alt="logo"
                className="w-[120px] h-14 object-contain"
              />
              <RiCloseLine
                className="w-6 h-6 text-white cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              />
            </div>
            <NavLinks handleClick={() => setMobileMenuOpen(false)} />
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
