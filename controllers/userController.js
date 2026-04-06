// Example controller function: Get user profile
const getUserProfile = async (req, res) => {
  try {
    // In Phase 3 & 4, we will fetch user data from Supabase
    res.json({ message: "User profile endpoint hit! (Data coming soon in Phase 3)" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
};

module.exports = {
  getUserProfile
};
