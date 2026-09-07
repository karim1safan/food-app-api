const adminMiddleware = (req, res, next) => {
    // means the user is logged in and has a role of admin
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only.",
    });
  }
};


module.exports = { adminMiddleware };