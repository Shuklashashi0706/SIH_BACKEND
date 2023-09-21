import { LawyerModel } from "../../models/lawyer/lawyer.js";

export const getAllLawyers = async (req, res) => {
  try {
    // Fetch all lawyers from the database
    const lawyers = await LawyerModel.find();

    if (lawyers.length === 0) {
      // No lawyers found in the database
      return res.status(404).json({ message: "No lawyers found" });
    }
    // Send the list of lawyers with a success message
    return res.status(200).json({ message: "Successful", lawyers });
  } catch (error) {
    console.error("Error while fetching lawyers:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLawyerById = async (req, res) => {
  try {
    const { lawyerId } = req.body;
    // Find the lawyer by their ID
    const lawyer = await LawyerModel.findById(lawyerId);
    if (!lawyer) {
      return res.status(404).json({ message: "Lawyer not found" });
    }
    res.status(200).json({ lawyer });
  } catch (error) {
    console.error("Error while fetching lawyer by ID:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLawyerByName = async (req, res) => {
  try {
    const { firstName, lastName } = req.body; // Assuming you receive the lawyer's first name and last name

    // Find a lawyer by first name and last name
    const lawyer = await LawyerModel.findOne({
      firstName,
      lastName,
    });

    if (!lawyer) {
      // No lawyer found with the provided name
      return res.status(404).json({ message: "Lawyer not found" });
    }

    // Return the lawyer's profile as a response
    res.status(200).json({ lawyer });
  } catch (error) {
    console.error("Error while searching for lawyer by name:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLawyerByLocation = async (req, res) => {
  try {
    const { location } = req.body;
    // Find lawyers by location in the database
    const lawyers = await LawyerModel.find({ location });
    if (lawyers.length === 0) {
      // No lawyers found in the specified location
      return res
        .status(404)
        .json({ message: "No lawyers found in the specified location" });
    }
    return res.status(200).json({
      message: "Lawyers found in the specified location",
      lawyers,
    });
  } catch (error) {
    console.error("Error while fetching lawyers by location:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getLawyerByCaseDomain = async (req, res) => {
  try {
    const { caseDomain } = req.body;
    // Find lawyers by case domain in the database
    const lawyers = await LawyerModel.find({ caseDomain });
    if (lawyers.length === 0) {
      // No lawyers found for the specified case domain
      return res
        .status(404)
        .json({ message: "No lawyers found for the specified case domain" });
    }
    // // Prepare a response with relevant lawyer information (name and location)
    // const lawyerData = lawyers.map((lawyer) => ({
    //   Name: `${lawyer.firstName} ${lawyer.lastName}`,
    //   Location: lawyer.location,
    // }));
    // Send the list of lawyers with the specified case domain
    return res.status(200).json({
      message: `Lawyers found for the case domain: ${caseDomain}`,
      lawyers,
    });
  } catch (error) {
    console.error("Error while fetching lawyers by case domain:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCaseDomain = async (req, res) => {
  try {
    // Fetch all lawyers from the database
    const lawyers = await LawyerModel.find();
    if (lawyers.length === 0) {
      // No lawyers found in the database
      return res.status(404).json({ message: "No lawyers found" });
    }
    // Extract unique case domains from the lawyers
    const uniqueCaseDomains = [
      ...new Set(lawyers.map((lawyer) => lawyer.caseDomain)),
    ];

    res.status(200).json({ caseDomains: uniqueCaseDomains });
  } catch (error) {
    console.error("Error while fetching case domains:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLocation = async (req, res) => {
  try {
    // Fetch all lawyers from the database
    const lawyers = await LawyerModel.find();

    if (lawyers.length === 0) {
      // No lawyers found in the database
      return res.status(404).json({ message: "No lawyers found" });
    }

    // Extract unique locations from the lawyers
    const uniqueLocations = [
      ...new Set(lawyers.map((lawyer) => lawyer.location)),
    ];

    res.status(200).json({ locations: uniqueLocations });
  } catch (error) {
    console.error("Error while fetching locations:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
