const express = require("express");
const router = express.Router();

const {
  authMiddleware,
  adminMiddleware,
  requireSignin,
} = require("../controllers/auth");
const {
  create,
  list,
  listAllBlogsCategoriesTags,
  read,
  remove,
  update,
  photo,
} = require("../controllers/blog");

router.get("/blogs", list);
router.get("/blog/:slug", read);
router.get("/blog/photo/:slug", photo);
router.post("/blog", requireSignin, adminMiddleware, create);
router.post("/blogs-categories-tags", listAllBlogsCategoriesTags);
router.put("/blog/:slug", requireSignin, adminMiddleware, update);
router.delete("/blog/:slug", requireSignin, adminMiddleware, remove);

module.exports = router;
