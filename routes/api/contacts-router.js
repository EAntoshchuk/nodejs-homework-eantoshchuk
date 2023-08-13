import express from "express";
import contactsControllers from "../../controllers/contactsControllers.js";
import {validateId, validateRequest} from "../../middlewares/index.js"
import {Contact} from "../../models/index.js"
import contactSchema from "../../schemas/contactSchema.js";

const router = express.Router();

router.get("/", contactsControllers.getAllContacts);

router.get("/:contactId", validateId, contactsControllers.getContactById);

router.post("/", validateRequest(contactSchema.contactSchema),contactsControllers.addNewContact);
  
router.delete("/:contactId", validateId, contactsControllers.deleteContact);
  
router.put(
    "/:contactId",
    validateId, validateRequest(contactSchema.contactSchema),
    contactsControllers.updateContact
  );

router.patch(
    "/:contactId/favorite",
    validateId,
    validateRequest(contactSchema.contactFavouriteSchema),
    contactsControllers.updateStatusContact
  );

export default router;