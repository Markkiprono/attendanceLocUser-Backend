const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  queryUsers,
  allUsers,
  deleteEmployee,
  viewEmployeeLocation,
  getUserProfile,
  logoutUser,
  updateProfile,
  getUserDetails,
} = require("../controller/user");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/isAuthenticated");

router
  .route("/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), registerUser);
router.route("/login").post(loginUser);
router.route("/").get(isAuthenticatedUser, authorizeRoles("admin"), queryUsers);
router
  .route("/all")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allUsers);
router
  .route("/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteEmployee);
router
  .route("/location/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), viewEmployeeLocation);
router
  .route("/employee")
  .get(isAuthenticatedUser, getUserProfile)
  .put(isAuthenticatedUser, updateProfile);
router.route("/logout").get(isAuthenticatedUser, logoutUser);

module.exports = router;
