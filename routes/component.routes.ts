import {Router} from "express";
import {createComponent, findAllComponents} from "../controllers/component.controller";

const router = Router();

// Create a new component
router.post('/', createComponent);

// Get all components
router.get('/', findAllComponents);

export default router;