import React, { useContext, useState } from "react";
import { ShoppingCart, LogOut, Zap } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Auth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(Auth);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    toast.warn("loggedout sucess ");
    navigate("/");
  };
  const [isActive, setIsActive] = useState(true)

  return (
    <nav className="border-b border-zinc-800 bg-[#0d0d0d]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c6ff00] text-black">
            <Zap size={21} fill="currentColor" />
          </div>

          <h1 className="text-xl font-bold text-white">
            Sky<span className="text-[#c6ff00]">Mart</span>
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-10">

          <NavLink
            to="/main"
            className={({ isActive }) =>
              `font-semibold transition-colors duration-200 ${
                isActive
                  ? "text-[#c6ff00]"
                  : "text-zinc-500 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `font-semibold transition-colors duration-200 ${
                isActive
                  ? "text-[#c6ff00]"
                  : "text-zinc-500 hover:text-white"
              }`
            }
          >
            Shop
          </NavLink>

          <NavLink
            to="about"
            className={({ isActive }) =>
              `font-semibold transition-colors duration-200 ${
                isActive
                  ? "text-[#c6ff00]"
                  : "text-zinc-500 hover:text-white"
              }`
            }
          >
            About
          </NavLink>

        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">

          {/* Profile */}
          <button className="flex h-12 items-center gap-2 rounded-2xl border border-zinc-800 bg-[#111] px-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#c6ff00] text-sm font-bold text-black">
              R
            </span>

            <span className="text-sm font-medium text-zinc-400">
              R
            </span>
          </button>

          {/* Cart */}
          <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-[#111] text-zinc-400 transition-all duration-200 hover:border-[#c6ff00] hover:text-white">
            <ShoppingCart size={21} />
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-[#111] text-zinc-400 transition-all duration-200 hover:border-zinc-600 hover:text-white"
          >
            <LogOut size={20} />
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;