import {ComponentService} from "../services/component.service";
import { Request, Response } from 'express';
import {UploadedFile} from "express-fileupload";

const componentService = new ComponentService();

export const createComponent = async (req: Request, res: Response) => {
    try {
        const { title, code, description, tags, userId } = req.body;
        const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;

        let imageFile: UploadedFile | undefined;
        if (req.files && req.files.image) {
            imageFile = Array.isArray(req.files.image)
                ? req.files.image[0]
                : req.files.image;
        }

        const componentData = {
            title: title,
            code: code,
            description: description,
            tags: parsedTags,
            userId: Number(userId),
            imageFile: imageFile
        };

        const createdComponent = await componentService.createComponent(componentData);

        res.status(201).json(createdComponent);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(400).json({ error: 'Error creating component' });
    }
};

export const updateComponent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, code, description, tags, userId } = req.body;
        const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;

        let imageFile: UploadedFile | undefined;
        if (req.files && req.files.image) {
            imageFile = Array.isArray(req.files.image)
                ? req.files.image[0]
                : req.files.image;
        }

        const componentData = {
            title: title,
            code: code,
            description: description,
            tags: parsedTags,
            userId: Number(userId),
            imageFile: imageFile
        };

        const updatedComponent = await componentService.updateComponent(Number(id), componentData);

        res.status(200).json(updatedComponent);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(400).json({ error: 'Error updating component' });
    }
};

export const deleteComponent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await componentService.deleteComponent(Number(id));
        res.status(204).end();
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(400).json({ error: 'Error deleting component' });
    }
};

export const findAllComponents = async (req:Request, res:Response) => {
    try {
        const components = await componentService.findAllComponents();
        res.status(200).json(components);
    } catch (error) {
        res.status(400).json('Error fetching components');
    }
}