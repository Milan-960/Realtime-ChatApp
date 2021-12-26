import React from "react";
import "./App.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";

import Navbar from "./components/navbar/navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import HomeRoute from "./components/Home/HomeRoute";

import AuthProvider from "./context/auth";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <HomeRoute exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <HomeRoute exact path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
