// User routes
import express from "express"
import { 
  getUserProfile, 
  getUserPosts, 
  updateUserProfile
} from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.get("/posts", protect, getUserPosts);
router.put("/profile", protect, updateUserProfile);

export default router;