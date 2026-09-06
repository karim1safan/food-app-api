const JWT = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  try {
    // console.log(req.headers.authorization.split(" ")[1]);

    // get the first value in arr
    // Authorization: Bearer abc123xyz
    // ['Bearer', 'abc123xyz']
    // const token = req.headers.authorization.split(" ")[1];

    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const token = tokenHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Please Provide Auth token!",
      error: error.message,
    });
  }
}

module.exports = { authMiddleware };
