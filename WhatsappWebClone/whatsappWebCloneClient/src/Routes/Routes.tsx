import { createBrowserRouter, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Welcome from "../pages/Welcome";
import Home from "../pages/Home";
import App from "../pages/App";
import { AppContextProvider } from "../components/Contexts/appContext";

const isAuthenticated = () => {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken ? true : false;
}

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
    useEffect(() => {
        return () => {
            window.onpopstate = () => {
                localStorage.removeItem('accessToken');
            };
        };
    }, []);

    if (isAuthenticated()) {
        return element;
    } else {
        return <Navigate to="/" />;
    }
};

export const Routes = createBrowserRouter([
    {
        path: "/",
        element: <AppContextProvider> <App /></AppContextProvider>,
        children: [
            { path: "", element: <Welcome /> },
            { path: "home", element: <ProtectedRoute element={<Home />} /> },
        ],
    }
]);
