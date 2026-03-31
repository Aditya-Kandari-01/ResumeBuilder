const express = require('express')
const authController = require("../controllers/authController")

const router = express.Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

router.post("/register",authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */
router.post("/login",authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @description Clear token from user cookies and add token in blacklist
 * @access Public
 */
router.get("/logout",authController.logoutUserController)

module.exports = router