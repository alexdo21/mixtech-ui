import React from "react"
import { BrowserRouter, Routes, Route} from "react-router-dom"
import { connect } from "react-redux";

import "./App.css"
import { Front, Home, Login, Register } from "./pages"

/**
 * Starting point of MixTech. Defines browser routes through React Router.
 * Each route redirects the user to the corresponding component upon navigating to it.
 */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Front />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default connect()(App);
