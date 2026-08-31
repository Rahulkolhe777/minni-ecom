import React from "react";
import { useAuthHook } from "../hooks/useAuthHook";
import { Mail, Lock, User, ArrowRight, Zap, Star, Users, Package } from "lucide-react";

const RegisterPage = () => {
  const {
    handleSubmit,
    register,
    registerFormSubmit,
    navigate,
    errors,
  } = useAuthHook();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* LEFT SECTION (Brand Panel - matching LoginPage) */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 xl:p-16 border-r border-zinc-800/80 relative overflow-hidden bg-gradient-to-b from-[#0e1208] via-[#0d0d0d] to-[#0a0a0a]">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-[#c6ff00]/10 blur-[130px]" />
        <div className="pointer-events-none absolute right-0 bottom-10 h-80 w-80 rounded-full bg-[#c6ff00]/5 blur-[100px]" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#c6ff00] text-black shadow-[0_0_20px_rgba(198,255,0,0.3)]">
            <Zap size={22} className="fill-current" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-display">
            Sky<span className="text-[#c6ff00]">Mart</span>
          </h1>
        </div>

        {/* Hero Copy */}
        <div className="relative max-w-lg my-auto py-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c6ff00]/30 bg-[#c6ff00]/10 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c6ff00] animate-pulse" />
            <span className="text-[#c6ff00] text-xs font-bold tracking-widest uppercase">
              Get Started
            </span>
          </div>

          <h2 className="text-4xl xl:text-5xl font-extrabold leading-[1.1] tracking-tight font-display">
            Join the future of
            <br />
            <span className="text-[#c6ff00] drop-shadow-[0_0_25px_rgba(198,255,0,0.2)]">shopping.</span>
          </h2>

          <p className="mt-6 text-base text-zinc-400 leading-relaxed">
            Create an account in seconds. Enjoy personalized deals, real-time order tracking, and lightning-fast delivery.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="relative grid grid-cols-3 gap-4 max-w-xl">
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm p-4 text-center transition hover:border-[#c6ff00]/30">
            <div className="flex items-center justify-center text-[#c6ff00] mb-1">
              <Package size={18} />
            </div>
            <span className="text-[#c6ff00] text-xl font-bold font-display">20K+</span>
            <span className="block text-zinc-400 text-xs mt-0.5">Products</span>
          </div>

          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm p-4 text-center transition hover:border-[#c6ff00]/30">
            <div className="flex items-center justify-center text-[#c6ff00] mb-1">
              <Users size={18} />
            </div>
            <span className="text-[#c6ff00] text-xl font-bold font-display">50K+</span>
            <span className="block text-zinc-400 text-xs mt-0.5">Happy Users</span>
          </div>

          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm p-4 text-center transition hover:border-[#c6ff00]/30">
            <div className="flex items-center justify-center text-[#c6ff00] mb-1">
              <Star size={18} className="fill-current" />
            </div>
            <span className="text-[#c6ff00] text-xl font-bold font-display">4.9★</span>
            <span className="block text-zinc-400 text-xs mt-0.5">App Store Rating</span>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION (Form) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
        <div className="pointer-events-none absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-[#c6ff00]/5 blur-[120px] lg:hidden" />

        <div className="w-full max-w-md my-auto">
          {/* Mobile Logo Header */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#c6ff00] text-black shadow-[0_0_20px_rgba(198,255,0,0.3)]">
              <Zap size={22} className="fill-current" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight font-display">
              Sky<span className="text-[#c6ff00]">Mart</span>
            </h1>
          </div>

          {/* REGISTER CARD */}
          <div className="border border-zinc-800/90 rounded-3xl bg-[#121212]/90 backdrop-blur-xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <div className="mb-7">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-display">Create account</h2>
              <p className="text-zinc-400 text-sm mt-2">
                Join SkyMart and start discovering curated products
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit(registerFormSubmit)} className="space-y-4">
              {/* FULL NAME */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="flex items-center h-12 px-4 rounded-xl bg-zinc-900/90 border border-zinc-800 focus-within:border-[#c6ff00] focus-within:ring-1 focus-within:ring-[#c6ff00]/30 transition-all duration-200">
                  <User className="w-4 h-4 text-zinc-500 mr-3 shrink-0" />
                  <input
                    {...register("name", {
                      required: "Name is required",
                    })}
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-transparent outline-none text-sm text-zinc-100 placeholder:text-zinc-600"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-xs text-rose-400 pl-1">{errors.name.message}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="flex items-center h-12 px-4 rounded-xl bg-zinc-900/90 border border-zinc-800 focus-within:border-[#c6ff00] focus-within:ring-1 focus-within:ring-[#c6ff00]/30 transition-all duration-200">
                  <Mail className="w-4 h-4 text-zinc-500 mr-3 shrink-0" />
                  <input
                    {...register("email", {
                      required: "Email is required",
                    })}
                    type="email"
                    placeholder="name@example.com"
                    className="w-full bg-transparent outline-none text-sm text-zinc-100 placeholder:text-zinc-600"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-rose-400 pl-1">{errors.email.message}</p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="flex items-center h-12 px-4 rounded-xl bg-zinc-900/90 border border-zinc-800 focus-within:border-[#c6ff00] focus-within:ring-1 focus-within:ring-[#c6ff00]/30 transition-all duration-200">
                  <Lock className="w-4 h-4 text-zinc-500 mr-3 shrink-0" />
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters required",
                      },
                    })}
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-transparent outline-none text-sm text-zinc-100 placeholder:text-zinc-600"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-rose-400 pl-1">{errors.password.message}</p>
                )}
              </div>

              {/* CREATE ACCOUNT BUTTON */}
              <button
                type="submit"
                className="w-full h-12 mt-4 rounded-xl bg-[#c6ff00] text-black font-bold text-sm tracking-wide hover:bg-[#b3ea00] hover:shadow-[0_0_25px_rgba(198,255,0,0.3)] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Create Account</span>
                <ArrowRight size={16} />
              </button>
            </form>

            {/* SWITCH TO SIGN IN */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center">
              <p className="text-sm text-zinc-400">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="text-[#c6ff00] font-semibold hover:underline cursor-pointer ml-1 transition"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
