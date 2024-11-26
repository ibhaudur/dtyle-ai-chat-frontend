import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-black ">
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <Container
          className="flex-grow rounded-ss-[16px] layout-container
         bg-white p-3 mt-4rem"
        >
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default Layout;
