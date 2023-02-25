const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(res.statusCode || 500);
    res.json({
      message: err.message,
      stack: err.stack,
    });
  } else {
    res.status(res.statusCode || 500);
    res.json({
      message: err.message,
    });
  }
};

module.exports = {
  notFound,
  errorHandler,
};
