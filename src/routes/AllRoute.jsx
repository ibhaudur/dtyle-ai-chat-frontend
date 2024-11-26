import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout";

const AllRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
    </Routes>
  );
};

export default AllRoute;
