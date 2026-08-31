import React, { useContext, useEffect } from "react";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router";
import { Auth } from "../context/Auth";

const CartScreen = ({ onClose }) => {
  const { cartItems, removeFromCart, updateQty, clearCart } = useContext(Auth);
  const navigate = useNavigate();

  // Close cart on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* ================= BACKDROP OVERLAY ================= */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="
          absolute inset-0
          bg-black/80
          backdrop-blur-sm
          animate-fade-in
          transition-opacity
        "
      />

      {/* ================= CART SLIDE-IN DRAWER ================= */}
      <div
        className="
          absolute right-0 top-0
          flex h-full
          w-full
          max-w-md
          flex-col
          bg-[#121212]
          text-white
          shadow-[0_0_60px_rgba(0,0,0,0.8)]
          border-l
          border-zinc-800/80
          animate-slide-in-right
        "
      >
        {/* ================= HEADER ================= */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-zinc-800/80 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c6ff00]/10 text-[#c6ff00]">
              <ShoppingBag size={20} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white font-display">
                  Your Cart
                </h2>
                <span className="rounded-full border border-[#c6ff00]/30 bg-[#c6ff00]/10 px-2 py-0.5 text-[11px] font-bold text-[#c6ff00]">
                  {totalItems}
                </span>
              </div>
              <p className="text-xs text-zinc-500">Free shipping on orders over $50</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-600 hover:text-white transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* ================= CART CONTENT ================= */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cartItems.length === 0 ? (
            /* EMPTY CART STATE */
            <div className="flex h-full flex-col items-center justify-center text-center px-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-900/80 border border-zinc-800 text-zinc-600 mb-5">
                <ShoppingBag size={36} strokeWidth={1.5} />
              </div>

              <h3 className="text-xl font-bold text-white font-display">
                Your cart is empty
              </h3>

              <p className="mt-2 text-sm text-zinc-400 max-w-xs leading-relaxed">
                Looks like you haven't added anything to your cart yet. Discover something great today!
              </p>

              <button
                onClick={() => {
                  onClose();
                  navigate("/main/shop");
                }}
                className="mt-6 flex items-center gap-2 rounded-xl bg-[#c6ff00] px-6 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-md hover:bg-[#b3ea00] hover:shadow-[0_0_20px_rgba(198,255,0,0.3)] transition cursor-pointer"
              >
                <span>Browse Products</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            /* CART ITEM LIST */
            <div className="space-y-3.5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-3.5 transition hover:border-zinc-700"
                >
                  <div className="flex gap-3.5">
                    {/* Item Image with warm neutral background */}
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#f8f9fa] to-[#eceff1] p-1.5 border border-zinc-700/30">
                      <img
                        src={item.thumbnail || item.images?.[0]}
                        alt={item.title}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="min-w-0 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            onClick={() => {
                              onClose();
                              navigate(`/main/shop/${item.id}`);
                            }}
                            className="truncate text-sm font-semibold text-zinc-100 hover:text-[#c6ff00] transition cursor-pointer"
                            title={item.title}
                          >
                            {item.title}
                          </h4>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.title} from cart`}
                            className="text-zinc-500 hover:text-rose-400 transition cursor-pointer"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <p className="text-xs text-zinc-500 mt-0.5">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      {/* Price & Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-base font-bold text-[#c6ff00] font-display">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>

                        <div className="flex items-center rounded-xl border border-zinc-800 bg-zinc-900/90 p-0.5">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>

                          <span className="w-7 text-center text-xs font-bold text-zinc-200">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-[#c6ff00] transition cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= FOOTER ================= */}
        {cartItems.length > 0 && (
          <div className="shrink-0 border-t border-zinc-800/80 bg-zinc-950/60 p-6 backdrop-blur-md">
            {/* Summary */}
            <div className="mb-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Subtotal ({totalItems} items)</span>
                <span className="text-zinc-200 font-semibold">${total.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Shipping</span>
                <span className="text-emerald-400 font-semibold">
                  {total >= 50 ? "FREE" : "$4.99"}
                </span>
              </div>
              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-sm font-bold text-white">Order Total</span>
                <span className="text-2xl font-black text-[#c6ff00] font-display">
                  ${(total + (total >= 50 ? 0 : 4.99)).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              className="
                flex
                w-full
                h-13
                items-center
                justify-center
                gap-2.5
                rounded-2xl
                bg-[#c6ff00]
                text-sm
                font-bold
                text-black
                shadow-lg
                transition-all
                duration-200
                hover:bg-[#b3ea00]
                hover:shadow-[0_0_25px_rgba(198,255,0,0.3)]
                active:scale-98
                cursor-pointer
              "
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={17} />
            </button>

            {/* Clear Cart */}
            <button
              onClick={clearCart}
              className="mt-3 w-full text-center text-xs font-semibold text-zinc-500 hover:text-rose-400 transition cursor-pointer"
            >
              Clear all items
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartScreen;