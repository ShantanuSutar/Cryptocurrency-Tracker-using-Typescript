import { NavLink } from "react-router-dom";

const NavLinks = () => {
  const currentUrl = window.location.pathname;
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
