import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { cartLoader } from "./utils/cart";
import { checkAuthLoader, tokenLoader } from "./utils/auth";
import RelatedProductProvider from "./context/RelatedProductProvider";

import Spinner from "react-bootstrap/Spinner";

import Root from "./components/Layout/Root";
import Error from "./pages/Error";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Lazy routes are resolved on initial load and during the loading or submitting
// Each lazy function will typically return the result of a dynamic import.
const HomePage = lazy(() => import("./pages/HomePage"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const DetailPage = lazy(() => import("./pages/DetailPage"));

const Loader = () => {
    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <Spinner animation="border" />
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        id: "root",
        loader: tokenLoader,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<Loader />}>
                        <HomePage />
                    </Suspense>
                ),
                loader: () =>
                    import("./API/data").then(module => module.loader()),
            },
            {
                path: "shop",
                element: (
                    <Suspense fallback={<Loader />}>
                        <ShopPage />
                    </Suspense>
                ),
                loader: () =>
                    import("./API/data").then(module => module.loader()),
            },
            {
                path: "detail/:productId",
                element: (
                    <Suspense fallback={<Loader />}>
                        <DetailPage />
                    </Suspense>
                ),
                loader: meta =>
                    import("./API/data").then(module =>
                        module.loadDetail(meta),
                    ),
            },
            { path: "cart", element: <CartPage />, loader: cartLoader },
            {
                path: "checkout",
                element: <CheckoutPage />,
                loader: checkAuthLoader,
            },

            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "logout" },
        ],
    },
]);

function App() {
    return (
        <RelatedProductProvider>
            <RouterProvider router={router} />
        </RelatedProductProvider>
    );
}

export default App;
