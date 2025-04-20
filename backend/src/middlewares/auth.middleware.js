import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token Not Received" });

  try {
    const success = jwt.verify(token, process.env.JWT_SECRET);
    req.user = success;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
