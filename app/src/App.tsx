import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./Pages/HomePage";
import Navbar from "./Components/Navbar/Navbar";
import React from "react";
import { CryptoProvider } from "./Context/CryptoContext";
import SingleCoinPage from "./Pages/SingleCoinPage";
import News from "./Pages/News";
import About from "./Pages/About";

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
        path: "/coins/:id",
        element: <SingleCoinPage />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/about",
        element: <About />,
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
