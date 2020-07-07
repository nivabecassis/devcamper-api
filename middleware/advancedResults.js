const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // The copy should not contain these fields
  // They are added as query projection
  const reqQuery = { ...req.query };
  const excludeFieldsList = ["select", "sort", "page", "limit"];
  excludeFieldsList.forEach((param) => delete reqQuery[param]);

  // Use of operators in request
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(lt|lte|gt|gte|in)\b/g,
    (match) => `$${match}`
  );

  query = model.find(JSON.parse(queryStr));

  // Project the requested fields (select)
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sorting
  if (req.query.sort) {
    const sortInstruction = req.query.sort.split(",").join(" ");
    console.log(sortInstruction);
    query = query.sort(sortInstruction);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  const pagination = { limit };

  if (endIndex < total) {
    pagination.next = page + 1;
  }

  if (startIndex > 0) {
    pagination.previous = page - 1;
  }

  // Populate
  if (populate) {
    query = query.populate(populate);
  }

  const results = await query;
  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;
