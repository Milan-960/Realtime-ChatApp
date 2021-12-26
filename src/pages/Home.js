import React, { useEffect, useState } from "react";

import User from "../components/Users/user";
import MessagesForm from "../components/MessagesForm/Form";

import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
} from "@firebase/firestore";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");

  const user1 = auth.currentUser.uid;

  useEffect(() => {
    const usersRef = collection(db, "users");

    //create query object
    const q = query(usersRef, where("uid", "not-in", [user1]));

    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);
  console.log(users);

  const selectUser = (user) => {
    setChat(user);
    console.log(user);
  };

  //this function is for store all the text messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      form: user1,
      to: user2,
      createAt: Timestamp.fromDate(new Date()),
    });
    setText("");
  };

  return (
    <div className="home_container">
      <div className="users_container">
        {users.map((user) => (
          <User key={user.uid} user={user} selectUser={selectUser} />
        ))}
      </div>

      <div className="messages_container">
        {chat ? (
          <>
            <div className="messages_user">
              <h3>{chat.name}</h3>
              {/* Need to show an img as well */}
              {/* <h3>{chat.img}</h3> */}
            </div>
            <MessagesForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
            />
          </>
        ) : (
          <h3 className="no_conv"> Select a user to start the conversation</h3>
        )}
      </div>
    </div>
  );
};

export default Home;
