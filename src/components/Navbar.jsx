import React, { useContext, useState, useEffect } from "react";
import { ShoppingCart, LogOut, Zap, Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Auth } from "../context/Auth";

const Navbar = () => {
  const navigate = useNavigate();
  const { setLoggedInUser, setIsCartOpen, cartItems, loggedInUser } =
    useContext(Auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [badgeBouncing, setBadgeBouncing] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Bounce animation when cartCount changes
  useEffect(() => {
    if (cartCount > 0) {
      setBadgeBouncing(true);
      const timer = setTimeout(() => setBadgeBouncing(false), 350);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // Derive user initial from name or email
  const userInitial = loggedInUser?.name
    ? loggedInUser.name[0].toUpperCase()
    : loggedInUser?.email
    ? loggedInUser.email[0].toUpperCase()
    : "U";

  const displayName = loggedInUser?.name || loggedInUser?.email?.split("@")[0] || "User";

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    toast.warn("Logged out successfully");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-[#0a0a0a]/85 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div
          onClick={() => navigate("/main")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c6ff00] text-black shadow-[0_0_15px_rgba(198,255,0,0.3)] transition-transform duration-300 group-hover:scale-105">
            <Zap size={21} className="fill-current" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white font-display">
            Sky<span className="text-[#c6ff00]">Mart</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {[
            { to: "/main", label: "Home", end: true },
            { to: "/main/shop", label: "Shop", end: false },
            { to: "/main/about", label: "About", end: false },
          ].map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `relative py-2 text-sm font-semibold tracking-wide transition-colors duration-200 group ${
                  isActive ? "text-[#c6ff00]" : "text-zinc-400 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 w-full bg-[#c6ff00] transition-all duration-300 rounded-full ${
                      isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Profile avatar */}
          <div className="hidden sm:flex h-11 items-center gap-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/60 px-3.5 backdrop-blur-sm">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#c6ff00] text-xs font-bold text-black font-display">
              {userInitial}
            </span>
            <span className="text-xs font-semibold text-zinc-300 max-w-[90px] truncate" title={displayName}>
              {displayName}
            </span>
          </div>

          {/* Cart with badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Open shopping cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800/80 bg-zinc-900/60 text-zinc-300 transition-all duration-200 hover:border-[#c6ff00]/60 hover:text-[#c6ff00] hover:shadow-[0_0_15px_rgba(198,255,0,0.15)] active:scale-95 cursor-pointer"
          >
            <ShoppingCart size={19} />
            {cartCount > 0 && (
              <span
                className={`absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#c6ff00] px-1 text-[10px] font-bold text-black shadow-md ${
                  badgeBouncing ? "animate-badge-bounce" : ""
                }`}
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            title="Logout"
            aria-label="Logout"
            className="hidden sm:flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800/80 bg-zinc-900/60 text-zinc-400 transition-all duration-200 hover:border-rose-500/40 hover:text-rose-400 hover:bg-rose-500/10 active:scale-95 cursor-pointer"
          >
            <LogOut size={18} />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800/80 bg-zinc-900/60 text-zinc-300 transition-colors hover:text-white md:hidden cursor-pointer"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-zinc-800/80 bg-[#0d0d0d]/95 backdrop-blur-xl px-6 py-5 md:hidden animate-fade-in">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 pb-3 border-b border-zinc-800/80">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c6ff00] text-sm font-bold text-black font-display">
                {userInitial}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{displayName}</p>
                <p className="text-xs text-zinc-500 truncate">{loggedInUser?.email}</p>
              </div>
            </div>

            {[
              { to: "/main", label: "Home", end: true },
              { to: "/main/shop", label: "Shop", end: false },
              { to: "/main/about", label: "About", end: false },
            ].map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between py-2 text-base font-semibold transition-colors ${
                    isActive ? "text-[#c6ff00]" : "text-zinc-400 hover:text-white"
                  }`
                }
              >
                <span>{label}</span>
                <span className="text-xs text-zinc-600">→</span>
              </NavLink>
            ))}

            <div className="pt-2 border-t border-zinc-800/80">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-2.5 text-sm font-semibold text-rose-400 hover:text-rose-300 transition w-full py-2"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
