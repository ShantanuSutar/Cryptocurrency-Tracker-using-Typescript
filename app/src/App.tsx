import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./Pages/Home";
import { createRoot } from "react-dom/client";
import Navbar from "./Components/Navbar";
import SinglePage from "./Pages/SinglePage";
import React from "react";

const Layout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/coin/:id",
        element: <SinglePage />,
      },
    ],
  },
]);

function App() {
  return (
    <div className=" bg-gray-900 text-white min-h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
