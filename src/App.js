import "./App.css";
import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";

import Navbar from "./components/navbar/navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";

import AuthProvider from "./context/auth";

import { HomeRoute } from "./components/HomeRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <HomeRoute exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
