import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { connect } from "react-redux";

import "./App.css"
import { Front, Home } from "./pages"
import { PrivateRoute, OAuth2RedirectHandler } from "./components"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Front />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default connect()(App);
