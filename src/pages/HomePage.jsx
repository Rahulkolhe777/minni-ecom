import React, { useContext, useEffect, useMemo } from "react";
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
  Package,
  ShoppingBag,
  TrendingUp,
  Tag,
  DollarSign,
} from "lucide-react";
import { Auth } from "../context/Auth";
import axios from "axios";

// ─────────────────────────────────────────────────────────────────────────────
// BROAD CATEGORY CONFIG  (6 display categories)
// ─────────────────────────────────────────────────────────────────────────────
const BROAD_CATEGORIES = [
  {
    name: "Electronics",
    icon: Laptop,
    slugs: ["smartphones","laptops","tablets","mobile-accessories","computers","cameras","audio","tv","gaming"],
  },
  {
    name: "Clothing",
    icon: Shirt,
    slugs: ["mens-shirts","womens-dresses","mens-shoes","womens-shoes","tops","jeans","activewear","underwear"],
  },
  {
    name: "Furniture",
    icon: HomeIcon,
    slugs: ["furniture","sofas","beds","tables","chairs"],
  },
  {
    name: "Home",
    icon: HomeIcon,
    slugs: ["home-decoration","kitchen-accessories","bathroom-accessories","home-improvement","garden","lighting"],
  },
  {
    name: "Sports",
    icon: Dumbbell,
    slugs: ["sports-accessories","fitness","outdoor","yoga","cycling"],
  },
  {
    name: "Accessories",
    icon: Watch,
    slugs: ["mens-watches","womens-watches","sunglasses","womens-bags","womens-jewellery","mens-jewellery","fragrances","skincare","beauty","hair-care"],
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
  if (h < 12) return "GOOD MORNING ☀️";
  if (h < 17) return "GOOD AFTERNOON 👋";
  return "GOOD EVENING 🤌";
};

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
const HeroSection = ({ user, productCount }) => {
  const navigate = useNavigate();
  const firstName = user?.name?.split(" ")[0] || user?.email?.split("@")[0] || "there";

  return (
    <section className="px-6 pt-8 pb-6 max-w-7xl mx-auto">
      <div className="rounded-3xl border border-zinc-800 bg-[#111] p-8 lg:p-10 relative overflow-hidden">

        {/* subtle bg glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#c6ff00]/5 blur-3xl" />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          {/* Left */}
          <div className="flex-1">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#c6ff00]">
              {getGreeting()}
            </p>

            <h1 className="text-4xl font-black leading-tight text-white lg:text-5xl">
              Welcome back,<br />
              <span className="text-[#c6ff00]">{firstName}!</span>
            </h1>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
              Discover today's picks — hand-curated products across electronics, fashion, and more.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/main/shop")}
                className="flex items-center gap-2 rounded-xl bg-[#c6ff00] px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300 hover:scale-105 active:scale-95"
              >
                Shop Now <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate("/main/shop")}
                className="flex items-center gap-2 rounded-xl border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 transition hover:border-zinc-500 hover:text-white"
              >
                View All Products
              </button>
            </div>
          </div>

          {/* Right — stat cards */}
          <div className="flex flex-row gap-3 lg:flex-col lg:gap-4 lg:min-w-[180px]">
            <div className="flex-1 rounded-2xl bg-[#c6ff00] p-5 text-center lg:flex-none">
              <p className="text-3xl font-black text-black leading-none">
                {productCount > 0 ? `${productCount}+` : "…"}
              </p>
              <p className="mt-1 text-xs font-semibold text-black/70">Products Available</p>
            </div>

            <div className="flex-1 rounded-2xl border border-zinc-700 bg-[#1a1a1a] p-5 text-center lg:flex-none">
              <p className="text-2xl font-black text-white leading-none">Free</p>
              <p className="mt-1 text-xs text-zinc-500">Delivery on ₹999+</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// QUICK STATS BAR
// ─────────────────────────────────────────────────────────────────────────────
const QuickStatsBar = ({ cartItems, productCount }) => {
  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const cartValue = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  const stats = [
    {
      icon: ShoppingBag,
      value: cartCount,
      label: "Cart Items",
      sub: "In your bag",
      color: "text-[#c6ff00]",
      bg: "bg-[#c6ff00]/10",
    },
    {
      icon: DollarSign,
      value: `$${cartValue.toFixed(2)}`,
      label: "Cart Value",
      sub: "Ready to checkout",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      icon: Star,
      value: productCount,
      label: "Top Products",
      sub: "Highly rated",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    {
      icon: Tag,
      value: 6,
      label: "Categories",
      sub: "To explore",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
  ];

  return (
    <section className="px-6 pb-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map(({ icon: Icon, value, label, sub, color, bg }) => (
          <div
            key={label}
            className="rounded-2xl border border-zinc-800 bg-[#111] px-5 py-4 flex items-center gap-4 transition hover:border-zinc-700"
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${bg}`}>
              <Icon size={18} className={color} />
            </div>
            <div>
              <p className="text-xl font-bold text-white leading-tight">{value}</p>
              <p className="text-xs font-semibold text-zinc-400">{label}</p>
              <p className="text-[11px] text-zinc-600">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SHOP BY CATEGORY  (6 broad categories, show item count)
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
    <section className="px-6 pb-10 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-black text-white">Shop by Category</h2>
        <button
          onClick={() => navigate("/main/shop")}
          className="flex items-center gap-1 text-sm font-semibold text-[#c6ff00] hover:underline transition"
        >
          View All <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {visibleCategories.map(({ name, icon: Icon }) => {
          const count = categoryCounts[name] || 0;
          return (
            <button
              key={name}
              onClick={() => navigate(`/main/shop?category=${encodeURIComponent(name)}`)}
              className="
                group flex flex-col items-center gap-2 rounded-2xl
                border border-zinc-800 bg-[#111] p-5 text-center
                transition-all duration-200
                hover:border-[#c6ff00]/30 hover:-translate-y-1
                hover:shadow-[0_8px_20px_rgba(198,255,0,0.06)]
              "
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 transition group-hover:bg-[#c6ff00]/15">
                <Icon size={22} className="text-zinc-300 group-hover:text-[#c6ff00] transition" />
              </div>
              <p className="text-sm font-bold text-zinc-200 group-hover:text-white transition">{name}</p>
              <p className="text-xs text-zinc-500">{count} items</p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT LIST ROW  (used in Top Rated + New Arrivals)
// ─────────────────────────────────────────────────────────────────────────────
const MiniProductRow = ({ product, onAdd, isInCart }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/main/shop/${product.id}`)}
      className="flex items-center gap-3 py-3 border-b border-zinc-800 last:border-0 cursor-pointer hover:bg-zinc-900/50 rounded-xl px-1 transition"
    >
      <div className="h-12 w-12 shrink-0 rounded-xl bg-white flex items-center justify-center overflow-hidden">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="h-full w-full object-contain p-1"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-zinc-200 line-clamp-1">{product.title}</p>
        <p className="text-[13px] font-bold text-[#c6ff00]">${product.price}</p>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onAdd(product); }}
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
          isInCart
            ? "bg-[#062b17] border border-green-900 text-green-400"
            : "bg-[#c6ff00]/10 border border-[#c6ff00]/20 text-[#c6ff00] hover:bg-[#c6ff00]/20"
        }`}
      >
        <ShoppingCart size={14} />
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
    <div className="rounded-2xl border border-zinc-800 bg-[#111] p-5 flex-1">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-[#c6ff00]" />
          <h3 className="font-bold text-white">{title}</h3>
        </div>
        <button
          onClick={() => navigate(`/main/shop${filterSort ? `?sort=${filterSort}` : ""}`)}
          className="flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-[#c6ff00] transition"
        >
          See all <ArrowRight size={12} />
        </button>
      </div>
      {items.map((p) => (
        <MiniProductRow
          key={p.id}
          product={p}
          onAdd={(product) => { addToCart(product); setIsCartOpen(true); }}
          isInCart={isInCart(p.id)}
        />
      ))}
    </div>
  );

  return (
    <section className="px-6 pb-16 max-w-7xl mx-auto">
      <div className="flex flex-col gap-5 lg:flex-row">
        <ListCard title="Top Rated" icon={Star} items={topRated} filterSort="rating" />
        <ListCard title="New Arrivals" icon={Zap} items={newArrivals} />
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE
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

      <QuickStatsBar cartItems={cartItems} productCount={productData.length} />

      <CategorySection products={productData} />

      <ProductListsSection
        products={productData}
        cartItems={cartItems}
        addToCart={addToCart}
        setIsCartOpen={setIsCartOpen}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-6 py-8 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#c6ff00]">
            <Zap size={14} fill="currentColor" className="text-black" />
          </div>
          <span className="font-bold text-white">
            Sky<span className="text-[#c6ff00]">Mart</span>
          </span>
        </div>
        <p className="text-xs text-zinc-600">© 2025 SkyMart — Built with React + Vite + TailwindCSS</p>
      </footer>

    </div>
  );
};

export default HomePage;
