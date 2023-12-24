import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className=" flex items-center justify-between p-4 px-8 shadow-md shadow-gray-700 lg:px-24 ">
      <h1
        className=" cursor-pointer text-lg  tracking-widest"
        onClick={() => navigate("/")}
      >
        Cryto <span className=" text-yellow-400 ">Assasin</span>
      </h1>
      <select className=" rounded-tl-md rounded-tr-md p-1 text-gray-900">
        <option value="INR">INR</option>
        <option value="USD">USD</option>
      </select>
    </div>
  );
};

export default Navbar;
