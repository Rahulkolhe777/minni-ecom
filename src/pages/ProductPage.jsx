import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Search, X, ChevronDown, Package, SlidersHorizontal, ArrowDown } from "lucide-react";
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

const getBroadCategory = (rawCat) => {
  const lower = rawCat?.toLowerCase() || "";
  for (const [display, slugs] of Object.entries(CATEGORY_MAP)) {
    if (slugs.includes(lower)) return display;
  }
  return "Other";
};

const SORT_OPTIONS = [
  { value: "default",    label: "Featured Items"    },
  { value: "price_asc",  label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating",     label: "Highest Customer Rating" },
  { value: "name_asc",   label: "Alphabetical: A → Z" },
  { value: "name_desc",  label: "Alphabetical: Z → A" },
];

const ITEMS_PER_PAGE = 20;

// ─────────────────────────────────────────────────────────────────────────────
const ProductPage = () => {
  const { productData, setProductData } = useContext(Auth);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Sync URL param → category filter
  useEffect(() => {
    const cat = searchParams.get("category") || "";
    setSelectedCategory(cat);
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchParams]);

  // Fetch products once if empty
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
          p.description?.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q)),
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
  const sortedProducts = useMemo(() => {
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

  // Slice for pagination
  const pagedProducts = useMemo(() => {
    return sortedProducts.slice(0, visibleCount);
  }, [sortedProducts, visibleCount]);

  const clearAll = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSortBy("default");
    setSearchParams({});
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const hasFilters = searchQuery || selectedCategory || sortBy !== "default";

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <div className="px-6 pt-10 pb-6 mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c6ff00]/30 bg-[#c6ff00]/10 mb-3">
              <SlidersHorizontal size={12} className="text-[#c6ff00]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#c6ff00]">
                SkyMart Storefront
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              All Products
            </h1>
          </div>

          <p className="text-sm text-zinc-400">
            {loading ? (
              <span>Catalog syncing…</span>
            ) : (
              <span>
                Showing <span className="text-white font-semibold">{pagedProducts.length}</span> of{" "}
                <span className="text-white font-semibold">{sortedProducts.length}</span> items
                {selectedCategory && (
                  <> in <span className="text-[#c6ff00] font-semibold">{selectedCategory}</span></>
                )}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* ── FILTER & SEARCH BAR ─────────────────────────────────────────── */}
      <div className="px-6 pb-8 mx-auto max-w-7xl">
        <div className="rounded-2xl border border-zinc-800/90 bg-[#121212] p-4.5 shadow-lg">
          {/* Controls Row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px]">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
              />
              <input
                type="text"
                placeholder="Search products by name, tag, category…"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
                className="
                  w-full rounded-xl border border-zinc-800 bg-zinc-900/90
                  py-2.5 pl-10 pr-9 text-sm text-zinc-100
                  placeholder-zinc-500 outline-none
                  focus:border-[#c6ff00] focus:ring-1 focus:ring-[#c6ff00]/30 transition-all
                "
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition cursor-pointer"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="relative min-w-[170px]">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedCategory(val);
                  setVisibleCount(ITEMS_PER_PAGE);
                  if (val) {
                    setSearchParams({ category: val });
                  } else {
                    setSearchParams({});
                  }
                }}
                className="
                  w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-900/90
                  py-2.5 pl-4 pr-10 text-sm text-zinc-200
                  outline-none focus:border-[#c6ff00] focus:ring-1 focus:ring-[#c6ff00]/30 transition-all cursor-pointer
                "
              >
                <option value="">All Categories</option>
                {displayCategories.filter(Boolean).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative min-w-[190px]">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
                className="
                  w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-900/90
                  py-2.5 pl-4 pr-10 text-sm text-zinc-200
                  outline-none focus:border-[#c6ff00] focus:ring-1 focus:ring-[#c6ff00]/30 transition-all cursor-pointer
                "
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
              />
            </div>

            {/* Reset Filters */}
            {hasFilters && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-xs font-bold text-rose-400 transition hover:bg-rose-500/20 active:scale-95 cursor-pointer"
              >
                <X size={14} />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Active Filter Chips */}
          {hasFilters && (
            <div className="mt-3.5 flex flex-wrap items-center gap-2 pt-3 border-t border-zinc-800/80 animate-fade-in">
              <span className="text-xs text-zinc-500">Active Filters:</span>
              {selectedCategory && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c6ff00]/30 bg-[#c6ff00]/10 px-3 py-1 text-xs font-semibold text-[#c6ff00]">
                  Category: {selectedCategory}
                  <button
                    onClick={() => {
                      setSelectedCategory("");
                      setSearchParams({});
                    }}
                    className="hover:text-white transition cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300">
                  Search: "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:text-white transition cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {sortBy !== "default" && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300">
                  Sorted: {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                  <button
                    onClick={() => setSortBy("default")}
                    className="hover:text-white transition cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── PRODUCT GRID ────────────────────────────────────────────────── */}
      <div className="px-6 mx-auto max-w-7xl">
        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-[360px] rounded-[24px] border border-zinc-800 bg-[#121212] shimmer-loading"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && sortedProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-28 text-center rounded-3xl border border-zinc-800/80 bg-[#121212]">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-800/80 text-zinc-500 mb-4">
              <Package size={32} />
            </div>
            <h3 className="text-xl font-bold text-zinc-200 font-display">No matching products found</h3>
            <p className="mt-2 text-sm text-zinc-500 max-w-sm">
              We couldn't find anything matching your search criteria. Try modifying or clearing your filters.
            </p>
            <button
              onClick={clearAll}
              className="mt-6 rounded-xl bg-[#c6ff00] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-[#b3ea00] cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Product Card Grid */}
        {!loading && sortedProducts.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {pagedProducts.map((product) => (
                <div key={product.id} className="flex justify-center">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Load More Pagination Bar */}
            {visibleCount < sortedProducts.length && (
              <div className="mt-14 flex flex-col items-center justify-center gap-3">
                <p className="text-xs text-zinc-500">
                  Showing {pagedProducts.length} of {sortedProducts.length} products
                </p>
                <div className="w-48 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#c6ff00] rounded-full transition-all duration-300"
                    style={{ width: `${(pagedProducts.length / sortedProducts.length) * 100}%` }}
                  />
                </div>
                <button
                  onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                  className="mt-2 flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/90 px-6 py-3 text-sm font-bold text-white transition hover:border-[#c6ff00] hover:text-[#c6ff00] hover:shadow-[0_0_20px_rgba(198,255,0,0.15)] active:scale-95 cursor-pointer"
                >
                  <span>Load More Products</span>
                  <ArrowDown size={15} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
