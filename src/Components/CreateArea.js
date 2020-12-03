import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";

const CreateArea = (props) => {
  const [open, setOpen] = useState(false);
  const [inputFields, setInputFields] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: " ",
    phone: "",
  });

  const onInputChange = (e) => {
    setInputFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const closeModal = () => {
    setInputFields({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
    setOpen(false);
  };
  const onSubmit = (e) => {
    inputFields.id = Number(inputFields.id);
    //if the input not a number set id to 0
    if (Number.isNaN(inputFields.id)) {
      inputFields.id = 0;
    }
    props.onSubmit(inputFields);
    closeModal();
  };
  return (
    <Modal
      onClose={closeModal}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <div className="add-button">
          {" "}
          <Button
            className="add-button"
            content="+Add"
            inverted
            color="violet"
          />
        </div>
      }
    >
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        <div className="ui form" autoComplete="off">
          <div className="field">
            <label>ID</label>
            <input
              name="id"
              onChange={onInputChange}
              value={inputFields.id}
              type="text"
              placeholder="id"
              autoComplete="off"
            />
          </div>
          <div className="field">
            <label>First name</label>
            <input
              name="firstName"
              onChange={onInputChange}
              value={inputFields.firstName}
              type="text"
              placeholder="First Name"
            />
          </div>
          <div className="field">
            <label>Last name</label>
            <input
              name="lastName"
              onChange={onInputChange}
              value={inputFields.lastName}
              type="text"
              placeholder="Last Name"
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              name="email"
              onChange={onInputChange}
              value={inputFields.email}
              type="text"
              placeholder="email"
            />
          </div>
          <div className="field">
            <label>Phone</label>
            <input
              name="phone"
              onChange={onInputChange}
              value={inputFields.phone}
              type="text"
              placeholder="phone"
              autoComplete="off"
            />
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" content="Close" onClick={closeModal} />
        {/* show the button only when all the fields are present */}
        {inputFields.id &&
          inputFields.firstName &&
          inputFields.lastName &&
          inputFields.email &&
          inputFields.phone && (
            <Button
              content="Submit"
              labelPosition="right"
              icon="checkmark"
              onClick={onSubmit}
              positive
            />
          )}
      </Modal.Actions>
    </Modal>
  );
};

export default CreateArea;
