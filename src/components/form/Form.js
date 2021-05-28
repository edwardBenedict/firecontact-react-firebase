import React from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];

const CustomForm = ({ info, setInfo, handleFormSubmit }) => {
  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleOptionChange = (e) => {
    setInfo({ ...info, gender: e.target.textContent });
  };

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ width: 300 }}>
        <div className="ui piled segments">
          <div className="ui segment brand">
            <a
              href="https://github.com/edwardBenedict"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "2rem",
              }}
            >
              <code>{"<ed8en/> "}</code>
            </a>
            <span className="design header">design</span>
          </div>
        </div>
        <h2 className="contact-header">Add Contact</h2>
        <Form size="large" onSubmit={handleFormSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Name"
              value={info.username}
              onChange={handleInputChange}
              required
            />
            <Form.Input
              fluid
              name="phoneNumber"
              icon="phone"
              iconPosition="left"
              placeholder="Phone Number"
              type="text"
              value={info.phoneNumber}
              onChange={handleInputChange}
              required
            />
            <Form.Dropdown
              options={options}
              onChange={handleOptionChange}
              placeholder="Gender"
              fluid
              selection
              value={info.gender.toLowerCase()}
              required
            />
            <Button color="teal" fluid size="large">
              Add
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default CustomForm;
