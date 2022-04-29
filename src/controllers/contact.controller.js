const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { contactService } = require('../services');
const pick = require('../utils/pick');
const { RES } = require('../utils/RES');

const createContact = catchAsync(async (req, res) => {
  const contact = await contactService.createContact(req.body);
  res.status(httpStatus.CREATED).send(RES(httpStatus.CREATED, '', true, contact));
});

const getContacts = catchAsync(async (req, res) => {
  const { filters } = pick(req.query, ['filters']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await contactService.queryContacts(filters, options);
  res.send(RES(httpStatus.OK, '', true, result));
});

const getContactByPostId = catchAsync(async (req, res) => {
  const contact = await contactService.getContactByPostId(req.params.postId);
  res.send(RES(httpStatus.OK, '', true, contact));
});

const updateContact = catchAsync(async (req, res) => {
  const contact = await contactService.updateContactById(req.params.contactId, req.body);
  res.send(RES(httpStatus.OK, '', true, contact));
});

const deleteContact = catchAsync(async (req, res) => {
  await contactService.deleteContactById(req.params.contactId);
  res.status(httpStatus.OK).send(RES(httpStatus.OK, '', true, null));
});

module.exports = {
  createContact,
  getContacts,
  getContactByPostId,
  updateContact,
  deleteContact,
};
