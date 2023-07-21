import './App.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { TypeAnimation } from 'react-type-animation';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Navigation from './components/Navigation'
export function App() {
  return (
    <div>
      <Navigation></Navigation>
      <div>
        <p style={{ fontSize: 50 }} className="center">
          <TypeAnimation
            sequence={[
              "Take control of YourFinance",
              1000,
              "Take control of yourself",
              1500,
              "Take control of your money",
              1500,
            ]}
            speed={45}
            repeat={Infinity}
            style={{ fontSize: '2em', paddingTop: '1em' }}
          />
        </p>
        
      </div>
      <Link style={{ textDecoration: 'none'}} className="center" to="/register"><Button className="center" size="lg" type="submit">
          Get started
        </Button></Link>
    </div>
    
  )
}