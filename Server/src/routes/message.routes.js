import { Router } from "express";

import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middldeware.js";
import { deleteMsg, getMessage, sendMessage } from "../controller/message.controller.js";
const router = Router();
router.route("/send/:id").post(verifyJWT, sendMessage);
router.route("/all/:id").get(verifyJWT, getMessage);
router.route("/msg/:id").delete(verifyJWT, deleteMsg);

export default router;
