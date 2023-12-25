import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./Pages/HomePage";
import Navbar from "./Components/Navbar";
import SinglePage from "./Pages/SinglePage";
import React from "react";
import { CryptoProvider } from "./Context/CryptoContext";

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
    <div className=" min-h-screen bg-gray-900 text-white">
      <CryptoProvider>
        <RouterProvider router={router} />
      </CryptoProvider>
    </div>
  );
}

export default App;
