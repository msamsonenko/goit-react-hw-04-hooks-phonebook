import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts' ?? []));
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    const isTrue = contacts.some(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );
    if (isTrue) {
      return alert(`${data.name} is already in contacts`);
    }
    setContacts(state => [...state, data]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };
  const deleteContact = contactId => {
    setContacts(state => state.filter(contact => contact.id !== contactId));
  };
  const normalizedText = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedText)
  );
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}
