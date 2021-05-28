import React, { useEffect, useState } from "react";
import firebase from "../../utils/firebase";
import { Table } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";

const Contacts = ({ editHandler }) => {
  const [contactList, setContactList] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const contactRef = firebase.database().ref("contact");
    contactRef.on("value", (snapshot) => {
      //   console.log(snapshot.val());
      const contacts = snapshot.val();
      const contactL = [];
      for (let id in contacts) {
        contactL.push({ id, ...contacts[id] });
      }
      setContactList(contactL);
      setIsLoading(false);
    });
  }, []);

  const deleteHandler = (id) => {
    const contactRef = firebase.database().ref("contact").child(id);
    contactRef.remove();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2 className="contact-header">Contacts</h2>
      <Table size={"large"} style={{ minWidth: "500px" }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">Username</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Phone Number</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Gender</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Delete</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Edit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading ? (
            <Table.Row>
              <Table.Cell colSpan={5} textAlign="center">
                <p>Loading...</p>
              </Table.Cell>
            </Table.Row>
          ) : contactList?.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={5} textAlign="center">
                <p>Nothing Found</p>
              </Table.Cell>
            </Table.Row>
          ) : (
            contactList?.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell textAlign="center">
                  {item.username.toUpperCase()}
                </Table.Cell>
                <Table.Cell textAlign="center">{item.phoneNumber}</Table.Cell>
                <Table.Cell textAlign="center">{item.gender}</Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => deleteHandler(item.id)}
                >
                  <Icon disabled name="delete" className="delete" />
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  className="edit"
                  onClick={() =>
                    editHandler(
                      item.id,
                      item.username,
                      item.phoneNumber,
                      item.gender
                    )
                  }
                >
                  <Icon disabled name="edit" />
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Contacts;
