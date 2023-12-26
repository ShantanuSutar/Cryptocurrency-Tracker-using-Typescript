import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CryptoContext } from "../../Context/CryptoContext";
import NavLinks from "./NavLinks";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const links = {
    home: false,
    news: false,
    about: false,
  };
  const [active, setActive] = useState(links);
  const { setCurrency } = useContext(CryptoContext);

  return (
    <div className=" flex items-center justify-between p-4 px-8 shadow-md shadow-gray-700 lg:px-24 ">
      <h1
        className=" cursor-pointer text-lg  tracking-widest"
        onClick={() => navigate("/")}
      >
        Cryto <span className=" text-yellow-400 ">Assasin</span>
      </h1>

      <div
        className=" flex items-baseline gap-8
      "
      >
        <NavLinks active={active} setActive={setActive} />
        <select
          className=" cursor-pointer rounded-tl-md rounded-tr-md bg-gray-500 p-1 px-3  text-white transition-all duration-200 ease-in-out hover:bg-gray-600 focus:outline-gray-400"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCurrency(e.target.value as "INR" | "USD")
          }
        >
          <option className=" cursor-pointer" value="INR">
            INR
          </option>
          <option className=" cursor-pointer" value="USD">
            USD
          </option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
