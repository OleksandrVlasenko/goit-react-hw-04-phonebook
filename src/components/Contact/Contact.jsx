import React from "react";
import PropTypes from 'prop-types';

import { ContactItem, ContactName, DeleteButton } from './Contact.styled';

export const Contact = ({ name, number, id, deleteContact }) => {
  return (
    <ContactItem>
      <ContactName>{name}:</ContactName>
      <p>{number}</p>
      <DeleteButton type="button" onClick={() => deleteContact(id)}>
        Delete
      </DeleteButton>
    </ContactItem>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired
};
