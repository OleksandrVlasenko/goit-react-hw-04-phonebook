import React, { useState } from 'react';
import shortid from 'shortid';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

import { Form } from './ContactForm.styled';

const nameId = shortid.generate();
const numberId = shortid.generate();

export const ContactForm = ({ addContact, equalContacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (equalContacts(e)) {
      Notiflix.Notify.failure(`${name} already in contacts`);
      return;
    }

    addContact(name, number);

    formReset();
  };

  const formReset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <label htmlFor={nameId}>
          Name
          <input
            onChange={handleChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            id={nameId}
            value={name}
            required
          />
        </label>
        <label htmlFor={numberId}>
          Number
          <input
            onChange={handleChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            id={numberId}
            value={number}
            required
          />
        </label>

        <button type="submit">Add contact</button>
      </Form>
    </>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  equalContacts: PropTypes.func.isRequired,
};
