import React, { useState } from "react";
import { SiderBarData } from "./utils/utils";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <aside className="h-screen w-60 text-white p-3 flex-none">
      <nav>
        <ul>
          {SiderBarData.map((item, index) => {
            if (item.title) {
              return (
                <li key={index} className="mb-1 px-1">
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
                    {item.menu}
                  </NavLink>
                </li>
              );
            } else if (item.path === "#") {
              return (
                <li key={index} className="mb-2">
                  <button
                    className="w-full text-left hover:bg-gray-700 p-1 rounded flex justify-between items-center"
                    onClick={() => toggleDropdown(index)}
                  >
                    <span>{item.menu}</span>
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
