import { useState } from "react";
import { Auth } from "./Auth";

export { Auth } from "./Auth";

export const AuthProvider = ({ children }) => {
  const [registeredUser, setRegisteredUser] = useState(
    JSON.parse(localStorage.getItem("registeredUser")) || [],
  );
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null,
  );

  const [productData, setProductData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ─── Cart Helpers ────────────────────────────────────────────────────────────

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Auth.Provider
      value={{
        registeredUser,
        setRegisteredUser,
        loggedInUser,
        setLoggedInUser,
        cartItems,
        setCartItems,
        productData,
        setProductData,
        isCartOpen,
        setIsCartOpen,
        // cart helpers
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
      }}
    >
      {" "}
      {children}
    </Auth.Provider>
  );
};
