import { createBrowserRouter } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Home from "../pages/Home";
import App from "../pages/App";

export const Routes = createBrowserRouter([{
    path: "/",
    element: <App />,
    children: [
        { path: "", element: <Welcome /> },
        { path: "home", element: <Home /> },
    ],
}])