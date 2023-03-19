const express = require("express");
const router = express.Router();

const {
  createSalary,
  updateSalary,
  getSalary,
  getSalaries,
} = require("../controller/salary");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/isAuthenticated");

router
  .route("/")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createSalary);
router.route("/:id").put(isAuthenticatedUser, updateSalary);
router.route("/:id").get(isAuthenticatedUser, getSalary);
router
  .route("/")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSalaries);

module.exports = router;
