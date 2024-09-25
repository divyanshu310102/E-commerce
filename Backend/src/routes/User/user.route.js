import {Router} from 'express'
import { loginUser, logOutUser, registerUser } from '../../controllers/auth/auth.controller.js'
import { verifyJWT } from '../../middlewares/User/user.auth.middleware.js'

const router = Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logOutUser)
router.route("/check-auth").get(verifyJWT,(req, res) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      message: "Authenticated user!",
      user,
    })
})




export default router;