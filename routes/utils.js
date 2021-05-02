const isMongoError = (error) => {
  return (
    typeof error === "object" &&
    error !== null &&
    error.name === "MongoNetworkError"
  );
};

module.exports = { isMongoError };
