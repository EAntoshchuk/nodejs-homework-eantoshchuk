import contactsService from "../models/contacts.js";
import { HttpError, contactDecorator } from "../helpers/index.js";
import contactAddSchema from "../schemas/contactSchema.js";
import { query } from "express";

export const getAllContacts = async (req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 10, ...query} = req.query;
    const skip = (page -1) * limit;
    const result = await contactsService.listContacts({owner, ...query}, {skip, limit}).populate("owner", "name email");
    res.json(result);
  };

export const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json(result);
  };

export const addNewContact = async (req, res) => {
  const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const {_id: owner} = req.user;
    const result = await contactsService.addContact({...req.body, owner});
    res.status(201).json(result);
  };

export const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json({
      message: "Delete successful",
    });
  };

export const updateContact = async (req, res) => {
   const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    req.json(result);
  };

  export const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!updatedContact) {
      throw HttpErrorCreator(404, "Not Found");
    }
    res.json(updatedContact);
  };

  export default {
    getAllContacts: contactDecorator(getAllContacts),
    getContactById: contactDecorator(getContactById),
    addNewContact: contactDecorator(addNewContact),
    deleteContact: contactDecorator(deleteContact),
    updateContact: contactDecorator(updateContact),
    updateStatusContact: contactDecorator(updateStatusContact),
  };
  