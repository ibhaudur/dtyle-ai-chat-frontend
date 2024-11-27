import { GoHome } from "react-icons/go";
import { VscRepo } from "react-icons/vsc";
import * as MdIcons from "react-icons/md";
import folder from "../../../public/images/sidebarIcon/folder.svg";
import product from "../../../public/images/sidebarIcon/product.svg";
import dollar from "../../../public/images/sidebarIcon/dollar.svg";
import percentage from "../../../public/images/sidebarIcon/percentage-square.svg";
import message from "../../../public/images/sidebarIcon/message-text.svg";
import bill from "../../../public/images/sidebarIcon/bill.svg";
import call from "../../../public/images/sidebarIcon/call-calling.svg";
import calendar from "../../../public/images/sidebarIcon/menu-board.svg";
import card from "../../../public/images/sidebarIcon/card.svg";

export const SiderBarData = [
  {
    title: "Home",
  },
  {
    menu: "My Products",
    path: "#",
    icon: folder,
    subNav: [
      {
        menu: "Chat",
        path: "chat",
      },
    ],
  },
  {
    menu: "Product Requests",
    path: "#",
    icon: product,
    subNav: [],
  },
  {
    menu: "Payments",
    path: "#",
    icon: dollar,
    subNav: [],
  },
  {
    menu: "Transactions",
    path: "#",
    icon: bill,
    subNav: [],
  },
  {
    menu: "Checks",
    path: "",
    icon: card,
  },
  {
    menu: "Calendar",
    path: "",
    icon: calendar,
  },
  {
    title: "Information",
  },
  {
    menu: "Special Offers",
    path: "",
    icon: percentage,
  },
  {
    title: "Support",
  },
  {
    menu: "Reach Us",
    path: "",
    icon: call,
  },
  {
    menu: "Chat with us",
    path: "",
    icon: message,
  },
];
