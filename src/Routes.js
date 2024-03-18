import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Customer from './pages/Customer';
import Register from './pages/Register';
import Plan from './pages/Plan';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="plan" element={<Plan />} />
        <Route path="customer" element={<Customer />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export function NoMatch() {
  return (
    <div className="container">
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the Home page</Link>
      </p>
    </div>
  );
}
