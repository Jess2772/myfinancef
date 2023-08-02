import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register'
import Login from './pages/Login'
import Welcome from './pages/Welcome'
import Home from './pages/Home'
import SpendingCategory from './pages/SpendingCategory'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './interceptor/Axios';
import Logout from './pages/Logout';
import Budget from './pages/Budget';
import Spendings from './pages/Spendings';
import Transactions from './pages/Transactions';
import MonthSpending from './pages/MonthSpending';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  
  <Router>
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={<App/>}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/welcome" element={<Welcome />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/logout" element={<Logout />}/>
      <Route path="/budget" element={<Budget />}/>
      <Route path="/spendings" element={<Spendings />}/>
      <Route path="/transactions" element={<Transactions />}/>
      <Route path="/spendings/category" element={<SpendingCategory />}/>
      <Route path="/spendings/monthly" element={<MonthSpending />}/>
    </Routes>
  </Router>
);
