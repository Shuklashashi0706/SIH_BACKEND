import { LawyerModel } from "../../models/lawyer/lawyer.js";

export const getAllLawyers = async (req, res) => {
  try {
    // Fetch all lawyers from the database
    const lawyers = await LawyerModel.find();

    if (lawyers.length === 0) {
      // No lawyers found in the database
      return res.status(404).json({ message: "No lawyers found" });
    }

    // // Prepare a response with relevant lawyer information including ID
    // const lawyerData = lawyers.map((lawyer) => ({
    //   ID: lawyer._id, // Include the lawyer ID
    //   Name: `${lawyer.firstName} ${lawyer.lastName}`,
    //   Location: lawyer.location,
    //   "Case Domain": lawyer.caseDomain,
    //   "Years Of Experience": new Date().getFullYear() - lawyer.yearOfJoining,
    // }));

    // Send the list of lawyers with a success message
    return res.status(200).json({ message: "Successful", lawyers});
  } catch (error) {
    console.error("Error while fetching lawyers:", error);
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
    // Prepare a response with relevant lawyer information (name and location)
    // const lawyerData = lawyers.map((lawyer) => ({
    //   Name: `${lawyer.firstName} ${lawyer.lastName}`,
    //   Location: lawyer.location,
    // }));
    // Send the list of lawyers with the specified location
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
