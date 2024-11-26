import React from "react";
import Logo from "../../public/images/dtile.svg";
import Avt from "../../public/images/avt.png";
import { IoNotificationsOutline } from "react-icons/io5";
const Navbar = () => {
  return (
    <nav className="h-16 flex justify-between text-white align-items-center px-3">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
