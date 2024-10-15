import { Router } from "express";
import { upload } from "../../middlewares/FileUpload/multer.middleware.js";
import { addProduct, deleteProduct, editProduct, fetchAllProducts, uploadFileController } from "../../controllers/admin/product.controller.js";




const router = Router()

router.route("/upload-image").post(upload.single('my_file'), uploadFileController) 
router.route("/add").post( addProduct);
router.route("/edit/:id").put( editProduct);
router.route("/delete/:id").delete(deleteProduct);
router.route("/get").get(fetchAllProducts);

export default router;