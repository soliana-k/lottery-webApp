import { Admin } from "../../models/admin/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
        success: false
      });
    }

    // Fetch admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        message: "Unauthorized access",
        success: false
      });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false
      });
    }

    // Generate token
    const tokenData = { userId: admin._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

    // Send response
    return res.status(200)
      .cookie("adminToken", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
      .json({
        user: {
          _id: admin._id,
          fullname: admin.fullname,
          email: admin.email
        },
        message: `Welcome back ${admin.fullname}`,
        success: true
      });

  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};
