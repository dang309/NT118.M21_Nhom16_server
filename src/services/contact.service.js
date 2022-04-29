const { Contact } = require('../models');

/**
 * Create a contact
 * @param {Object} contactBody
 * @returns {Promise<Contact>}
 */
const createContact = async (contactBody) => {
  return Contact.create(contactBody);
};

/**
 * Query for contacts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryContacts = async (filters, options) => {
  const contacts = await Contact.paginate(filters, options);
  return contacts;
};

/**
 * Get contact by id
 * @param {ObjectId} id
 * @returns {Promise<Contact>}
 */
const getContactById = async (id) => {
  return Contact.findById(id);
};

const getContactByPostId = async (postId) => {
  return Contact.find({ post_id: postId });
};

/**
 * Update contact by id
 * @param {ObjectId} contactId
 * @param {Object} updateBody
 * @returns {Promise<Contact>}
 */
const updateContactById = async (contactId, updateBody) => {
  const contact = await getContactById(contactId);
  Object.assign(contact, updateBody);
  await contact.save();
  return contact;
};

/**
 * Delete contact by id
 * @param {ObjectId} contactId
 * @returns {Promise<Contact>}
 */
const deleteContactById = async (contactId) => {
  const contact = await getContactById(contactId);
  await contact.remove();
  return contact;
};

module.exports = {
  createContact,
  queryContacts,
  getContactById,
  getContactByPostId,
  updateContactById,
  deleteContactById,
};
