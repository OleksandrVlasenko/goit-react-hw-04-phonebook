import React, { useEffect, useState } from 'react';
import shortid from 'shortid';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localContacts = JSON.parse(localStorage.getItem('contacts'));
    if (localContacts) {
      setContacts(localContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = e => {
    setFilter(e.currentTarget.value);
  };

  const addNewContact = (name, number) => {
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts(prevState => [newContact, ...prevState]);
  };

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(({ id }) => id !== contactId));
  };

  const filteredContacts = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  const equalContacts = e => {
    return contacts.find(
      contact =>
        contact.name.toLowerCase() ===
        e.target.elements.name.value.toLowerCase()
    );
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm addContact={addNewContact} equalContacts={equalContacts} />
      <h2>Contacts</h2>
      <Filter onChange={handleChange} filter={filter} />
      <ContactList
        contacts={contacts}
        filteredContacts={filteredContacts()}
        deleteContact={deleteContact}
      />
    </>
  );
};
