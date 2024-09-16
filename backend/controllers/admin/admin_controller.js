import { Admin } from "../../models/admin/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const AdminRegistration = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password } = req.body;
    if (!fullname || !email || !phoneNumber || !password) {
  return res.status(400).json({
    message: "Please fill all required fields",
    success: false
  });
}

let profilePhotoPath = '';
if (req.file) {
  profilePhotoPath = req.file.path; // Save the path to the uploaded file
}


    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      profilePhoto: profilePhotoPath    
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

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
      return res.status(400).json({
          message: "Incorrect email or password",
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
    const tokenData = { adminId: admin._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

    // Send response
    return res.status(200)
      .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
      .json({
        admin: {
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

export const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get specific admin by ID
export const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).json({ message: 'Admin not found' });
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an admin
export const updateAdmin = async (req, res) => {
  try {
      const { fullname, email, phoneNumber } = req.body;
      const updateFields = { fullname, email, phoneNumber };

      if (req.file) {
          updateFields.profilePhoto = req.file.path; // Update profile photo path
      }

      const updatedAdmin = await Admin.findByIdAndUpdate(
          req.params.id,
          updateFields,
          { new: true }
      );
      if (!updatedAdmin) return res.status(404).json({ message: 'Admin not found' });
      res.json(updatedAdmin);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// controllers/adminController.js
export const logoutAdmin = async (req, res) => {
  try {
      res.clearCookie("token", {
          httpOnly: true,
          sameSite: 'None',
          secure: true,
         
      });
      return res.status(200).json({
          message: "Logged out successfully",
          success: true
      });
  } catch (error) {
      console.error("Logout error:", error);
      return res.status(500).json({
          message: "Internal server error",
          success: false
      });
  }
};


