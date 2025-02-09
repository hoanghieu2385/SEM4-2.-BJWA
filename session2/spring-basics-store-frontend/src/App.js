// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Products from "./pages/Products";

export default function App() {
  return (
    <Router>
      <Header />
      <div className="p-4">
        <Routes>
          <Route path="/customers" element={<Customers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </Router>
  );
}