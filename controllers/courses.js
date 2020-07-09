const asyncHandler = require("../middleware/async");
const ApiError = require("../utils/ApiError");
const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");

// @desc    Get all courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const results = await Course.find({ bootcamp: req.params.bootcampId });
    return res
      .status(200)
      .json({ success: true, count: results.length, data: results });
  }

  res.status(200).json(res.advancedResults);
});

// @desc    Get a single course
// @route   GET /api/v1/courses/:id
// @access  Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });
  if (!course) {
    return next(
      new ApiError(`Resource not found with ID ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: course });
});

// @desc    Create a course
// @route   POST /api/v1/bootcamps/:bootcampId/courses
// @access  Private
exports.createCourse = asyncHandler(async (req, res, next) => {
  // Set the bootcampId in the body
  req.body.bootcamp = req.params.bootcampId;

  // Make sure the specified bootcamp exists
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  if (!bootcamp) {
    return next(
      new ApiError(`Resource not found with ID ${req.params.bootcampId}`, 404)
    );
  }

  const course = await Course.create(req.body);
  res.status(200).json({ success: true, data: course });
});

// @desc    Update a course
// @route   PUT /api/v1/courses/:id
// @access  Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    return next(
      new ApiError(`Resource not found with ID ${req.params.bootcampId}`, 404)
    );
  }

  res.status(200).json({ success: true, data: course });
});

// @desc    Delete a course
// @route   DELETE /api/v1/courses/:id
// @access  Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);
  if (!course) {
    return next(
      new ApiError(`Resource not found with ID ${req.params.bootcampId}`, 404)
    );
  }

  // Trigger remove middleware
  await course.remove();

  res.status(200).json({ success: true, data: {} });
});
