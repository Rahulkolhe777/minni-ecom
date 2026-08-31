import React, { useContext, useState } from "react";
import { ShoppingCart, Check, Star, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import { Auth } from "../context/Auth";
import { toast } from "react-toastify";

// Helper category badge color styling
const getCategoryStyle = (category = "") => {
  const c = category.toLowerCase();
  if (c.includes("beauty") || c.includes("skin") || c.includes("fragrance")) {
    return "bg-rose-500/20 text-rose-300 border-rose-500/30";
  }
  if (c.includes("electronic") || c.includes("laptop") || c.includes("phone")) {
    return "bg-sky-500/20 text-sky-300 border-sky-500/30";
  }
  if (c.includes("grocer") || c.includes("food")) {
    return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
  }
  if (c.includes("furnitur") || c.includes("home")) {
    return "bg-amber-500/20 text-amber-300 border-amber-500/30";
  }
  return "bg-zinc-800/80 text-zinc-300 border-zinc-700/50";
};

const ProductCard = ({ product }) => {
  const { cartItems, addToCart, setIsCartOpen } = useContext(Auth);
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setIsCartOpen(true);
    toast.success(`${product.title.slice(0, 26)}… added to cart`, {
      position: "bottom-right",
      autoClose: 2000,
      theme: "dark",
    });
  };

  const handleCardClick = () => {
    navigate(`/main/shop/${product.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="
        group
        relative
        flex
        flex-col
        w-full
        max-w-[285px]
        overflow-hidden
        rounded-[24px]
        border
        border-zinc-800/90
        bg-[#121212]
        text-white
        transition-all
        duration-300
        hover:border-[#c6ff00]/50
        hover:-translate-y-1.5
        hover:shadow-[0_16px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(198,255,0,0.09)]
        cursor-pointer
      "
    >
      {/* ================= IMAGE CONTAINER ================= */}
      <div className="relative mx-3 mt-3 h-[205px] overflow-hidden rounded-[20px] bg-gradient-to-b from-[#f8f9fa] to-[#eceff1] border border-zinc-700/20">
        {/* Shimmer skeleton loader until image is loaded */}
        {!imageLoaded && (
          <div className="absolute inset-0 shimmer-loading z-0" />
        )}

        {/* Category badge */}
        <span
          className={`
            absolute
            left-3
            top-3
            z-10
            rounded-full
            border
            px-2.5
            py-1
            text-[10px]
            font-bold
            uppercase
            tracking-wider
            backdrop-blur-md
            ${getCategoryStyle(product.category)}
          `}
        >
          {product.category}
        </span>

        {/* Quick View Icon hint on hover */}
        <div className="absolute right-3 top-3 z-10 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/15 shadow-md">
            <Eye size={14} />
          </div>
        </div>

        {/* Product photo */}
        <div className="flex h-full w-full items-center justify-center p-5">
          <img
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`
              h-full
              w-full
              object-contain
              transition-all
              duration-500
              group-hover:scale-108
              ${imageLoaded ? "opacity-100" : "opacity-0"}
            `}
          />
        </div>
      </div>

      {/* ================= DETAILS FOOTER ================= */}
      <div className="flex flex-1 flex-col justify-between p-4.5">
        <div>
          {/* Subtitle / Category text */}
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            {product.brand || product.category}
          </p>

          {/* Title */}
          <h3
            className="
              mt-1
              min-h-[42px]
              line-clamp-2
              text-[14px]
              font-semibold
              leading-snug
              text-zinc-100
              transition-colors
              group-hover:text-[#c6ff00]
            "
          >
            {product.title}
          </h3>

          {/* Rating */}
          <div className="mt-2.5 flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={12}
                  strokeWidth={1.5}
                  fill={star <= Math.round(product.rating) ? "#facc15" : "none"}
                  color="#facc15"
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-zinc-300">
              {product.rating?.toFixed(1)}
            </span>
            <span className="text-[11px] text-zinc-500">
              ({product.reviews?.length || 0})
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-3.5 h-px bg-zinc-800/80" />

        {/* Price & Add to Cart button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[20px] font-bold text-[#c6ff00] font-display">
              ${product.price}
            </span>
          </div>

          {isInCart ? (
            <button
              onClick={handleAddToCart}
              aria-label="Item already in cart"
              className="
                flex
                items-center
                gap-1.5
                rounded-xl
                border
                border-emerald-500/40
                bg-emerald-500/20
                px-3.5
                py-2
                text-xs
                font-bold
                text-emerald-400
                transition-all
                hover:bg-emerald-500/30
                cursor-pointer
              "
            >
              <Check size={13} />
              <span>Added</span>
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              aria-label={`Add ${product.title} to cart`}
              className="
                flex
                items-center
                gap-1.5
                rounded-xl
                bg-[#c6ff00]
                px-3.5
                py-2
                text-xs
                font-bold
                text-black
                shadow-sm
                transition-all
                duration-200
                hover:scale-105
                hover:bg-[#b3ea00]
                hover:shadow-[0_0_15px_rgba(198,255,0,0.3)]
                active:scale-95
                cursor-pointer
              "
            >
              <ShoppingCart size={13} />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;