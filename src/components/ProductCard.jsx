import React, { useContext } from "react";
import { ShoppingCart, Check, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { Auth } from "../context/Auth";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { cartItems, addToCart, setIsCartOpen } = useContext(Auth);
  const navigate = useNavigate();
  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setIsCartOpen(true);
    toast.success(`${product.title.slice(0, 30)}… added to cart`, {
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
        w-full
        max-w-[275px]
        overflow-hidden
        rounded-[28px]
        border
        border-[#343434]
        bg-[#111111]
        text-white
        transition-all
        duration-300
        hover:border-lime-500
        hover:-translate-y-1
        hover:shadow-[0_8px_30px_rgba(198,255,0,0.08)]
        cursor-pointer
      "
    >
      {/* ================= IMAGE SECTION ================= */}
      <div className="relative h-[220px] bg-white overflow-hidden">

        {/* Category badge */}
        <span
          className="
            absolute
            left-4
            top-4
            z-10
            rounded-full
            bg-[#00000080]
            px-3
            py-1.5
            text-[11px]
            font-semibold
            text-white
            backdrop-blur-sm
          "
        >
          {product.category}
        </span>

        {/* Image */}
        <div className="flex h-full w-full items-center justify-center px-7 py-6">
          <img
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
            className="
              h-full
              w-full
              object-contain
              transition-transform
              duration-500
              hover:scale-110
            "
          />
        </div>
      </div>

      {/* ================= DETAILS ================= */}
      <div className="px-5 py-4">

        {/* Category label */}
        <p className="mb-2 text-[12px] font-semibold uppercase tracking-widest text-[#555]">
          {product.category}
        </p>

        {/* Title */}
        <h2
          className="
            mb-3
            min-h-[40px]
            line-clamp-2
            text-[15px]
            font-semibold
            leading-[20px]
            text-[#dddddd]
          "
        >
          {product.title}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-[2px]">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={13}
                strokeWidth={2}
                fill={star <= Math.round(product.rating) ? "#facc15" : "none"}
                color="#facc15"
              />
            ))}
          </div>
          <span className="text-[12px] text-[#666]">
            ({product.reviews?.length || 0})
          </span>
        </div>

        {/* Divider */}
        <div className="mb-3 h-px bg-[#252525]" />

        {/* Price + Button */}
        <div className="flex items-center justify-between">
          <span className="text-[22px] font-bold text-lime-400">
            ${product.price}
          </span>

          {isInCart ? (
            <button
              onClick={handleAddToCart}
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-green-900
                bg-[#062b17]
                px-4
                py-2
                text-sm
                font-semibold
                text-green-400
                transition
                hover:bg-[#093d21]
              "
            >
              <Check size={14} />
              Added
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="
                flex
                items-center
                gap-2
                rounded-full
                bg-lime-400
                px-4
                py-2
                text-sm
                font-semibold
                text-black
                transition
                hover:scale-105
                hover:bg-lime-300
                active:scale-95
              "
            >
              <ShoppingCart size={14} />
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;