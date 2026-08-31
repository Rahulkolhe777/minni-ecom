import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  ShoppingCart,
  ArrowRight,
  Star,
  Zap,
  Laptop,
  Shirt,
  Home as HomeIcon,
  Dumbbell,
  Watch,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Sparkles,
  Check,
} from "lucide-react";
import { Auth } from "../context/Auth";
import axios from "axios";

// ─────────────────────────────────────────────────────────────────────────────
// BROAD CATEGORY CONFIG  (6 display categories with distinct colors)
// ─────────────────────────────────────────────────────────────────────────────
const BROAD_CATEGORIES = [
  {
    name: "Electronics",
    icon: Laptop,
    slugs: ["smartphones","laptops","tablets","mobile-accessories","computers","cameras","audio","tv","gaming"],
    colorClass: "text-sky-400",
    bgClass: "bg-sky-400/10",
    borderHover: "hover:border-sky-500/50 hover:shadow-[0_8px_25px_rgba(56,189,248,0.12)]",
    iconBgHover: "group-hover:bg-sky-400/20",
  },
  {
    name: "Clothing",
    icon: Shirt,
    slugs: ["mens-shirts","womens-dresses","mens-shoes","womens-shoes","tops","jeans","activewear","underwear"],
    colorClass: "text-rose-400",
    bgClass: "bg-rose-400/10",
    borderHover: "hover:border-rose-500/50 hover:shadow-[0_8px_25px_rgba(251,113,133,0.12)]",
    iconBgHover: "group-hover:bg-rose-400/20",
  },
  {
    name: "Furniture",
    icon: HomeIcon,
    slugs: ["furniture","sofas","beds","tables","chairs"],
    colorClass: "text-amber-400",
    bgClass: "bg-amber-400/10",
    borderHover: "hover:border-amber-500/50 hover:shadow-[0_8px_25px_rgba(251,191,36,0.12)]",
    iconBgHover: "group-hover:bg-amber-400/20",
  },
  {
    name: "Home",
    icon: HomeIcon,
    slugs: ["home-decoration","kitchen-accessories","bathroom-accessories","home-improvement","garden","lighting"],
    colorClass: "text-emerald-400",
    bgClass: "bg-emerald-400/10",
    borderHover: "hover:border-emerald-500/50 hover:shadow-[0_8px_25px_rgba(52,211,153,0.12)]",
    iconBgHover: "group-hover:bg-emerald-400/20",
  },
  {
    name: "Sports",
    icon: Dumbbell,
    slugs: ["sports-accessories","fitness","outdoor","yoga","cycling"],
    colorClass: "text-orange-400",
    bgClass: "bg-orange-400/10",
    borderHover: "hover:border-orange-500/50 hover:shadow-[0_8px_25px_rgba(251,146,60,0.12)]",
    iconBgHover: "group-hover:bg-orange-400/20",
  },
  {
    name: "Accessories",
    icon: Watch,
    slugs: ["mens-watches","womens-watches","sunglasses","womens-bags","womens-jewellery","mens-jewellery","fragrances","skincare","beauty","hair-care"],
    colorClass: "text-violet-400",
    bgClass: "bg-violet-400/10",
    borderHover: "hover:border-violet-500/50 hover:shadow-[0_8px_25px_rgba(167,139,250,0.12)]",
    iconBgHover: "group-hover:bg-violet-400/20",
  },
];

const getBroadCategoryName = (rawCat) => {
  const lower = rawCat?.toLowerCase() || "";
  for (const cat of BROAD_CATEGORIES) {
    if (cat.slugs.includes(lower)) return cat.name;
  }
  return null;
};

// Greeting based on time
const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
};

