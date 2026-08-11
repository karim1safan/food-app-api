const testController = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Test route is working",
  });
};

module.exports = { testController };
