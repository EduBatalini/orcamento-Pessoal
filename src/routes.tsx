import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Login from './pages/Login';
import './styles/App.css';
import './styles/Home.css';
import './styles/Login.css';
import './styles/Sobre.css';
import './styles/Dashboard.css';

const Navbar: React.FC = () => (
  <nav>
    <ul>
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li> 
      <li><Link to="/sobre">Sobre</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  </nav>
);

const AppRoutes: React.FC = () => (
  <Router>
    <Navbar />
    <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Sobre />} />
    </Routes>
  </Router>
);

export default AppRoutes;
