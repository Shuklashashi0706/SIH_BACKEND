import bcrypt from "bcryptjs";
import { JudgeModel } from "../../models/Judge/judge.js";

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
      location,
      caseDomain,
      yearOfJoining,
    } = req.body;

    // Check if the email address already exists in the database
    let existingUser = await JudgeModel.findOne({ emailAddress });

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
      !location ||
      !caseDomain ||
      !yearOfJoining
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new Judge document and store it in the database
    const newJudge = await JudgeModel.create({
      firstName,
      lastName,
      emailAddress,
      password: hashedPassword,
      accountType,
      phoneNo,
      location,
      caseDomain,
      yearOfJoining,
    });

    // Return a success response with the created Judge data
    return res
      .status(200)
      .json({ message: "Registration successful", user: newJudge });
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
    const lawyer = await JudgeModel.findOne({ emailAddress });

    // Check if a user with the provided email exists
    if (!lawyer) {
      return res.status(404).json({ message: "Lawyer not found" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = bcrypt.compareSync(password, lawyer.password);

    if (isPasswordValid) {
      // Password is correct, send a success response
      return res.status(200).json({ message: "Login successful", lawyer });
    } else {
      // Password is incorrect, send an error response
      return res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
