import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout";
import Calendar from "../pages/calendar";
import Chat from "../pages/Chat";

const AllRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Chat />} />
        <Route path="chat" element={<Chat />} />
        <Route path="calendar" element={<Calendar />} />
      </Route>
    </Routes>
  );
};

export default AllRoute;
