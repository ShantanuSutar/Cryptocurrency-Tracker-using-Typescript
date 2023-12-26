import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CryptoContext } from "../Context/CryptoContext";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const { currency, symbol, setCurrency } = useContext(CryptoContext);

  return (
    <div className=" flex items-center justify-between p-4 px-8 shadow-md shadow-gray-700 lg:px-24 ">
      <h1
        className=" cursor-pointer text-lg  tracking-widest"
        onClick={() => navigate("/")}
      >
        Cryto <span className=" text-yellow-400 ">Assasin</span>
      </h1>
      <select
        className=" cursor-pointer rounded-tl-md rounded-tr-md bg-gray-500 p-1 px-3  text-white focus:outline-gray-400"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setCurrency(e.target.value as "INR" | "USD")
        }
      >
        <option value="INR">INR</option>
        <option value="USD">USD</option>
      </select>
    </div>
  );
};

export default Navbar;
