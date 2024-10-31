import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  addComment,
  addNewPost,
  bookMarkPost,
  deletePost,
  disLikePost,
  getAllPost,
  getCommentsOfPost,
  getMyPost,
  likePost,
} from "../controller/post.controller.js";
import { verifyJWT } from "../middleware/auth.middldeware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
  .route("/")
  .get(getAllPost)
  .post(
    upload.fields([
      {
        name: "image",
        maxCount: 1,
      },
    ]),
    addNewPost
  );

router.route("/:id/deletepost").delete(deletePost);
router.route("/mypost").get(getMyPost);

router.route("/toggle/:id/bookmark").get(bookMarkPost);
router.route("/:id/addcomment").post(addComment);
router.route("/:id/like").post(likePost);
router.route("/:id/dislike").post(disLikePost);
router.route("/:id/postcomments").post(getCommentsOfPost);

export default router;
