import { Router } from "express";
import { addToCart, deleteCartItem, fetchCartItems, updateCartItemQty } from "../../controllers/shop/cart.controller.js";


const router = Router()


router.route("/add-to-cart").post(addToCart)
router.route("/fetch-cart-items/:userId").get(fetchCartItems)
router.route("/update-cart").put(updateCartItemQty)
router.route("/delete-cart-item/:userId/:productId").delete(deleteCartItem)


export default router;