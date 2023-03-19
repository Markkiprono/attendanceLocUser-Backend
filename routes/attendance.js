const express = require("express");
const router = express.Router();
const {
  createAttendance,
  updateAttendance,
  updateLocation,
  getAttendance,
  getAttendances,
} = require("../controller/Attendance");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/isAuthenticated");

router.route("/").post(isAuthenticatedUser, createAttendance);
router.route("/:id").put(isAuthenticatedUser, updateAttendance);
router.route("/location/:id").put(isAuthenticatedUser, updateLocation);
router
  .route("/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAttendance);
router
  .route("/")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAttendances);

module.exports = router;
