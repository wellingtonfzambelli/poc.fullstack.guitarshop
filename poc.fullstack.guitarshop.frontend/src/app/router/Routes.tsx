import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../components/home/HomePage";
import CatalogPage from "../../components/catalog/CatalogPage";
import SimulateErrorsPage from "../../components/error/SimulateErrorsPage";
import ContactPage from "../../components/contact/ContactPage";
import ProductDetails from "../../components/catalog/ProductDetails";
import ServerErrorPage from "../../components/error/ServerErrorPage";
import NotFoundErrorPage from "../../components/error/NotFoundErrorPage";
import BasketPage from "../../components/basket/BasketPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'catalog', element: <CatalogPage />},
            {path: 'catalog/:id', element: <ProductDetails />},
            {path: 'contact', element: <ContactPage />},
            {path: 'basket', element: <BasketPage />},

            {path: 'simulate-errors', element: <SimulateErrorsPage />},
            {path: 'server-error', element: <ServerErrorPage />},
            {path: 'not-found', element: <NotFoundErrorPage />},
            {path: '*', element: <Navigate replace to='/not-found' />}
        ]
    }
])