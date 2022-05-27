import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { connect } from "react-redux";

import "./App.css"
import { Front, Home } from "./pages"
import { PrivateRoute, OAuth2RedirectHandler } from "./components"

/**
 * Starting point of MixTech. Defines browser routes through React Router.
 * Each route redirects the user to the corresponding component upon navigating to it.
 */

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
