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
          fluid
          className="flex-grow rounded-[16px] layout-container
         bg-[#FAFFFE] p-2 mt-4rem"
          style={{ minHeight: "90vh" }}
        >
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default Layout;
