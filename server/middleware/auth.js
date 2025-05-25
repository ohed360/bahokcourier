import jwt from 'jsonwebtoken';
export default function auth(roles = []) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });
    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (roles.length && !roles.includes(data.role)) return res.status(403).json({ message: 'Forbidden' });
    req.user = data;
    next();
  };
}