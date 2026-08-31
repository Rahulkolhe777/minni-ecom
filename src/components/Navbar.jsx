import React, { useContext, useState } from "react";
import { ShoppingCart, LogOut, Zap, Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Auth } from "../context/Auth";

const Navbar = () => {
  const navigate = useNavigate();
  const { setLoggedInUser, setIsCartOpen, cartItems, loggedInUser } =
    useContext(Auth);
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Derive user initial from name or email
  const userInitial = loggedInUser?.name
    ? loggedInUser.name[0].toUpperCase()
    : loggedInUser?.email
    ? loggedInUser.email[0].toUpperCase()
    : "U";

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    toast.warn("Logged out successfully");
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `font-semibold transition-colors duration-200 ${
      isActive ? "text-[#c6ff00]" : "text-zinc-500 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-40 border-b border-zinc-800 bg-[#0d0d0d]/95 backdrop-blur-md">
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

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          <NavLink to="/main" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/main/shop" className={navLinkClass}>
            Shop
          </NavLink>
          <NavLink to="/main/about" className={navLinkClass}>
            About
          </NavLink>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">

          {/* Profile avatar */}
          <button className="hidden sm:flex h-12 items-center gap-2 rounded-2xl border border-zinc-800 bg-[#111] px-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#c6ff00] text-sm font-bold text-black">
              {userInitial}
            </span>
            <span className="text-sm font-medium text-zinc-400 max-w-[80px] truncate">
              {loggedInUser?.name || loggedInUser?.email?.split("@")[0] || "User"}
            </span>
          </button>

          {/* Cart with badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-[#111] text-zinc-400 transition-all duration-200 hover:border-[#c6ff00] hover:text-white"
          >
            <ShoppingCart size={21} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c6ff00] text-[10px] font-bold text-black">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-[#111] text-zinc-400 transition-all duration-200 hover:border-zinc-600 hover:text-white"
          >
            <LogOut size={20} />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-[#111] text-zinc-400 transition hover:text-white md:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-zinc-800 bg-[#0d0d0d] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <NavLink
              to="/main"
              end
              className={navLinkClass}
              onClick={() => setMobileOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/main/shop"
              className={navLinkClass}
              onClick={() => setMobileOpen(false)}
            >
              Shop
            </NavLink>
            <NavLink
              to="/main/about"
              className={navLinkClass}
              onClick={() => setMobileOpen(false)}
            >
              About
            </NavLink>
            <hr className="border-zinc-800" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-red-400 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
