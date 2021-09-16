const express = require("express");
const router = express.Router();

const {
  authMiddleware,
  adminMiddleware,
  requireSignin,
} = require("../controllers/auth");
const { create } = require("../controllers/blog");

router.post("/blog", requireSignin, adminMiddleware, create);

module.exports = router;
