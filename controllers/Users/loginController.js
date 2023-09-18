//For Register
import bcrypt from "bcryptjs";
import { UserModel } from "../../models/Users/user.js";

export const register = async (req, res) => {
  try {
    // Destructure user data from the request body
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      accountType,
      phoneNo,
    } = req.body;
    // // Check if the email address already exists in the database
    let existingUser = await UserModel.findOne({ emailAddress });

    // If an existing user is found, respond with a "User already exists" message
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Validate user data (you can add more validation here)
    if (
      !firstName ||
      !lastName ||
      !emailAddress ||
      !password ||
      !accountType ||
      !phoneNo
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);
    // Create a new user document and store it in the database
    const newUser = await UserModel.create({
      firstName,
      lastName,
      emailAddress,
      password: hashedPassword,
      accountType,
      phoneNo,
    });

    // Return a success response with the created user data
    return res
      .status(200)
      .json({ message: "Registration successful", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// For Login
export const login = async (req, res) => {
  try {
    // Get user data from the request body
    const { emailAddress, password, accountType } = req.body;

    // Validate user data (you can add more validation here)
    if (!emailAddress || !password || !accountType) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Find the user by email address in the database
    const user = await UserModel.findOne({ emailAddress });
    // Check if a user with the provided email exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Compare the provided password with the stored hashed password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (isPasswordValid) {
      // Password is correct, send a success response
      return res.status(200).json({ message: "Login successful", user });
    } else {
      // Password is incorrect, send an error response
      return res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await UserModel.find().maxTimeMS(30000);
    if (users.length === 0) {
      // No users found in the database
      return res.status(404).json({ message: "No users found" });
    }
    // Users found, send the list of users
    return res.status(200).json({ message: "Users found", users });
  } catch (error) {
    console.error(`${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the URL parameter
    // Find the user by ID in the database
    const user = await UserModel.findById(userId);
    if (!user) {
      // If no user with the provided ID is found, send a 404 response
      return res.status(404).json({ message: "User not found" });
    }
    // User found, send the user object
    return res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.error("Error while retrieving user by ID:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteAllUsers = async (req, res) => {
  try {
    // Delete all users from the database
    const result = await UserModel.deleteMany({});
    // Check the result to see if any users were deleted
    if (result.deletedCount === 0) {
      // No users were deleted
      return res.status(404).json({ message: "No users found to delete" });
    }
    // Users were deleted successfully
    return res.status(200).json({ message: "All users deleted" });
  } catch (error) {
    console.error("Error while deleting users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the URL parameter
    // Find and delete the user by ID in the database
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      // If no user with the provided ID is found, send a 404 response
      return res.status(404).json({ message: "User not found" });
    }
    // User deleted successfully, send a 200 response
    return res.status(200).json({ message: "User deleted", user: deletedUser });
  } catch (error) {
    console.error("Error while deleting user by ID:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
