import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { AuthContext } from "../../context/auth";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const handleSignout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    history.replace("/login");
  };
  return (
    <nav>
      <h1>
        <Link to="/">Messenger</Link>
      </h1>

      <div>
        {/* this is for if user is logged in or not  */}
        {user ? (
          <>
            <Link to="/login"> Profile</Link>
            <button className="btn" onClick={handleSignout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
