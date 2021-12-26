import React, { useEffect, useState } from "react";

import User from "../components/Users/user";
import MessagesForm from "../components/MessagesForm/Form";
import Message from "../components/Messages/Messages";

import { db, auth, storage } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [mas, setMas] = useState("");

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

  // console.log(users);

  const selectUser = (user) => {
    setChat(user);
    // console.log(user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgRef = collection(db, "messages", id, "chat");
    const q = query(msgRef, orderBy("createAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let mas = [];
      querySnapshot.forEach((doc) => {
        mas.push(doc.data());
      });
      setMas(mas);
    });
  };

  //this function is for store all the text messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.uid;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      form: user1,
      to: user2,
      createAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });

    await setDoc(doc(db, "lastMsg", id), {
      text,
      form: user1,
      to: user2,
      createAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });

    setText("");
    setImg("");
  };

  return (
    <div className="home_container">
      <div className="users_container">
        {users.map((user) => (
          <User
            key={user.uid}
            user={user}
            selectUser={selectUser}
            user1={user1}
          />
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
            <div className="messages">
              {mas.length
                ? mas.map((msg, i) => (
                    <Message key={i} msg={msg} user1={user1} />
                  ))
                : null}
            </div>
            <MessagesForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              setImg={setImg}
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
