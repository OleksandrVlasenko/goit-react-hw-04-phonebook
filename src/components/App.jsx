import React, { Component } from 'react';
import shortid from 'shortid';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  addNewContact = (name, number) => {
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  filter = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  equalContacts = e => {
    return this.state.contacts.find(
      contact =>
        contact.name.toLowerCase() ===
        e.target.elements.name.value.toLowerCase()
    );
  };

  render() {
    const filteredContacts = this.filter();
    const { filter, contacts } = this.state;
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm
          addContact={this.addNewContact}
          equalContacts={this.equalContacts}
        />
        <h2>Contacts</h2>
        <Filter onChange={this.handleChange} filter={filter} />
        <ContactList
          contacts={contacts}
          filteredContacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </>
    );
  }
}
