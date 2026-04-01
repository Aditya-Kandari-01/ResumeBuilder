const express = require('express')
const authController = require("../controllers/authController")
const authMiddleware = require("../middlewares/authMiddleware")
const router = express.Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access public
 */

router.post("/register",authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access public
 */
router.post("/login",authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @description Clear token from user cookies and add token in blacklist
 * @access public
 */
router.get("/logout",authController.logoutUserController)

/**
 * @route GET /api/auth/get-me
 * @description get the logged in user details
 * @access private
 */

router.get("/get-me",authMiddleware.authUser,authController.getMeController)

module.exports = router