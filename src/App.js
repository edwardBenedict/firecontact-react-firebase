import React, { useState } from "react";
import Form from "./components/form/Form";
import Contacts from "./components/table/Contacts";
import { ToastContainer } from "react-toastify";
import { updateInfo, addInfo } from "./utils/functions";
import { deleteFunc, useFetch } from "./utils/functions";

const initialValues = { username: "", phoneNumber: "", gender: "NO INFO!" };

function App() {
  const [info, setInfo] = useState(initialValues);
  const [refresh, setRefresh] = useState(false);
  const { contactList, isLoading } = useFetch(refresh);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (info.id) {
      updateInfo(info);
    } else {
      addInfo(info);
    }
    setRefresh(!refresh);
    setInfo(initialValues);
  };

  const editHandler = (id, username, phoneNumber, gender) => {
    setInfo({ id, username, phoneNumber, gender });
    setRefresh(!refresh);
  };

  const deleteHandler = (id) => {
    deleteFunc(id);
    setRefresh(!refresh);
  };

  return (
    <div className="App">
      <Form
        className="form"
        info={info}
        setInfo={setInfo}
        handleFormSubmit={handleFormSubmit}
      />
      <Contacts
        className="contacts"
        editHandler={editHandler}
        contactList={contactList}
        isLoading={isLoading}
        deleteHandler={deleteHandler}
      />
      <ToastContainer />
    </div>
  );
}

export default App;
