import {Router} from "express";
import {
    createComponent,
    deleteComponent,
    findAllComponents,
    updateComponent
} from "../controllers/component.controller";

const router = Router();

router.post('/', createComponent);

router.put('/:id', updateComponent);

router.delete('/:id', deleteComponent);

router.get('/', findAllComponents);

export default router;