import { Router } from "express";
import { getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus } from "../../controllers/admin/order.controller.js";


const router = Router()


router.route("/get-orders").get(getAllOrdersOfAllUsers)
router.route("/get-details/:id").get(getOrderDetailsForAdmin)
router.route("/update-order/:id").put(updateOrderStatus)



export default router 