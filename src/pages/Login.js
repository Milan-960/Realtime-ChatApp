import React, { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";

import { useHistory } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const history = useHistory();

  const { email, password, error, loading } = data;

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: "All Fields are Require" });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // this was for earlier version in firebase
      // firebase.firestore().collection().doc().updateDoc;

      //setting the user information in firebase
      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });
      //resetting the stats
      setData({
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      history.replace("/");
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };

  return (
    <section>
      <h2>Login into your Account</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input_container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Please enter your Email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="input_container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Please enter you password"
            value={password}
            onChange={handleChange}
          />
        </div>
        {error ? <p className="error">{error} </p> : null}
        <div className="btn_container">
          <button className="btn" disabled={loading}>
            {loading ? "Logging in ..." : "Login"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
