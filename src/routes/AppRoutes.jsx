import React from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";

import AuthLayout from "../layout/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MainLayout from "../layout/MainLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoute from "./PublicRoute";
import About from "../pages/About";
import ProductPage from "../pages/ProductPage";
import HomePage from "../pages/HomePage";
import ProductDetailsPage from "../pages/ProductDetailsPage";


const AppRoutes = () => {
  let router = createBrowserRouter([
    // ── PUBLIC ROUTES (login / register) ─────────────────────────────────────
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          element: <AuthLayout />,
          children: [
            {
              index: true,
              element: <LoginPage />,
            },
            {
              path: "register",
              element: <RegisterPage />,
            },
          ],
        },
      ],
    },

    // ── PROTECTED ROUTES (everything under /main) ─────────────────────────────
    {
      path: "/main",
      element: <ProtectedRoutes />,
      children: [
        {
          // Pathless layout route — wraps all protected pages with Navbar
          element: <MainLayout />,
          children: [
            {
              index: true,          // matches /main exactly
              element: <HomePage />,
            },
            {
              path: "about",
              element: <About />,
            },
            {
              path: "shop",
              element: <ProductPage />,
            },
            {
              path: "shop/:productId",   // matches /main/shop/1, /main/shop/42 etc.
              element: <ProductDetailsPage />,
            },
          ],
        },
      ],
    },

    // ── FALLBACK ─────────────────────────────────────────────────────────────
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
