const User = require("../models/User");

exports.deleteUser = async (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const userId = req.params.id;

    // Use the User model's findByIdAndDelete method to delete the user
    const deletedUser = await User.findByIdAndDelete(userId);

    // Check if the user exists
    if (!deletedUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    // If the user is successfully deleted, return a success response
    return res.status(200).json({
      status: 200,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.log("Error deleting user:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
