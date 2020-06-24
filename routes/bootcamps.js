const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  getBootcampsFromRadius,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp
} = require("../controllers/bootcamps");

const router = express.Router();

router.route("/radius/:zipcode/:distance").get(getBootcampsFromRadius);

router
  .route("/")
  .get(getBootcamps)
  .post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
