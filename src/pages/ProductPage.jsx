import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Search, X, ChevronDown, Package } from "lucide-react";
import { Auth } from "../context/Auth";
import ProductCard from "../components/ProductCard";

// ─────────────────────────────────────────────────────────────────────────────
// BROAD CATEGORY GROUPS  (maps dummyjson raw categories → display name)
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORY_MAP = {
  Electronics: [
    "smartphones","laptops","tablets","mobile-accessories",
    "computers","cameras","audio","tv","gaming",
  ],
  Clothing: [
    "mens-shirts","womens-dresses","mens-shoes","womens-shoes",
    "tops","jeans","activewear","underwear",
  ],
  Furniture: ["furniture","sofas","beds","tables","chairs"],
  Home: [
    "home-decoration","kitchen-accessories","bathroom-accessories",
    "home-improvement","garden","lighting",
  ],
  Sports: [
    "sports-accessories","fitness","outdoor","yoga","cycling",
  ],
  Accessories: [
    "mens-watches","womens-watches","sunglasses","womens-bags",
    "womens-jewellery","mens-jewellery","fragrances","skincare",
    "beauty","hair-care",
  ],
};

// Return display name for a raw dummyjson category
const getBroadCategory = (rawCat) => {
  const lower = rawCat?.toLowerCase() || "";
  for (const [display, slugs] of Object.entries(CATEGORY_MAP)) {
    if (slugs.includes(lower)) return display;
  }
  return "Other";
};

const SORT_OPTIONS = [
  { value: "default",    label: "Featured"          },
  { value: "price_asc",  label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "rating",     label: "Top Rated"         },
  { value: "name_asc",   label: "Name A → Z"        },
  { value: "name_desc",  label: "Name Z → A"        },
];

// ─────────────────────────────────────────────────────────────────────────────
const ProductPage = () => {
  const { productData, setProductData } = useContext(Auth);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery,      setSearchQuery]      = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );
  const [sortBy,  setSortBy]  = useState("default");
  const [loading, setLoading] = useState(false);

  // Sync URL param → category filter
  useEffect(() => {
    const cat = searchParams.get("category") || "";
    setSelectedCategory(cat);
  }, [searchParams]);

  // Fetch products once
  useEffect(() => {
    if (productData.length === 0) {
      setLoading(true);
      axios
        .get("https://dummyjson.com/products?limit=0")
        .then((r) => setProductData(r.data.products))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, []);

  // Derive broad display categories that actually exist in data
  const displayCategories = useMemo(() => {
    const found = new Set(productData.map((p) => getBroadCategory(p.category)));
    return ["", ...Object.keys(CATEGORY_MAP).filter((k) => found.has(k))];
  }, [productData]);

  // Filter
  const filtered = useMemo(() => {
    let list = productData;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q),
      );
    }

    if (selectedCategory) {
      list = list.filter(
        (p) => getBroadCategory(p.category) === selectedCategory,
      );
    }

    return list;
  }, [productData, searchQuery, selectedCategory]);

  // Sort
  const displayProducts = useMemo(() => {
    const list = [...filtered];
    switch (sortBy) {
      case "price_asc":  return list.sort((a, b) => a.price - b.price);
      case "price_desc": return list.sort((a, b) => b.price - a.price);
      case "rating":     return list.sort((a, b) => b.rating - a.rating);
      case "name_asc":   return list.sort((a, b) => a.title.localeCompare(b.title));
      case "name_desc":  return list.sort((a, b) => b.title.localeCompare(a.title));
      default:           return list;
    }
  }, [filtered, sortBy]);

  const clearAll = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSortBy("default");
    setSearchParams({});
  };

  const hasFilters = searchQuery || selectedCategory;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <div className="px-6 pt-10 pb-6 mx-auto max-w-7xl">
        <h1 className="text-3xl font-black text-white">All Products</h1>
        <p className="mt-1 text-sm text-zinc-500">
          {loading ? "Loading…" : (
            <>
              <span className="text-white font-semibold">{displayProducts.length}</span> products found
              {selectedCategory && (
                <> <span className="text-[#c6ff00]">in {selectedCategory}</span></>
              )}
            </>
          )}
        </p>
      </div>

      {/* ── FILTER BAR ──────────────────────────────────────────────────── */}
      <div className="px-6 pb-6 mx-auto max-w-7xl">
        <div className="rounded-2xl border border-zinc-800 bg-[#111] p-4">

          {/* Controls row */}
          <div className="flex flex-wrap items-center gap-3">

            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search products…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                  w-full rounded-xl border border-zinc-700 bg-[#1a1a1a]
                  py-2.5 pl-10 pr-4 text-sm text-white
                  placeholder-zinc-600 outline-none
                  focus:border-[#c6ff00]/50 transition
                "
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category dropdown */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  if (e.target.value) {
                    setSearchParams({ category: e.target.value });
                  } else {
                    setSearchParams({});
                  }
                }}
                className="
                  appearance-none rounded-xl border border-zinc-700 bg-[#1a1a1a]
                  py-2.5 pl-4 pr-9 text-sm text-white
                  outline-none focus:border-[#c6ff00]/50 transition cursor-pointer
                  min-w-[140px]
                "
              >
                <option value="">All Categories</option>
                {displayCategories.filter(Boolean).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="
                  appearance-none rounded-xl border border-zinc-700 bg-[#1a1a1a]
                  py-2.5 pl-4 pr-9 text-sm text-white
                  outline-none focus:border-[#c6ff00]/50 transition cursor-pointer
                  min-w-[160px]
                "
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            </div>

            {/* Clear */}
            {hasFilters && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 rounded-xl bg-red-600/20 border border-red-600/30 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-600/30"
              >
                <X size={14} />
                Clear
              </button>
            )}
          </div>

          {/* Active chips row */}
          {hasFilters && (
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedCategory && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c6ff00]/30 bg-[#c6ff00]/10 px-3 py-1 text-xs font-semibold text-[#c6ff00]">
                  {selectedCategory}
                  <button
                    onClick={() => { setSelectedCategory(""); setSearchParams({}); }}
                    className="hover:text-white transition"
                  >
                    <X size={11} />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300">
                  "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:text-white transition"
                  >
                    <X size={11} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── PRODUCT GRID ────────────────────────────────────────────────── */}
      <div className="px-6 pb-16 mx-auto max-w-7xl">

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-[340px] rounded-[28px] border border-zinc-800 bg-[#111] animate-pulse" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && displayProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <Package size={50} className="mb-4 text-zinc-700" />
            <h3 className="text-xl font-bold text-zinc-400">No products found</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Try adjusting or clearing your filters.
            </p>
            <button
              onClick={clearAll}
              className="mt-6 rounded-xl bg-[#c6ff00] px-6 py-2.5 text-sm font-bold text-black transition hover:bg-lime-300"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Products */}
        {!loading && displayProducts.length > 0 && (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {displayProducts.map((product) => (
              <div key={product.id} className="flex justify-center">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
