import React, { useState, useEffect } from "react";
import { SiderBarData } from "./utils/utils";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const location = useLocation();

  // Open the dropdown if a subNav is active based on the current location
  useEffect(() => {
    SiderBarData.forEach((item, index) => {
      if (item.subNav) {
        const isActive = item.subNav.some(
          (subnav) => subnav.path === location.pathname
        );
        if (isActive) {
          setOpenIndex(index);
        }
      }
    });
  }, [location.pathname]);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <aside className="h-screen bg-black fixed w-60 f-12 d-lg-block d-none text-white p-3 pt-2 flex-none overflow-y-auto">
      <nav className="pt-4">
        <ul>
          {SiderBarData.map((item, index) => {
            if (item.title) {
              return (
                <li key={index} className="mb-1 c-gray mt-5 px-1">
                  <small>{item.title}</small>
                </li>
              );
            } else if (item.path !== "#") {
              return (
                <li
                  key={index}
                  className="mb-2"
                  onClick={() => setOpenIndex(null)} // Close any open dropdown when navigating
                >
                  <NavLink
                    to={item.path}
                    className="hover:bg-gray-700 d-block p-1 rounded"
                    activeClassName="font-bold"
                  >
                    <span className="flex gap-2">
                      <img src={item.icon} alt={`icon ${index + 1}`} />{" "}
                      {item.menu}
                    </span>
                  </NavLink>
                </li>
              );
            } else if (item.path === "#") {
              return (
                <li key={index} className="mb-2">
                  <button
                    className={`w-full text-left hover:bg-gray-700 p-1 rounded flex justify-between items-center ${
                      openIndex === index ? "bg-gray-700" : ""
                    }`}
                    onClick={() => toggleDropdown(index)}
                  >
                    <span className="flex gap-2">
                      <img src={item.icon} alt={`icon ${index + 1}`} />{" "}
                      {item.menu}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        openIndex === index ? "rotate-180" : "rotate-0"
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
                  </button>

                  {openIndex === index && (
                    <ul className="ml-4 mt-2 space-y-2">
                      {item.subNav.map((subnav, i) => (
                        <li
                          key={i}
                          onClick={() => setOpenIndex(null)} // Close dropdown when navigating
                        >
                          <NavLink
                            to={subnav.path}
                            className="hover:bg-gray-700 d-block p-1 rounded"
                            activeClassName="font-bold"
                          >
                            {subnav.menu}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
