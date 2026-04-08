const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Access Denied" });
    }

    next();
  };
};

module.exports = { authorizeRoles };