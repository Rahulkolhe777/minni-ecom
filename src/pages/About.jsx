import React from "react";
import { useNavigate } from "react-router";
import {
  Zap,
  Package,
  Users,
  Star,
  Truck,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  const team = [
    {
      name: "Aryan Shah",
      role: "Founder & CEO",
      avatarLetter: "A",
      bgClass: "bg-[#c6ff00] text-black shadow-[0_0_15px_rgba(198,255,0,0.3)]",
    },
    {
      name: "Priya Mehta",
      role: "Head of Product",
      avatarLetter: "P",
      bgClass: "bg-sky-400 text-black shadow-[0_0_15px_rgba(56,189,248,0.3)]",
    },
    {
      name: "Rohan Verma",
      role: "Lead Engineer",
      avatarLetter: "R",
      bgClass: "bg-violet-400 text-black shadow-[0_0_15px_rgba(167,139,250,0.3)]",
    },
    {
      name: "Sneha Kapoor",
      role: "Design Director",
      avatarLetter: "S",
      bgClass: "bg-rose-400 text-black shadow-[0_0_15px_rgba(251,113,133,0.3)]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 py-12 text-white pb-24">
      <div className="mx-auto max-w-7xl">
        {/* ================= HERO SECTION ================= */}
        <section className="flex flex-col items-center text-center max-w-3xl mx-auto pt-6">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c6ff00] text-black shadow-[0_0_20px_rgba(198,255,0,0.35)]">
            <Zap size={28} className="fill-current" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c6ff00]/30 bg-[#c6ff00]/10 mb-4">
            <Sparkles size={12} className="text-[#c6ff00]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#c6ff00]">
              Our Mission & Story
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-display leading-[1.1]">
            About{" "}
            <span className="text-[#c6ff00] drop-shadow-[0_0_25px_rgba(198,255,0,0.2)]">
              SkyMart
            </span>
          </h1>

          <p className="mt-6 text-base leading-relaxed text-zinc-400 sm:text-lg">
            SkyMart is a next-generation storefront built to make online shopping faster, cleaner, and delightfully intuitive — for digital natives and everyday shoppers alike.
          </p>
        </section>

        {/* ================= STATS SECTION ================= */}
        <section className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { icon: Package, value: "20K+", label: "Verified Products" },
            { icon: Users, value: "50K+", label: "Happy Customers" },
            { icon: Star, value: "4.9★", label: "Average Rating" },
            { icon: Truck, value: "99.4%", label: "On-time Delivery" },
          ].map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="rounded-2xl border border-zinc-800/90 bg-[#121212] p-6 text-center transition-all duration-300 hover:border-[#c6ff00]/40 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#c6ff00]/10 text-[#c6ff00]">
                <Icon size={22} />
              </div>
              <h3 className="text-3xl font-extrabold font-display text-white">{value}</h3>
              <p className="mt-1 text-xs font-semibold text-zinc-400 uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </section>

        {/* ================= OUR STORY ================= */}
        <section className="mt-16 rounded-3xl border border-zinc-800/90 bg-gradient-to-br from-[#121212] to-[#0d0d0d] p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-xl">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#c6ff00]/5 blur-3xl" />

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            Our Story
          </h2>

          <div className="mt-6 max-w-4xl space-y-4 leading-relaxed text-zinc-400 text-sm sm:text-base">
            <p>
              SkyMart started with a simple observation: most online storefronts are bogged down by sluggish interfaces, popups, and friction. We set out to build an e-commerce platform that feels as smooth and responsive as modern software should be.
            </p>
            <p>
              Today, SkyMart serves tens of thousands of shoppers across tech, fashion, lifestyle, and home products. We carefully curate what we list, partner directly with trusted vendors, and guarantee transparent pricing without hidden markups.
            </p>
            <p>
              We're dedicated to obsessing over speed, intuitive simplicity, and making every interaction seamless from search to doorstep.
            </p>
          </div>
        </section>

        {/* ================= VALUES ================= */}
        <section className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
              What We Stand For
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              The core principles that shape every SkyMart experience
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                icon: ShieldCheck,
                title: "Uncompromising Quality",
                desc: "Every listed item is tested and reviewed before it reaches our catalog. Zero junk, zero counterfeits.",
                accent: "text-sky-400",
                bg: "bg-sky-400/10",
              },
              {
                icon: Truck,
                title: "Rapid Dispatch",
                desc: "Our distribution pipelines are streamlined so your package is packaged and moving within hours.",
                accent: "text-[#c6ff00]",
                bg: "bg-[#c6ff00]/10",
              },
              {
                icon: HeartHandshake,
                title: "Customer-First Culture",
                desc: "Real humans on support, no automated runarounds, and fair 30-day return policies on every order.",
                accent: "text-rose-400",
                bg: "bg-rose-400/10",
              },
              {
                icon: Star,
                title: "Transparent Pricing",
                desc: "Direct prices, honest product reviews, and no deceptive timers or checkout dark patterns.",
                accent: "text-amber-400",
                bg: "bg-amber-400/10",
              },
            ].map(({ icon: Icon, title, desc, accent, bg }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-zinc-800/90 bg-[#121212] p-6 transition-all duration-300 hover:border-zinc-700"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${bg} ${accent}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= TEAM (Fixed Overlap Bug) ================= */}
        <section className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
              Meet the Builders
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              The passionate minds shaping SkyMart every day
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map(({ name, role, avatarLetter, bgClass }) => (
              <div
                key={name}
                className="flex flex-col items-center rounded-2xl border border-zinc-800/90 bg-[#121212] p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#c6ff00]/40 hover:shadow-lg"
              >
                {/* Avatar Badge */}
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl font-bold text-2xl font-display mb-4 ${bgClass}`}>
                  {avatarLetter}
                </div>

                {/* Name - explicitly styled to prevent overlap */}
                <h3 className="text-lg font-bold text-white font-display leading-tight">
                  {name}
                </h3>

                {/* Role / Title - cleanly spaced beneath the name */}
                <p className="mt-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  {role}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= READY TO SHOP CTA ================= */}
        <section className="mt-20 rounded-3xl border border-[#c6ff00]/30 bg-gradient-to-r from-[#12180c] via-[#101010] to-[#0e140a] px-6 py-14 text-center sm:px-12 relative overflow-hidden shadow-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[#c6ff00]/5 blur-2xl" />

          <h2 className="text-3xl font-extrabold sm:text-4xl font-display text-white relative">
            Ready to experience the future?
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm sm:text-base text-zinc-400 relative">
            Explore thousands of curated tech, fashion, and lifestyle products with express delivery today.
          </p>

          <div className="mt-8 relative">
            <button
              onClick={() => navigate("/main/shop")}
              className="inline-flex items-center gap-2.5 rounded-xl bg-[#c6ff00] px-8 py-3.5 text-sm font-bold text-black shadow-[0_0_25px_rgba(198,255,0,0.3)] transition-all duration-200 hover:bg-[#b3ea00] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Browse Catalog</span>
              <ArrowRight size={17} />
            </button>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="mt-20 border-t border-zinc-800/80 pt-8 text-center">
          <p className="text-base font-bold text-[#c6ff00] font-display">
            SkyMart
          </p>
          <p className="mt-1 text-xs text-zinc-600">
            © 2025 SkyMart Inc. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default About;