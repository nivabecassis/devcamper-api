const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  getBootcampsFromRadius,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controllers/bootcamps");

// Resource router
const courseRouter = require("./courses");

const router = express.Router();

// Direct anything with /:bootcampId/courses to course router
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsFromRadius);

router.route("/").get(getBootcamps).post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
