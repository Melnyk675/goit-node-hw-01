const argv = require('yargs').argv;
console.log(argv);

const contacts = require('./db/contacts');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.getListContacts();
      return console.table(allContacts);

    case "get":
      const contact = await contacts.getContactById(id);
      return console.table(contact);

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.table(newContact);

    case "update":
      const updateContact = await contacts.updateById(id, { name, email, phone });
      return console.table(updateContact);

    case "remove":
      const deleteContact = await contacts.removeContact(id);
      return console.table(deleteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv)
.catch((error) => {
    console.error(error);
  });
