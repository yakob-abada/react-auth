import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import NavHeader from "./components/NavHeader";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import NoPage from "./components/pages/NoPage";

function App() {
  return (
    <div className="App">
      <NavHeader />
      <Container id="bodyContainer">
      <BrowserRouter>
          <Routes>
              <Route index element={<Home />} />
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path="*" element={<NoPage />} />
          </Routes>
      </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
