import {Router} from 'express'
import { loginUser, logOutUser, registerUser } from '../../controllers/auth/auth.controller.js'
import { verifyJWT } from '../../middlewares/User/user.auth.middleware.js'

const router = Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logOutUser)




export default router;