import React from "react";

import { Link } from "react-router-dom";

const navbar = () => {
  return (
    <nav>
      <h1>
        <Link to="/">Messenger</Link>
      </h1>
      <div>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default navbar;
