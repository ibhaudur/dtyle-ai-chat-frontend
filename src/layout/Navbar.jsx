import React from "react";
import Logo from "../../public/images/dtile.svg";
import Avt from "../../public/images/avt.png";
import { IoNotificationsOutline } from "react-icons/io5";
const Navbar = () => {
  return (
    <nav className="h-16 flex justify-between fixed z-[99999] w-100 bg-black text-white align-items-center px-3">
      <div>
        <img src={Logo} alt="logo" className="w-28" />
      </div>
      <div className="flex align-items-center gap-3">
        <IoNotificationsOutline className="" />
        <div className="flex gap-2 align-items-center">
          <img src={Avt} alt="i" className="h-7 w-7 rounded-full" />
          <div className="leading-3">
            <p className="mb-0 f-12">Vignesh</p>
            <small className="f-10 c-gray">Account</small>
          </div>
          <svg
            className={`w-5 h-5 transition-transform ${
              false ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
