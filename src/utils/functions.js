import { useState, useEffect } from "react";
import firebase from "./firebase";
import { succesNotify } from "./CustomToastify";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  update,
  remove,
} from "firebase/database";

const db = getDatabase();
const dbRef = ref(db);

export const deleteFunc = (id) => {
  remove(ref(db, "contact/" + id));
  succesNotify("Deleted Successfully!");
};

export const updateInfo = (info) => {
  update(ref(db, "contact/" + info.id), info).then(() => {
    succesNotify("Updated Successfully!");
  });
};

export const addInfo = (info) => {
  let uid = Date.now();
  set(ref(db, "contact/" + uid), { ...info });
  succesNotify("Added Successfully!");
};

export const useFetch = (refresh) => {
  const [contactList, setContactList] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    get(child(dbRef, `contact`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const contacts = snapshot.val();
          const contactArray = [];

          for (let id in contacts) {
            contactArray.push({ id, ...contacts[id] });
          }
          setContactList(contactArray);
        } else {
          console.log("No data available");
          setContactList([]);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [refresh]);

  return { contactList, isLoading };
};
