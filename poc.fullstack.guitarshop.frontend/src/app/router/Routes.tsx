import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../pages/home/HomePage";
import SimulateErrorsPage from "../../pages/error/SimulateErrorsPage";
import ContactPage from "../../pages/contact/ContactPage";
import ServerErrorPage from "../../pages/error/ServerErrorPage";
import NotFoundErrorPage from "../../pages/error/NotFoundErrorPage";
import BasketPage from "../../pages/basket/BasketPage";
import CatalogPage from "../../pages/catalog/CatalogPage";
import CatalogProductDetailsPage from "../../pages/catalog/CatalogProductDetailsPage";
import CheckoutPage from "../../pages/checkout/CheckoutPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'catalog', element: <CatalogPage />},
            {path: 'catalog/:id', element: <CatalogProductDetailsPage />},
            {path: 'contact', element: <ContactPage />},
            {path: 'basket', element: <BasketPage />},
            {path: 'checkout', element: <CheckoutPage />},

            {path: 'simulate-errors', element: <SimulateErrorsPage />},
            {path: 'server-error', element: <ServerErrorPage />},
            {path: 'not-found', element: <NotFoundErrorPage />},
            {path: '*', element: <Navigate replace to='/not-found' />}
        ]
    }
])