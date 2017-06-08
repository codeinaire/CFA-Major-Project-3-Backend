const express = require('express');

const router = new express.Router();

router.get('/profileform', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message.",
    // user values passed through from auth middleware
    user: req.user,
  });
  // console.log("req.user", req.user);
});

module.exports = router;
