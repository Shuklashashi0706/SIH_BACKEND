import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import { SuperAdminModel } from "../../models/superAdmin/superadmin.js"; // Import your SuperAdmin model

export const register = async (req, res) => {
  try {
    // Destructure user data from the request body
    const { firstname, lastname, emailaddress, password, accounttype } =
      req.body;

    // Check if the email address already exists in the database
    let existingUser = await SuperAdminModel.findOne({ emailaddress });

    // If an existing user is found, respond with a "User already exists" message
    if (existingUser) {
      return res.status(400).json({ message: "SuperAdmin already exists" });
    }

    // Validate user data (you can add more validation here)
    if (!firstname || !lastname || !emailaddress || !password || !accounttype) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new SuperAdmin document and store it in the database
    const newSuperAdmin = await SuperAdminModel.create({
      firstname,
      lastname,
      emailaddress,
      password: hashedPassword,
      accounttype,
    });

    // Return a success response with the created SuperAdmin data
    return res
      .status(200)
      .json({ message: "Registration successful", superAdmin: newSuperAdmin });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    // Get user data from the request body
    const { emailaddress, password, accountType } = req.body;

    // Validate user data (you can add more validation here)
    if (!emailaddress || !password || !accountType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the super admin by email address in the database
    const superAdmin = await SuperAdminModel.findOne({ emailaddress });

    // Check if a super admin with the provided email exists
    if (!superAdmin) {
      return res.status(404).json({ message: "SuperAdmin not found" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = bcrypt.compareSync(password, superAdmin.password);

    if (isPasswordValid) {
      // Password is correct, send a success response
      return res.status(200).json({ message: "Login successful", superAdmin });
    } else {
      // Password is incorrect, send an error response
      return res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};