import React, { useState } from "react";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
  });

  return (
    <section>
      <h2>Create An Account</h2>
      <form className="form">
        <div className="input_container">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="Please enter your name" />
        </div>
        <div className="input_container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Please enter your Email"
          />
        </div>
        <div className="input_container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Please enter you password"
          />
        </div>
        <div className="btn_container">
          <button className="btn">Sign-up</button>
        </div>
      </form>
    </section>
  );
};

export default Register;
