import firebase from "./firebase";
import { succesNotify } from "./CustomToastify";

export const deleteHandler = (id) => {
  const contactRef = firebase.database().ref("contact").child(id);
  contactRef.remove();
  succesNotify("Deleted Successfully!");
};

// export const getData = () => {
//   const contactRef = firebase.database().ref("contact");
//   contactRef.on("value", (snapshot) => {
//     //   console.log(snapshot.val());
//     const contacts = snapshot.val();
//     // console.log({ contacts });
//     const contactArray = [];
//     for (let id in contacts) {
//       contactArray.push({ id, ...contacts[id] });
//     }
//     console.log({ contactArray });
//     return contactArray;
//   });
// };

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
