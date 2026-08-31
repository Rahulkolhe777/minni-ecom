import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ShoppingCart,
  Check,
  Star,
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  ArrowLeft,
  Heart,
  Plus,
  Minus,
  Box,
  FileText,
  MessageSquare,
} from "lucide-react";
import axios from "axios";
import { Auth } from "../context/Auth";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON LOADER FOR DETAILS PAGE
// ─────────────────────────────────────────────────────────────────────────────
const DetailSkeleton = () => (
  <div className="mx-auto max-w-7xl px-6 py-10 animate-fade-in">
    <div className="mb-8 h-5 w-64 rounded-lg bg-zinc-800 shimmer-loading" />
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="h-[440px] rounded-3xl bg-zinc-900 shimmer-loading" />
      <div className="space-y-5">
        <div className="h-6 w-24 rounded-full bg-zinc-800 shimmer-loading" />
        <div className="h-10 w-3/4 rounded-xl bg-zinc-800 shimmer-loading" />
        <div className="h-5 w-40 rounded-lg bg-zinc-800 shimmer-loading" />
        <div className="h-px w-full bg-zinc-800" />
        <div className="h-10 w-32 rounded-xl bg-zinc-800 shimmer-loading" />
        <div className="h-24 w-full rounded-2xl bg-zinc-900 shimmer-loading" />
        <div className="h-14 w-full rounded-2xl bg-zinc-800 shimmer-loading" />
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// BENEFITS BAR (Consistent with Home Page trust indicators)
// ─────────────────────────────────────────────────────────────────────────────
const benefits = [
  { icon: Truck, title: "Free Delivery", sub: "On orders $50+" },
  { icon: ShieldCheck, title: "Secure Checkout", sub: "256-bit SSL" },
  { icon: RotateCcw, title: "Easy 30D Return", sub: "Hassle-free guarantee" },
];

const BenefitsBar = () => (
  <div className="mt-8 grid grid-cols-3 gap-3">
    {benefits.map(({ icon: Icon, title, sub }) => (
      <div
        key={title}
        className="flex flex-col items-center gap-1.5 rounded-2xl border border-zinc-800/90 bg-zinc-900/60 p-4 text-center backdrop-blur-sm transition hover:border-zinc-700"
      >
        <Icon size={20} className="text-[#c6ff00]" />
        <p className="text-xs font-bold text-zinc-200 font-display">{title}</p>
        <p className="text-[11px] text-zinc-500">{sub}</p>
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT DETAILS PAGE
// ─────────────────────────────────────────────────────────────────────────────
const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { productData, setProductData, cartItems, addToCart, setIsCartOpen } =
    useContext(Auth);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [mainImgLoaded, setMainImgLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState("description"); // "description" | "specs" | "reviews"

  // Ensure product list is loaded for related items and navigation
  useEffect(() => {
    if (productData.length === 0) {
      axios
        .get("https://dummyjson.com/products?limit=0")
        .then((r) => setProductData(r.data.products))
        .catch(console.error);
    }
  }, []);

  // Fetch single product by ID
  useEffect(() => {
    setLoading(true);
    setError(null);
    setActiveImage(0);
    setMainImgLoaded(false);
    setQuantity(1);

    axios
      .get(`https://dummyjson.com/products/${productId}`)
      .then((r) => setProduct(r.data))
      .catch(() => setError("Product not found."))
      .finally(() => setLoading(false));
  }, [productId]);

  // Navigation helpers
  const allIds = useMemo(
    () => productData.map((p) => p.id).sort((a, b) => a - b),
    [productData],
  );

  const currentIndex = allIds.indexOf(Number(productId));
  const prevId = currentIndex > 0 ? allIds[currentIndex - 1] : null;
  const nextId = currentIndex < allIds.length - 1 ? allIds[currentIndex + 1] : null;

  // Related products
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return productData
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 5);
  }, [productData, product]);

  const isInCart = cartItems.some((i) => i.id === product?.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
    setIsCartOpen(true);
    toast.success(
      `${quantity > 1 ? `${quantity}x ` : ""}${product.title.slice(0, 26)}… added to cart`,
      {
        position: "bottom-right",
        autoClose: 2000,
        theme: "dark",
      },
    );
  };

  const images =
    product?.images?.length > 0
      ? product.images
      : product?.thumbnail
      ? [product.thumbnail]
      : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <DetailSkeleton />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#0a0a0a] px-6 text-center text-white">
        <p className="text-2xl font-bold text-zinc-300 font-display">{error || "Product not found."}</p>
        <button
          onClick={() => navigate("/main/shop")}
          className="rounded-xl bg-[#c6ff00] px-7 py-3 text-sm font-bold text-black hover:bg-[#b3ea00] cursor-pointer"
        >
          Back to Storefront
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* ── BREADCRUMB ─────────────────────────────────────────────────── */}
        <nav className="mb-8 flex items-center gap-2 text-xs sm:text-sm text-zinc-500">
          <button
            onClick={() => navigate("/main/shop")}
            className="flex items-center gap-1 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Store</span>
          </button>
          <span>/</span>
          <button
            onClick={() => navigate(`/main/shop?category=${encodeURIComponent(product.category)}`)}
            className="capitalize hover:text-white transition cursor-pointer"
          >
            {product.category}
          </button>
          <span>/</span>
          <span className="text-zinc-300 truncate max-w-[200px] sm:max-w-xs">{product.title}</span>
        </nav>

        {/* ── MAIN PRODUCT SECTION ────────────────────────────────────────── */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* LEFT — GALLERY ──────────────────────────────────────────────── */}
          <div className="flex flex-col">
            {/* Main Image Container */}
            <div
              className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#f8f9fa] to-[#eceff1] p-8 flex items-center justify-center border border-zinc-700/20 shadow-xl"
              style={{ minHeight: "420px" }}
            >
              {/* Shimmer until loaded */}
              {!mainImgLoaded && (
                <div className="absolute inset-0 shimmer-loading z-0" />
              )}

              <img
                key={activeImage}
                src={images[activeImage] || product.thumbnail}
                alt={product.title}
                onLoad={() => setMainImgLoaded(true)}
                className={`max-h-[380px] w-full object-contain transition-all duration-400 ${
                  mainImgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              />
            </div>

            {/* Thumbnail Strip with Skeletons */}
            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (activeImage !== idx) {
                        setMainImgLoaded(false);
                        setActiveImage(idx);
                      }
                    }}
                    className={`shrink-0 h-18 w-18 overflow-hidden rounded-2xl border-2 bg-gradient-to-b from-[#f8f9fa] to-[#eceff1] p-1.5 transition-all duration-200 cursor-pointer ${
                      activeImage === idx
                        ? "border-[#c6ff00] shadow-[0_0_15px_rgba(198,255,0,0.3)] scale-105"
                        : "border-zinc-800 hover:border-zinc-600 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — INFO & ACTIONS ───────────────────────────────────────── */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category Pill */}
              <div className="mb-3.5 flex items-center gap-2">
                <span className="inline-block rounded-full border border-[#c6ff00]/30 bg-[#c6ff00]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#c6ff00]">
                  {product.category}
                </span>
                {product.stock && (
                  <span className="text-xs font-medium text-zinc-400">
                    • In Stock ({product.stock} units)
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display leading-[1.15]">
                {product.title}
              </h1>

              {/* Brand & Rating */}
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      fill={star <= Math.round(product.rating) ? "#facc15" : "none"}
                      color="#facc15"
                      strokeWidth={1.5}
                    />
                  ))}
                  <span className="ml-1.5 text-sm font-bold text-zinc-200">
                    {product.rating?.toFixed(1)}
                  </span>
                </div>
                <span className="text-zinc-600">•</span>
                <span className="text-sm text-zinc-400">
                  {product.reviews?.length || 0} customer reviews
                </span>
              </div>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-3">
                <p className="text-4xl font-black text-[#c6ff00] font-display">
                  ${product.price}
                </p>
                {product.discountPercentage && (
                  <span className="rounded-md bg-rose-500/20 px-2 py-0.5 text-xs font-bold text-rose-400">
                    -{Math.round(product.discountPercentage)}% OFF
                  </span>
                )}
              </div>

              {/* Content Tabs (Description / Specs / Reviews) */}
              <div className="mt-8">
                <div className="flex border-b border-zinc-800/80 gap-6">
                  {[
                    { id: "description", label: "Overview", icon: FileText },
                    { id: "specs", label: "Details & Specs", icon: Box },
                    { id: "reviews", label: `Reviews (${product.reviews?.length || 0})`, icon: MessageSquare },
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`flex items-center gap-2 pb-3 text-sm font-bold transition-all relative cursor-pointer ${
                        activeTab === id ? "text-[#c6ff00]" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Icon size={15} />
                      <span>{label}</span>
                      {activeTab === id && (
                        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#c6ff00] rounded-full" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="py-4">
                  {activeTab === "description" && (
                    <p className="text-[15px] leading-relaxed text-zinc-300 animate-fade-in">
                      {product.description}
                    </p>
                  )}

                  {activeTab === "specs" && (
                    <div className="grid grid-cols-2 gap-3 text-sm text-zinc-300 animate-fade-in">
                      <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                        <span className="text-xs text-zinc-500 block">Brand</span>
                        <span className="font-semibold">{product.brand || "SkyMart Selection"}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                        <span className="text-xs text-zinc-500 block">SKU</span>
                        <span className="font-semibold">{product.sku || `SKU-${product.id}`}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                        <span className="text-xs text-zinc-500 block">Weight</span>
                        <span className="font-semibold">{product.weight ? `${product.weight} kg` : "0.5 kg"}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                        <span className="text-xs text-zinc-500 block">Warranty</span>
                        <span className="font-semibold">{product.warrantyInformation || "1 Year Standard"}</span>
                      </div>
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div className="space-y-3 animate-fade-in max-h-48 overflow-y-auto pr-1">
                      {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((rev, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-zinc-200">{rev.reviewerName}</span>
                              <div className="flex text-amber-400 text-xs">
                                {"★".repeat(rev.rating)}
                              </div>
                            </div>
                            <p className="text-xs text-zinc-400 mt-1 italic">"{rev.comment}"</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-zinc-500">No verified reviews yet for this product.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quantity Selector & Add To Cart Button Row */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80">
              <div className="flex items-center gap-4">
                {/* Quantity Control */}
                <div className="flex items-center rounded-2xl border border-zinc-800 bg-zinc-900/90 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:opacity-30 cursor-pointer transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-bold text-zinc-100 font-display">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-white cursor-pointer transition"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAddToCart}
                  className={`flex flex-1 items-center justify-center gap-2.5 rounded-2xl h-13 px-6 text-sm font-bold shadow-lg transition-all duration-200 active:scale-98 cursor-pointer ${
                    addedFeedback || isInCart
                      ? "border border-emerald-500/40 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                      : "bg-[#c6ff00] text-black hover:bg-[#b3ea00] hover:shadow-[0_0_25px_rgba(198,255,0,0.3)] hover:scale-[1.01]"
                  }`}
                >
                  {addedFeedback || isInCart ? (
                    <>
                      <Check size={18} />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  title="Save to Wishlist"
                  className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-rose-500/50 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
                >
                  <Heart size={20} />
                </button>
              </div>

              {/* Benefits trust icons */}
              <BenefitsBar />
            </div>
          </div>
        </div>

        {/* ── PREV / NEXT NAVIGATION ───────────────────────────────────────── */}
        <div className="mt-14 flex items-center gap-4">
          <button
            onClick={() => prevId && navigate(`/main/shop/${prevId}`)}
            disabled={!prevId}
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border h-13 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              prevId
                ? "border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-zinc-600 hover:text-white active:scale-98"
                : "border-zinc-900 bg-zinc-950 text-zinc-700 cursor-not-allowed opacity-50"
            }`}
          >
            <ChevronLeft size={16} />
            <span>Previous Product</span>
          </button>

          <button
            onClick={() => nextId && navigate(`/main/shop/${nextId}`)}
            disabled={!nextId}
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border h-13 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              nextId
                ? "border-[#c6ff00]/40 bg-[#c6ff00]/10 text-[#c6ff00] hover:bg-[#c6ff00]/20 hover:border-[#c6ff00] active:scale-98"
                : "border-zinc-900 bg-zinc-950 text-zinc-700 cursor-not-allowed opacity-50"
            }`}
          >
            <span>Next Product</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* ── RELATED PRODUCTS ────────────────────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-10 border-t border-zinc-800/80">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white font-display">
                  You Might Also Like
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  More products in <span className="capitalize text-zinc-300">{product.category}</span>
                </p>
              </div>
              <button
                onClick={() => navigate(`/main/shop?category=${encodeURIComponent(product.category)}`)}
                className="text-xs font-bold uppercase tracking-wider text-[#c6ff00] hover:underline cursor-pointer"
              >
                View Category
              </button>
            </div>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {relatedProducts.map((p) => (
                <div key={p.id} className="flex justify-center">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
