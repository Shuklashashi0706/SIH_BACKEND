//For Register
import bcrypt from "bcryptjs";
import { LawyerModel } from "../../models/lawyer/lawyer.js";


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
      caseDomain,
      location,
      yearOfJoining,
    } = req.body;

    // Check if the email address already exists in the database
    let existingUser = await LawyerModel.findOne({ emailAddress });

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
      !phoneNo ||
      !caseDomain ||
      !location ||
      !yearOfJoining
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user document and store it in the database
    const newUser = await LawyerModel.create({
      firstName,
      lastName,
      emailAddress,
      password: hashedPassword,
      accountType,
      phoneNo,
      caseDomain,
      location,
      yearOfJoining,
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

export const login = async (req, res) => {
  try {
    // Get user data from the request body
    const { emailAddress, password, accountType } = req.body;

    // Validate user data (you can add more validation here)
    if (!emailAddress || !password || !accountType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user by email address in the database
    const user = await LawyerModel.findOne({ emailAddress });

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

export const getAllLawyers = async (req, res) => {
  try {
    // Fetch all lawyers from the database
    const lawyers = await LawyerModel.find();

    if (lawyers.length === 0) {
      // No lawyers found in the database
      return res.status(404).json({ message: "No lawyers found" });
    }

    // Lawyers found, send the list of lawyers
    return res.status(200).json({ message: "Lawyers found", lawyers });
  } catch (error) {
    console.error("Error while fetching lawyers:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLawyerById = async (req, res) => {
  try {
    const lawyerId = req.params.id; // Get the lawyer ID from the URL parameter

    // Find the lawyer by ID in the database
    const lawyer = await LawyerModel.findById(lawyerId);

    if (!lawyer) {
      // If no lawyer with the provided ID is found, send a 404 response
      return res.status(404).json({ message: "Lawyer not found" });
    }

    // Lawyer found, send the lawyer object
    return res.status(200).json({ message: "Lawyer found", lawyer });
  } catch (error) {
    console.error("Error while retrieving lawyer by ID:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteAllLawyers = async (req, res) => {
  try {
    // Delete all lawyers from the database
    const result = await LawyerModel.deleteMany({});

    // Check the result to see if any lawyers were deleted
    if (result.deletedCount === 0) {
      // No lawyers were deleted
      return res.status(404).json({ message: "No lawyers found to delete" });
    }

    // Lawyers were deleted successfully
    return res.status(200).json({ message: "All lawyers deleted" });
  } catch (error) {
    console.error("Error while deleting lawyers:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteLawyerById = async (req, res) => {
  try {
    const lawyerId = req.params.id; // Get the lawyer ID from the URL parameter

    // Find and delete the lawyer by ID in the database
    const deletedLawyer = await LawyerModel.findByIdAndDelete(lawyerId);

    if (!deletedLawyer) {
      // If no lawyer with the provided ID is found, send a 404 response
      return res.status(404).json({ message: "Lawyer not found" });
    }

    // Lawyer deleted successfully, send a 200 response
    return res
      .status(200)
      .json({ message: "Lawyer deleted", lawyer: deletedLawyer });
  } catch (error) {
    console.error("Error while deleting lawyer by ID:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
