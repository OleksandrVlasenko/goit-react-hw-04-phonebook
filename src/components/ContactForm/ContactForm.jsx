import React, { Component } from 'react';
import shortid from 'shortid';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

import {Form} from "./ContactForm.styled"

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameId = shortid.generate();
  numberId = shortid.generate();

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.props.equalContacts(e)) {
      Notiflix.Notify.failure(`${this.state.name} already in contacts`);
      return;
    }

    const { name, number } = this.state;
    this.props.addContact(name, number);

    this.formReset();
  };

  formReset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <label htmlFor={this.nameId}>
            Name
            <input
              onChange={this.handleChange}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              id={this.nameId}
              value={name}
              required
            />
          </label>
          <label htmlFor={this.numberId}>
            Number
            <input
              onChange={this.handleChange}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              id={this.numberId}
              value={number}
              required
            />
          </label>

          <button type="submit">Add contact</button>
        </Form>
      </>
    );
  }
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  equalContacts: PropTypes.func.isRequired,
};
