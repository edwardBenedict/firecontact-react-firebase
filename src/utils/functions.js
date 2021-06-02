import firebase from "./firebase";
import { succesNotify } from "./CustomToastify";

export const deleteHandler = (id) => {
  const contactRef = firebase.database().ref("contact").child(id);
  contactRef.remove();
  succesNotify("Deleted Successfully!");
};

export const updateInfo = (info) => {
  const contactRef = firebase.database().ref("contact").child(info.id);
  contactRef.update(info);
  succesNotify("Updated Successfully!");
};

export const addInfo = (info) => {
  const inpRef = firebase.database().ref("contact");
  inpRef.push(info);
  succesNotify("Added Successfully!");
};