// ─────────────────────────────────────────────────────────────────────────────
// HERO SECTION WITH GRADIENT MESH & PRODUCT PREVIEW TEASER
// ─────────────────────────────────────────────────────────────────────────────
const HeroSection = ({ user, productCount }) => {
  const navigate = useNavigate();
  const rawName = user?.name?.trim() || user?.email?.split("@")[0] || "Explorer";
  const firstName = rawName.split(" ")[0];

  return (
    <section className="px-6 pt-8 pb-4 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-br from-[#12180c] via-[#0f1011] to-[#0a0a0a] p-8 md:p-12 lg:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        {/* Subtle Ambient Radial Glows */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-96 w-96 rounded-full bg-[#c6ff00]/10 blur-[130px]" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-emerald-500/5 blur-[100px]" />

        {/* Decorative Grid Pattern Overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          {/* Left Column */}
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#c6ff00]/30 bg-[#c6ff00]/10 mb-6 backdrop-blur-md">
              <Sparkles size={13} className="text-[#c6ff00]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#c6ff00]">
                {getGreeting()}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.1]">
              Welcome back,{" "}
              <span className="text-[#c6ff00] inline-block max-w-[280px] sm:max-w-md truncate align-bottom drop-shadow-[0_0_20px_rgba(198,255,0,0.25)]" title={firstName}>
                {firstName}!
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base sm:text-lg leading-relaxed text-zinc-400">
              Discover today's curated lineup across premium tech, everyday essentials, and fashion styles with lightning-fast delivery.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate("/main/shop")}
                className="flex items-center gap-2.5 rounded-xl bg-[#c6ff00] px-7 py-3.5 text-sm font-bold text-black shadow-[0_0_20px_rgba(198,255,0,0.25)] transition-all duration-200 hover:bg-[#b3ea00] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Shop Catalog</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => navigate("/main/about")}
                className="flex items-center gap-2 rounded-xl border border-zinc-700/80 bg-zinc-900/60 px-6 py-3.5 text-sm font-semibold text-zinc-300 backdrop-blur-sm transition-all duration-200 hover:border-zinc-500 hover:text-white cursor-pointer"
              >
                <span>Why SkyMart?</span>
              </button>
            </div>
          </div>

          {/* Right Column — Store Highlight Cards */}
          <div className="flex flex-row sm:flex-row lg:flex-col gap-4 min-w-[220px]">
            <div className="flex-1 rounded-2xl border border-[#c6ff00]/30 bg-gradient-to-br from-[#c6ff00]/15 to-[#c6ff00]/5 p-6 backdrop-blur-md text-left transition hover:scale-[1.02] duration-300">
              <div className="flex items-center gap-2 mb-2 text-[#c6ff00]">
                <Zap size={18} className="fill-current" />
                <span className="text-xs font-bold uppercase tracking-wider">Store Catalog</span>
              </div>
              <p className="text-3xl lg:text-4xl font-black text-white font-display leading-none">
                {productCount > 0 ? `${productCount}+` : "190+"}
              </p>
              <p className="mt-1 text-xs text-zinc-400 font-medium">Verified Active Products</p>
            </div>

            <div className="flex-1 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 backdrop-blur-md text-left transition hover:scale-[1.02] duration-300">
              <div className="flex items-center gap-2 mb-2 text-emerald-400">
                <Truck size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">Fast Shipping</span>
              </div>
              <p className="text-3xl lg:text-4xl font-black text-white font-display leading-none">
                Free
              </p>
              <p className="mt-1 text-xs text-zinc-400 font-medium">On orders over $50</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOMER TRUST INDICATORS (Replaced admin stat tiles)
// ─────────────────────────────────────────────────────────────────────────────
const TrustIndicatorsBar = () => {
  const indicators = [
    {
      icon: Truck,
      title: "Free Express Delivery",
      desc: "On all orders above $50",
      accent: "text-[#c6ff00]",
      bg: "bg-[#c6ff00]/10",
      border: "hover:border-[#c6ff00]/30",
    },
    {
      icon: ShieldCheck,
      title: "100% Secure Checkout",
      desc: "256-bit SSL encrypted payments",
      accent: "text-sky-400",
      bg: "bg-sky-400/10",
      border: "hover:border-sky-500/30",
    },
    {
      icon: RotateCcw,
      title: "30-Day Hassle Returns",
      desc: "Full money-back guarantee",
      accent: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "hover:border-emerald-500/30",
    },
    {
      icon: Headphones,
      title: "24/7 Priority Support",
      desc: "Live dedicated customer team",
      accent: "text-violet-400",
      bg: "bg-violet-400/10",
      border: "hover:border-violet-500/30",
    },
  ];

  return (
    <section className="px-6 py-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {indicators.map(({ icon: Icon, title, desc, accent, bg, border }) => (
          <div
            key={title}
            className={`flex items-center gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 ${border}`}
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${bg} ${accent}`}>
              <Icon size={22} />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-zinc-100 font-display truncate">{title}</h3>
              <p className="text-xs text-zinc-400 mt-0.5 truncate">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SHOP BY CATEGORY (Vibrant color-coded tiles)
// ─────────────────────────────────────────────────────────────────────────────
const CategorySection = ({ products }) => {
  const navigate = useNavigate();

  const categoryCounts = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      const broad = getBroadCategoryName(p.category);
      if (broad) counts[broad] = (counts[broad] || 0) + 1;
    });
    return counts;
  }, [products]);

  const visibleCategories = BROAD_CATEGORIES.filter(
    (c) => (categoryCounts[c.name] || 0) > 0,
  );

  return (
    <section className="px-6 py-6 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white font-display">
            Shop by Category
          </h2>
          <p className="text-xs text-zinc-400 mt-1">Explore our most popular departments</p>
        </div>
        <button
          onClick={() => navigate("/main/shop")}
          className="group flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#c6ff00] hover:underline cursor-pointer"
        >
          <span>All Departments</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {visibleCategories.map(({ name, icon: Icon, colorClass, bgClass, borderHover, iconBgHover }) => {
          const count = categoryCounts[name] || 0;
          return (
            <button
              key={name}
              onClick={() => navigate(`/main/shop?category=${encodeURIComponent(name)}`)}
              className={`
                group flex flex-col items-center gap-3 rounded-2xl
                border border-zinc-800/90 bg-[#121212] p-5 text-center
                transition-all duration-300
                hover:-translate-y-1
                cursor-pointer
                ${borderHover}
              `}
            >
              <div className={`flex h-13 w-13 items-center justify-center rounded-2xl ${bgClass} ${colorClass} transition-transform duration-300 group-hover:scale-110 ${iconBgHover}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-200 group-hover:text-white transition font-display">{name}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{count} items</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT LIST ROW
// ─────────────────────────────────────────────────────────────────────────────
const MiniProductRow = ({ product, onAdd, isInCart }) => {
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      onClick={() => navigate(`/main/shop/${product.id}`)}
      className="flex items-center gap-3.5 p-2.5 rounded-xl transition-all duration-200 hover:bg-zinc-800/50 cursor-pointer group"
    >
      <div className="relative h-14 w-14 shrink-0 rounded-xl bg-[#f3f4f6] flex items-center justify-center overflow-hidden border border-zinc-700/40">
        {!imgLoaded && <div className="absolute inset-0 shimmer-loading" />}
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          onLoad={() => setImgLoaded(true)}
          className={`h-full w-full object-contain p-1.5 transition-all duration-300 group-hover:scale-105 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{product.category}</p>
        <p className="text-sm font-semibold text-zinc-100 line-clamp-1 group-hover:text-[#c6ff00] transition">
          {product.title}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <p className="text-sm font-bold text-[#c6ff00] font-display">${product.price}</p>
          <span className="text-[11px] text-zinc-500">★ {product.rating?.toFixed(1)}</span>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onAdd(product);
        }}
        aria-label="Add product to cart"
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200 active:scale-90 cursor-pointer ${
          isInCart
            ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
            : "bg-zinc-800 text-zinc-300 hover:bg-[#c6ff00] hover:text-black hover:shadow-[0_0_15px_rgba(198,255,0,0.2)]"
        }`}
      >
        {isInCart ? <Check size={15} /> : <ShoppingCart size={15} />}
      </button>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TOP RATED + NEW ARRIVALS
// ─────────────────────────────────────────────────────────────────────────────
const ProductListsSection = ({ products, cartItems, addToCart, setIsCartOpen }) => {
  const navigate = useNavigate();

  const topRated = useMemo(
    () => [...products].sort((a, b) => b.rating - a.rating).slice(0, 5),
    [products],
  );

  const newArrivals = useMemo(
    () => [...products].sort((a, b) => b.id - a.id).slice(0, 5),
    [products],
  );

  const isInCart = (id) => cartItems.some((i) => i.id === id);

  const ListCard = ({ title, icon: Icon, items, filterSort }) => (
    <div className="rounded-3xl border border-zinc-800/90 bg-[#121212] p-6 flex-1 shadow-lg">
      <div className="mb-5 flex items-center justify-between pb-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c6ff00]/10 text-[#c6ff00]">
            <Icon size={16} />
          </div>
          <h3 className="text-lg font-bold text-white font-display">{title}</h3>
        </div>
        <button
          onClick={() => navigate(`/main/shop${filterSort ? `?sort=${filterSort}` : ""}`)}
          className="flex items-center gap-1 text-xs font-semibold text-zinc-400 hover:text-[#c6ff00] transition cursor-pointer"
        >
          <span>View all</span>
          <ArrowRight size={12} />
        </button>
      </div>

      <div className="space-y-1">
        {items.map((p) => (
          <MiniProductRow
            key={p.id}
            product={p}
            onAdd={(product) => {
              addToCart(product);
              setIsCartOpen(true);
            }}
            isInCart={isInCart(p.id)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <section className="px-6 py-6 pb-16 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6 lg:flex-row">
        <ListCard title="Highest Rated" icon={Star} items={topRated} filterSort="rating" />
        <ListCard title="Fresh Arrivals" icon={Zap} items={newArrivals} />
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE ROOT
// ─────────────────────────────────────────────────────────────────────────────
const HomePage = () => {
  const { productData, setProductData, cartItems, loggedInUser, addToCart, setIsCartOpen } =
    useContext(Auth);

  useEffect(() => {
    if (productData.length === 0) {
      axios
        .get("https://dummyjson.com/products?limit=0")
        .then((r) => setProductData(r.data.products))
        .catch(console.error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <HeroSection user={loggedInUser} productCount={productData.length} />

      <TrustIndicatorsBar />

      <CategorySection products={productData} />

      <ProductListsSection
        products={productData}
        cartItems={cartItems}
        addToCart={addToCart}
        setIsCartOpen={setIsCartOpen}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-[#0d0d0d] px-6 py-10 text-center">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#c6ff00]">
              <Zap size={15} className="fill-current text-black" />
            </div>
            <span className="font-bold text-white font-display">
              Sky<span className="text-[#c6ff00]">Mart</span>
            </span>
          </div>

          <p className="text-xs text-zinc-500">
            © 2025 SkyMart Inc. Built with React + Vite + TailwindCSS
          </p>

          <div className="flex items-center gap-6 text-xs text-zinc-400">
            <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition">Help Center</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
