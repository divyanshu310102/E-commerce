import { Router } from "express"
import { getFilteredProducts, getProductDetails } from "../../controllers/shop/product.controller.js";



const router = Router()


router.route("/get-filtered-products").get(getFilteredProducts)
router.route("/get-product/:id").get(getProductDetails)



export default router;   