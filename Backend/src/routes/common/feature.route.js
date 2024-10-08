import { Router } from "express";
import { addFeatureImage, getFeatureImages } from "../../controllers/common/feature.controller.js";



const router = Router()

router.route("/add").post(addFeatureImage)
router.route("/get").get(getFeatureImages)

export default router