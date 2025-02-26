import {Router} from "express";
import {findAllTags} from "../controllers/tag.controller";

const router = Router();

router.get('/', findAllTags);

export default router;