import { Router } from "express";
import { addAddress, deleteAddress, editAddress, fetchAllAddress } from "../../controllers/shop/address.controller.js";


const router = Router()


router.route("/add-address").post(addAddress)
router.route("/fetch-address/:userId").get(fetchAllAddress)
router.route("/edit-address/:userId/:addressId").put(editAddress)
router.route("/delete-address/:userId/:addressId").delete(deleteAddress)


export default router;