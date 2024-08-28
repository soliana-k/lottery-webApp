// import jwt from "jsonwebtoken";

// const isAuthenticated = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;
//         if(!token){
//             return res.status(401).json({
//                 message: "admin not authenticated",
//                 success:false
//             })
//         }
//         const decode = await jwt.verify(token, process.env.SECRET_KEY);
//         if(!decode){
//             return res.status(401).json({
//                 message:"invalid token",
//                 success:false
//             })
//         };
//         req.id = decode.adminId;
//         next();

//     }catch (error) {
//         console.log(error);
//     }
// }
// export default isAuthenticated;
import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: 'Admin not authenticated',
        success: false
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        message: 'Invalid token',
        success: false
      });
    }

    req.adminId = decoded.adminId; // Ensure the token contains adminId
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      message: 'Authentication failed',
      success: false
    });
  }
};

export default isAuthenticated;