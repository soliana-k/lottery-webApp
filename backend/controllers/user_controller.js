// import { User } from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const register = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, password } = req.body;
//     if (!fullname || !email || !phoneNumber || !password) {
//   return res.status(400).json({
//     message: "Please fill all required fields",
//     success: false
//   });
// }

// let profilePhotoPath = '';
// if (req.file) {
//   profilePhotoPath = req.file.path; // Save the path to the uploaded file
// }


//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({
//         message: "User already exists with this email",
//         success: false
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       fullname,
//       email,
//       phoneNumber,
//       password: hashedPassword,
//       profilePhoto: profilePhotoPath    
//     });

//     return res.status(201).json({
//       message: "Account created successfully",
//       success: true
//     });
//   } catch (error) {
//     console.error("Register error:", error);
//     return res.status(500).json({
//       message: "Internal server error",
//       success: false
//     });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({
//         message: "Please provide email and password",
//         success: false
//       });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({
//         message: "Incorrect email or password",
//         success: false
//       });
//     }

//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res.status(400).json({
//         message: "Incorrect email or password",
//         success: false
//       });
//     }

//     const tokenData = {
//       userId: user._id
//     };
//     const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

//     // Send user details and token in response
//     return res.status(200)
//       .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
//       .json({
//         user: {
//           _id: user._id,
//           fullname: user.fullname,
//           email: user.email,
//           phoneNumber: user.phoneNumber,
//         },
//         message: `Welcome back ${user.fullname}`,
//         success: true
//       });

//   } catch (error) {
//     console.error("Login error:", error);
//     return res.status(500).json({
//       message: "Internal server error",
//       success: false
//     });
//   }
// };

// export const logout = async (req, res) => {
//   try {
//     res.clearCookie("token");
//     return res.status(200).json({
//       message: "Logged out successfully",
//       success: true
//     });
//   } catch (error) {
//     console.error("Logout error:", error);
//     return res.status(500).json({
//       message: "Internal server error",
//       success: false
//     });
//   }
// };

// export const getUsers = async (req, res) => {
//   try {
//       const users = await User.find();
//       res.json(users);
//   } catch (error) {
//       res.status(500).json({ message: error.message });
//   }
// };

// // Get a specific admin by ID
// export const getUserById = async (req, res) => {
//   try {
//       const user = await User.findById(req.params.id);
//       if (!user) return res.status(404).json({ message: 'User not found' });
//       res.json(user);
//   } catch (error) {
//       res.status(500).json({ message: error.message });
//   }
// };

// // Update an admin
// export const updateUser = async (req, res) => {
// try {
//     const { fullname, email, phoneNumber } = req.body;
//     const updateFields = { fullname, email, phoneNumber };

//     if (req.file) {
//         updateFields.profilePhoto = req.file.path; // Update profile photo path
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//         req.params.id,
//         updateFields,
//         { new: true }
//     );
//     if (!updatedUser) return res.status(404).json({ message: 'User not found' });
//     res.json(updatedUser);
// } catch (error) {
//     res.status(400).json({ message: error.message });
// }
// };

// //If an error occur,delete the below code
// // Change Password
// export const changePassword = async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;

//     // Find the user by ID
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Check if current password is correct
//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Current password is incorrect' });
//     }

//     // Hash the new password
//     const hashedNewPassword = await bcrypt.hash(newPassword, 10);

//     // Update the password
//     user.password = hashedNewPassword;
//     await user.save();

//     res.status(200).json({ message: 'Password updated successfully' });
//   } catch (error) {
//     console.error('Change password error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password } = req.body;
    if (!fullname || !email || !phoneNumber || !password) {
      return res.status(400).json({
        message: "Please fill all required fields",
        success: false,
      });
    }

    let profilePhotoPath = "";
    if (req.file) {
      profilePhotoPath = req.file.path; // Save the path to the uploaded file
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      profilePhoto: profilePhotoPath,
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

    // Send user details and token in response
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          phoneNumber: user.phoneNumber,
        },
        message: `Welcome back ${user.fullname}`,
        success: true,
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const { fullname, email, phoneNumber } = req.body;
    const updateFields = { fullname, email, phoneNumber };

    if (req.file) {
      updateFields.profilePhoto = req.file.path; // Update profile photo path
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
    });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Change Password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Find the user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

