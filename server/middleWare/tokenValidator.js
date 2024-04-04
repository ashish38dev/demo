import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, 'test@@1122');
      // Set the user data in the request object
      const {_id} = decoded;
      res._id = _id
      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // If token verification fails, return 403 Forbidden
      return res.status(403).json({ success: false, error: 'Invalid token' });
    }
  };
  