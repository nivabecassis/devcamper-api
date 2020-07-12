const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  getBootcampsFromRadius,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");

const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middleware/advancedResults");

const { protect } = require("../middleware/auth");

// Resource router
const courseRouter = require("./courses");

const router = express.Router();

// Direct anything with /:bootcampId/courses to course router
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsFromRadius);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, createBootcamp);

router.route("/:id/photo").put(protect, bootcampPhotoUpload);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

module.exports = router;
