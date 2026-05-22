const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

//protected route - requires valid token
router.get('/me', protect, async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
});

module.exports = router;
