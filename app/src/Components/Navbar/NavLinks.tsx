import React from "react";
import { NavLink, useNavigation } from "react-router-dom";

type Props = {
  active: { home: boolean; news: boolean; about: boolean };
  setActive: React.Dispatch<
    React.SetStateAction<{
      home: boolean;
      news: boolean;
      about: boolean;
    }>
  >;
};

const NavLinks = ({ active, setActive }: Props) => {
  const currentUrl = window.location.pathname;
  console.log(currentUrl);
  return (
    <div className=" flex gap-8">
      <NavLink
        to={"/"}
        className={` transition-all   hover:border-b hover:border-b-yellow-400 hover:text-yellow-400 ${
          currentUrl === "/" && "border-b border-b-yellow-400 text-yellow-400"
        }`}
      >
        Home
      </NavLink>
      <NavLink
        to={"/news"}
        className={` transition-all   hover:border-b hover:border-b-yellow-400 hover:text-yellow-400 ${
          currentUrl === "/news" &&
          "border-b border-b-yellow-400 text-yellow-400"
        }`}
      >
        News
      </NavLink>
      <NavLink
        to={"/about"}
        className={` transition-all   hover:border-b hover:border-b-yellow-400 hover:text-yellow-400 ${
          currentUrl === "/about" &&
          "border-b border-b-yellow-400 text-yellow-400"
        }`}
      >
        About
      </NavLink>
    </div>
  );
};

export default NavLinks;
