import React from "react";
import {
  Zap,
  Package,
  Users,
  Star,
  Truck,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
} from "lucide-react"; 

const About = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Hero Section */}
        <section className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c6ff00] text-black">
            <Zap size={28} fill="currentColor" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            About{" "}
            <span className="text-[#c6ff00]">
              SkyMart
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            SkyMart is a next-generation e-commerce platform built to make
            online shopping fast, fair, and enjoyable — for everyone.
          </p>
        </section>

        {/* Stats */}
        <section className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">

          <div className="rounded-2xl border  border-white bg-[#111] p-6 text-center transition hover:border-[#c6ff00]/40">
            <Package
              className="mx-auto mb-4 text-[#c6ff00]"
              size={27}
            />

            <h3 className="text-3xl font-bold">
              20K+
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Products
            </p>
          </div>

          <div className="rounded-2xl border  border-white bg-[#111] p-6 text-center transition hover:border-[#c6ff00]/40">
            <Users
              className="mx-auto mb-4 text-[#c6ff00]"
              size={27}
            />

            <h3 className="text-3xl font-bold">
              50K+
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Happy Customers
            </p>
          </div>

          <div className="rounded-2xl border  border-white bg-[#111] p-6 text-center transition hover:border-[#c6ff00]/40">
            <Star
              className="mx-auto mb-4 text-[#c6ff00]"
              size={27}
            />

            <h3 className="text-3xl font-bold">
              4.9
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Avg. Rating
            </p>
          </div>

          <div className="rounded-2xl border  border-white bg-[#111] p-6 text-center transition hover:border-[#c6ff00]/40">
            <Truck
              className="mx-auto mb-4 text-[#c6ff00]"
              size={27}
            />

            <h3 className="text-3xl font-bold">
              99%
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              On-time Delivery
            </p>
          </div>

        </section>

        {/* Our Story */}
        <section className="mt-20 rounded-3xl border  border-white bg-[#111] p-8 sm:p-10 md:p-14">

          <h2 className="text-3xl font-bold sm:text-4xl">
            Our Story
          </h2>

          <div className="mt-7 max-w-4xl space-y-5 leading-7 text-zinc-400">
            <p>
              SkyMart started in 2022 as a small side project — two engineers
              tired of bloated, slow e-commerce experiences. We asked
              ourselves: what if shopping online was actually{" "}
              <span className="text-white italic">
                enjoyable?
              </span>
            </p>

            <p>
              Three years later, SkyMart serves over 50,000 customers across
              the country. We stock electronics, fashion, jewelry, and
              everyday essentials — all at prices that don't require a second
              mortgage.
            </p>

            <p>
              We're still the same team at heart, obsessed with speed,
              transparency, and making you feel good about every purchase you
              make here.
            </p>
          </div>

        </section>

        {/* What We Stand For */}
        <section className="mt-20">

          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              What We Stand For
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-zinc-500">
              Everything we do is built around making your shopping experience
              better.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">

            {/* Trust */}
            <div className="flex gap-5 rounded-2xl border border-white bg-[#111] p-7 transition hover:border-[#c6ff00]/40">
              <ShieldCheck
                size={30}
                className="shrink-0 text-[#c6ff00]"
              />

              <div>
                <h3 className="text-xl font-bold">
                  Trust
                </h3>

                <p className="mt-2 leading-6 text-zinc-500">
                  Every product is verified for quality and authenticity
                  before listing.
                </p>
              </div>
            </div>

            {/* Speed */}
            <div className="flex gap-5 rounded-2xl border border-white bg-[#111] p-7 transition hover:border-[#c6ff00]/40">
              <Truck
                size={30}
                className="shrink-0 text-[#c6ff00]"
              />

              <div>
                <h3 className="text-xl font-bold">
                  Speed
                </h3>

                <p className="mt-2 leading-6 text-zinc-500">
                  We obsess over delivery times so your orders arrive when
                  promised.
                </p>
              </div>
            </div>

            {/* Community */}
            <div className="flex gap-5 rounded-2xl border border-white bg-[#111] p-7 transition hover:border-[#c6ff00]/40">
              <HeartHandshake
                size={30}
                className="shrink-0 text-[#c6ff00]"
              />

              <div>
                <h3 className="text-xl font-bold">
                  Community
                </h3>

                <p className="mt-2 leading-6 text-zinc-500">
                  Built around real customer feedback, not just business
                  metrics.
                </p>
              </div>
            </div>

            {/* Quality */}
            <div className="flex gap-5 rounded-2xl border border-white bg-[#111] p-7 transition hover:border-[#c6ff00]/40">
              <Star
                size={30}
                className="shrink-0 text-[#c6ff00]"
              />

              <div>
                <h3 className="text-xl font-bold">
                  Quality
                </h3>

                <p className="mt-2 leading-6 text-zinc-500">
                  We curate the best — no filler, no junk, just great products.
                </p>
              </div>
            </div>

          </div>

        </section>

        {/* Team */}
        <section className="mt-20">

          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Meet the Team
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">

            <div className="rounded-2xl border border-white bg-[#111] p-8 text-center transition hover:-translate-y-1 hover:border-[#c6ff00]/40">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-[#c6ff00] text-xl font-bold text-black">
                A
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Aryan Shah
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                Founder & CEO
              </p>
            </div>

            <div className="rounded-2xl border border-white bg-[#111] p-8 text-center ">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-blue-400 text-xl font-bold text-white">
                P
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Priya Mehta
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                Head of Product
              </p>
            </div>

            <div className="rounded-2xl border border-white bg-[#111] p-8 text-center ">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-purple-400 text-xl font-bold text-white">
                R
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Rohan Verma
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                Lead Engineer
              </p>
            </div>

            <div className="rounded-2xl border border-white bg-[#111] p-8 text-center ">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-red-400 text-xl font-bold text-white">
                S
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Sneha Kapoor
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                Design Director
              </p>
            </div>

          </div>

        </section>

        {/* CTA */}
        <section className="mt-20 rounded-3xl border border-[#c6ff00]/20 bg-[#c6ff00]/5 px-6 py-16 text-center sm:px-10">

          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to shop?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-zinc-500">
            Explore thousands of products at unbeatable prices.
          </p>

          <div className="mt-8 flex items-center justify-center gap-2 text-lg font-bold text-[#c6ff00]">
            Browse Products
            <ArrowRight size={21} />
          </div>

        </section>

        {/* Footer */}
        <footer className="mt-20 border-t  border-white pt-8 text-center">
          <p className="text-lg font-semibold text-[#c6ff00]">
            SkyMart
          </p>

          <p className="mt-2 text-sm text-zinc-600">
            © 2025 SkyMart • Built with React + Redux + TanStack Query
          </p>
        </footer>

      </div>
    </div>
  );
};

export default About;