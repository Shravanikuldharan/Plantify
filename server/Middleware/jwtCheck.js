const jwtCheck = (req, res, next) => {
  req.user = null;

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ message: "Authorization token missing" });
  }

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid JWT Token" });
  }
};

export default jwtCheck;