import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Link, Route, Routes, Navigate } from "react-router-dom";

import PersonIndex from "./persons/PersonIndex";
import PersonDetail from "./persons/PersonDetail";
import PersonForm from "./persons/PersonForm";
import PersonStats from "./stats/PersonStats";

import InvoiceIndex from "./invoices/InvoiceIndex";
import InvoiceDetail from "./invoices/InvoiceDetail";
import InvoiceForm from "./invoices/InvoiceForm";
import StatsIndex from "./stats/StatsIndex";

export function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/persons" className="nav-link">Osoby</Link>
            </li>
            <li className="nav-item">
              <Link to="/invoices" className="nav-link">Faktury</Link>
            </li>
            <li className="nav-item">
              <Link to="/stats" className="nav-link">Statistiky</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/persons" />} />

          <Route path="/persons" element={<PersonIndex />} />
          <Route path="/persons/show/:id" element={<PersonDetail />} />
          <Route path="/persons/create" element={<PersonForm />} />
          <Route path="/persons/edit/:id" element={<PersonForm />} />

          <Route path="/invoices" element={<InvoiceIndex />} />
          <Route path="/invoices/show/:id" element={<InvoiceDetail />} />
          <Route path="/invoices/create" element={<InvoiceForm />} />
          <Route path="/invoices/edit/:id" element={<InvoiceForm />} />

          <Route path="/stats" element={<StatsIndex />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
