import React, { useState } from "react";
import "./App.css";
import Form from "./components/form/Form";
import Contacts from "./components/table/Contacts";
import { ToastContainer } from "react-toastify";
import { updateInfo, addInfo } from "./utils/functions";

function App() {
  const [info, setInfo] = useState({
    username: "",
    phoneNumber: "",
    gender: "No Info!",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (info.id) {
      updateInfo(info);
    } else {
      addInfo(info);
    }
    setInfo({ username: "", phoneNumber: "", gender: "No Info!" });
  };

  const editHandler = (id, username, phoneNumber, gender) => {
    setInfo({
      id: id,
      username: username,
      phoneNumber: phoneNumber,
      gender: gender,
    });
  };

  return (
    <div className="App">
      <Form
        className="form"
        info={info}
        setInfo={setInfo}
        handleFormSubmit={handleFormSubmit}
      />
      <Contacts className="contacts" editHandler={editHandler} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
