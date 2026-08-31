import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
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
} from "lucide-react";
import axios from "axios";
import { Auth } from "../context/Auth";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON LOADER
// ─────────────────────────────────────────────────────────────────────────────
const Skeleton = ({ className }) => (
  <div className={`animate-pulse rounded-xl bg-zinc-800 ${className}`} />
);

const DetailSkeleton = () => (
  <div className="mx-auto max-w-7xl px-6 py-10">
    <Skeleton className="mb-8 h-5 w-64" />
    <div className="grid gap-10 lg:grid-cols-2">
      <Skeleton className="h-[420px] rounded-3xl" />
      <div className="space-y-5">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-px w-full" />
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-14 w-full rounded-2xl" />
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// BENEFITS BAR
// ─────────────────────────────────────────────────────────────────────────────
const benefits = [
  { icon: Truck,        title: "Free Delivery",    sub: "On orders $50+" },
  { icon: ShieldCheck,  title: "Secure Pay",       sub: "256-bit SSL"    },
  { icon: RotateCcw,    title: "Easy Returns",     sub: "30-day policy"  },
];

const BenefitsBar = () => (
  <div className="mt-6 grid grid-cols-3 gap-3">
    {benefits.map(({ icon: Icon, title, sub }) => (
      <div
        key={title}
        className="flex flex-col items-center gap-1.5 rounded-2xl border border-zinc-800 bg-[#111] p-4 text-center"
      >
        <Icon size={18} className="text-[#c6ff00]" />
        <p className="text-[12px] font-bold text-white">{title}</p>
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

  const [product, setProduct]       = useState(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [addedFeedback, setAddedFeedback] = useState(false);

  // ── Ensure product list is loaded (shared context) ───────────────────────
  useEffect(() => {
    if (productData.length === 0) {
      axios
        .get("https://dummyjson.com/products?limit=0")
        .then((r) => setProductData(r.data.products))
        .catch(console.error);
    }
  }, []);

  // ── Fetch single product by ID ───────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    setError(null);
    setActiveImage(0);

    axios
      .get(`https://dummyjson.com/products/${productId}`)
      .then((r) => setProduct(r.data))
      .catch(() => setError("Product not found."))
      .finally(() => setLoading(false));
  }, [productId]);

  // ── Navigation helpers ───────────────────────────────────────────────────
  const allIds = useMemo(
    () => productData.map((p) => p.id).sort((a, b) => a - b),
    [productData],
  );

  const currentIndex = allIds.indexOf(Number(productId));
  const prevId = currentIndex > 0 ? allIds[currentIndex - 1] : null;
  const nextId = currentIndex < allIds.length - 1 ? allIds[currentIndex + 1] : null;

  // ── Related products (same category, not current) ────────────────────────
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return productData
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 6);
  }, [productData, product]);

  // ── Cart helpers ─────────────────────────────────────────────────────────
  const isInCart = cartItems.some((i) => i.id === product?.id);

  const handleAddToCart = () => {
    addToCart(product);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
    setIsCartOpen(true);
    toast.success(`${product.title.slice(0, 30)}… added to cart`, {
      position: "bottom-right",
      autoClose: 2000,
      theme: "dark",
    });
  };

  // ── Image list ───────────────────────────────────────────────────────────
  const images = product?.images?.length > 0
    ? product.images
    : product?.thumbnail
    ? [product.thumbnail]
    : [];

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <DetailSkeleton />
    </div>
  );

  if (error || !product) return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0a0a0a] text-white">
      <p className="text-xl font-bold text-zinc-400">{error || "Product not found."}</p>
      <button
        onClick={() => navigate("/main/shop")}
        className="rounded-xl bg-[#c6ff00] px-6 py-3 text-sm font-bold text-black"
      >
        Back to Shop
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* ── BREADCRUMB ─────────────────────────────────────────────────── */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-zinc-500">
          <button
            onClick={() => navigate("/main/shop")}
            className="flex items-center gap-1 hover:text-white transition"
          >
            <ArrowLeft size={14} />
            Products
          </button>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-zinc-300 line-clamp-1">{product.title}</span>
        </nav>

        {/* ── MAIN PRODUCT GRID ──────────────────────────────────────────── */}
        <div className="grid gap-12 lg:grid-cols-2">

          {/* LEFT — IMAGE ─────────────────────────────────────────────────── */}
          <div>
            {/* Main image */}
            <div className="relative overflow-hidden rounded-3xl bg-white p-6 flex items-center justify-center"
                 style={{ minHeight: "380px" }}>
              <img
                key={activeImage}
                src={images[activeImage] || product.thumbnail}
                alt={product.title}
                className="max-h-[360px] w-full object-contain transition-all duration-400"
                style={{ animation: "fadeIn 0.3s ease" }}
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`shrink-0 h-16 w-16 overflow-hidden rounded-xl border-2 bg-white transition ${
                      activeImage === idx
                        ? "border-[#c6ff00]"
                        : "border-zinc-800 hover:border-zinc-600"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`thumb-${idx}`}
                      className="h-full w-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — INFO ──────────────────────────────────────────────────── */}
          <div className="flex flex-col">

            {/* Category badge */}
            <span className="mb-3 inline-block w-fit rounded-full bg-[#c6ff00]/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#c6ff00]">
              {product.category}
            </span>

            {/* Title */}
            <h1 className="mb-4 text-3xl font-black leading-tight text-white lg:text-4xl">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="mb-5 flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    fill={star <= Math.round(product.rating) ? "#facc15" : "none"}
                    color="#facc15"
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-zinc-300">
                {product.rating?.toFixed(1)}
              </span>
              <span className="text-sm text-zinc-500">
                ({product.reviews?.length || 0} reviews)
              </span>
            </div>

            {/* Divider */}
            <div className="mb-5 h-px bg-zinc-800" />

            {/* Price */}
            <p className="mb-5 text-4xl font-black text-[#c6ff00]">
              ${product.price}
            </p>

            {/* Description */}
            <p className="mb-8 text-[15px] leading-relaxed text-zinc-400">
              {product.description}
            </p>

            {/* ADD TO CART */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex flex-1 items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold transition-all active:scale-95 ${
                  addedFeedback || isInCart
                    ? "border border-green-800 bg-[#062b17] text-green-400"
                    : "bg-[#c6ff00] text-black hover:bg-lime-300 hover:scale-[1.02]"
                }`}
              >
                {addedFeedback || isInCart ? (
                  <><Check size={18} /> Added to Cart</>
                ) : (
                  <><ShoppingCart size={18} /> Add to Cart</>
                )}
              </button>

              {/* Wishlist placeholder */}
              <button className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-zinc-800 bg-[#111] text-zinc-500 transition hover:border-zinc-600 hover:text-red-400">
                <Heart size={20} />
              </button>
            </div>

            {/* BENEFITS */}
            <BenefitsBar />
          </div>
        </div>

        {/* ── PREV / NEXT ─────────────────────────────────────────────────── */}
        <div className="mt-12 flex items-center gap-4">
          <button
            onClick={() => prevId && navigate(`/main/shop/${prevId}`)}
            disabled={!prevId}
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border py-4 text-sm font-bold transition ${
              prevId
                ? "border-zinc-700 bg-[#111] text-white hover:border-zinc-500"
                : "border-zinc-900 bg-[#0d0d0d] text-zinc-700 cursor-not-allowed"
            }`}
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          <button
            onClick={() => nextId && navigate(`/main/shop/${nextId}`)}
            disabled={!nextId}
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold transition ${
              nextId
                ? "bg-[#c6ff00] text-black hover:bg-lime-300 hover:scale-[1.02] active:scale-95"
                : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
            }`}
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>

        {/* ── RELATED PRODUCTS ────────────────────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-black text-white">
              Related Products
            </h2>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {relatedProducts.map((p) => (
                <div key={p.id} className="flex justify-center">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* fade-in keyframe via inline style */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1);    }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailsPage;
