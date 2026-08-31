import React, { useContext } from "react";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { Auth } from "../context/Auth";

const CartScreen = ({ onClose }) => {
  const { cartItems, removeFromCart, updateQty, clearCart } = useContext(Auth);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <div className="fixed inset-0 z-50">

      {/* ================= OVERLAY ================= */}
      <div
        onClick={onClose}
        className="
          absolute inset-0
          bg-black/70
          backdrop-blur-[6px]
          animate-[fadeIn_0.2s_ease]
        "
      />

      {/* ================= CART DRAWER ================= */}
      <div
        className="
          absolute right-0 top-0
          flex h-full
          w-full
          flex-col
          bg-[#111111]
          text-white
          shadow-2xl
          animate-[slideIn_0.3s_ease]

          sm:w-[420px]
          md:w-[460px]
          lg:w-[490px]
        "
        style={{ animation: "slideIn 0.3s cubic-bezier(0.32,0.72,0,1)" }}
      >
        <style>{`
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to   { transform: translateX(0);    }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
        `}</style>

        {/* ================= HEADER ================= */}
        <div
          className="
            flex
            h-[90px]
            shrink-0
            items-center
            justify-between
            border-b
            border-[#2a2a2a]
            px-7
          "
        >

          {/* Left */}
          <div className="flex items-center gap-4">
            <ShoppingBag
              size={25}
              strokeWidth={2}
              className="text-lime-400"
            />

            <h2 className="text-[23px] font-semibold">
              Cart
            </h2>

            <span
              className="
                rounded-full
                bg-[#1a2e00]
                px-3
                py-1
                text-xs
                font-semibold
                text-lime-400
              "
            >
              {totalItems} items
            </span>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="
              text-gray-500
              transition
              hover:text-white
            "
          >
            <X size={23} />
          </button>
        </div>


        {/* ================= CART CONTENT ================= */}
        <div
          className="
            flex-1
            overflow-y-auto
            px-7
            py-5
          "
        >

          {cartItems.length === 0 ? (

            /* EMPTY CART */
            <div
              className="
                flex
                h-full
                flex-col
                items-center
                justify-center
                text-center
              "
            >

              <ShoppingBag
                size={55}
                strokeWidth={1.5}
                className="mb-5 text-gray-700"
              />

              <h2 className="text-xl font-semibold">
                Your cart is empty
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Add some products to get started.
              </p>

            </div>

          ) : (

            /* CART ITEMS */
            <div className="space-y-4">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="
                    rounded-[22px]
                    border
                    border-[#2a2a2a]
                    p-3
                    transition
                    hover:border-[#3a3a3a]
                  "
                >

                  {/* Product Row */}
                  <div className="flex gap-4">

                    {/* IMAGE */}
                    <div
                      className="
                        flex
                        h-[85px]
                        w-[85px]
                        shrink-0
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-[14px]
                        bg-white
                      "
                    >
                      <img
                        src={item.thumbnail || item.images?.[0]}
                        alt={item.title}
                        className="
                          h-full
                          w-full
                          object-contain
                          p-2
                        "
                      />
                    </div>


                    {/* PRODUCT INFO */}
                    <div className="min-w-0 flex-1">

                      <h3
                        className="
                          truncate
                          text-[15px]
                          font-semibold
                          text-gray-200
                        "
                      >
                        {item.title}
                      </h3>

                      <p
                        className="
                          mt-2
                          text-[18px]
                          font-bold
                          text-lime-400
                        "
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>

                      <p className="text-xs text-gray-600">
                        ${item.price.toFixed(2)} each
                      </p>

                    </div>


                    {/* DELETE */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="
                        self-start
                        pt-1
                        text-red-700
                        transition
                        hover:text-red-400
                      "
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>


                  {/* ================= QUANTITY ================= */}
                  <div
                    className="
                      mt-3
                      flex
                      items-center
                      justify-center
                      gap-5
                    "
                  >

                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-[#333]
                        text-gray-400
                        transition
                        hover:border-gray-500
                        hover:text-white
                      "
                    >
                      <Minus size={15} />
                    </button>


                    <span className="min-w-[20px] text-center font-semibold text-lg">
                      {item.quantity}
                    </span>


                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-[#333]
                        text-gray-400
                        transition
                        hover:border-lime-500
                        hover:text-lime-400
                      "
                    >
                      <Plus size={15} />
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* ================= FOOTER ================= */}
        {cartItems.length > 0 && (

          <div
            className="
              shrink-0
              border-t
              border-[#2a2a2a]
              px-7
              py-6
            "
          >

            {/* TOTAL */}
            <div className="mb-6 flex items-center justify-between">

              <span className="text-[15px] text-gray-500">
                Total
              </span>

              <span className="text-[24px] font-bold">
                ${total.toFixed(2)}
              </span>

            </div>


            {/* CHECKOUT */}
            <button
              className="
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-[18px]
                bg-lime-400
                py-4
                text-[17px]
                font-semibold
                text-black
                transition
                hover:bg-lime-300
                active:scale-95
              "
            >
              Checkout
              <ArrowRight size={21} />
            </button>


            {/* CLEAR CART */}
            <button
              onClick={clearCart}
              className="
                mt-5
                w-full
                text-sm
                text-gray-600
                transition
                hover:text-red-400
              "
            >
              Clear cart
            </button>

          </div>

        )}

      </div>

    </div>
  );
};

export default CartScreen;