import React from 'react';
import { Contact } from 'components/Contact/Contact';
import PropTypes from 'prop-types';

import { Contacts, InfoMessage } from './ContactList.styled';

export const ContactList = ({ contacts, filteredContacts, deleteContact }) => {
  return (
    <Contacts>
      {contacts.length === 0 ? (
        <InfoMessage>The list of contacts is empty</InfoMessage>
      ) : filteredContacts.length === 0 ? (
        <InfoMessage>Nothing found</InfoMessage>
      ) : (
        <ul>
          {filteredContacts.map(({ id, name, number }) => (
            <Contact
              key={id}
              id={id}
              name={name}
              number={number}
              deleteContact={deleteContact}
            />
          ))}
        </ul>
      )}
    </Contacts>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
