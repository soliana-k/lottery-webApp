// controllers/admin/admin_user_controller.js
import User from '../../models/user.model.js'; // Adjust the path as necessary

// Function to get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.json(users); // Send the users as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};
