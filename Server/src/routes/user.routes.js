import { Router } from "express";
import {
  changePassword,
  editProfile,
  followOrUnfollow,
  getProfile,
  getSuggestedUsers,
  login,
  logout,
  register,
} from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middldeware.js";
const router = Router();
router.route("/register").post(
  upload.fields([
    {
      name: "profilePicture",
      maxCount: 1,
    },
  ]),
  register
);
router.route("/login").post(login);
router.route("/logout").get(verifyJWT, logout);
router.route("/:id/profile").get(verifyJWT, getProfile);
router.route("/change-password").post(verifyJWT, changePassword);
router
  .route("/update-account")
  .patch(verifyJWT, upload.single("profilePicture"), editProfile);
router.route("/suggested_user").get(verifyJWT, getSuggestedUsers);
router.route("/followunfollow/:id").post(verifyJWT, followOrUnfollow);

export default router;
