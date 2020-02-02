import jwt from 'jsonwebtoken'
export default (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
      const bearerToken = bearerHeader.split(' ')[1];
    //   const bearerToken = bearer[1];
  
      const myData = jwt.verify(bearerToken, 'PRIVATEKEY', myData);
  
      next();
    } else {
      return res.status(401).json({status:401,message:'To access this resource require A token!'});
    }
  };