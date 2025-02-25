import {ComponentService} from "../services/component.service";
import { Request, Response } from 'express';
import Component from "../models/component.model";
import path from "path";
import fileUpload, {UploadedFile} from "express-fileupload";

const componentService = new ComponentService();

export const createComponent = async (req: Request, res: Response) => {
    try {
        // Extract fields from the request body
        const { title, code, description, tags, userId } = req.body;
        // Parse tags if they come as a JSON string
        const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;

        // Get the uploaded file from req.files (assuming express-fileupload middleware)
        let imageFile: UploadedFile | undefined;
        if (req.files && req.files.image) {
            imageFile = Array.isArray(req.files.image)
                ? req.files.image[0]
                : req.files.image;
        }

        // Build a component data object (without image; the service will handle the file)
        const componentData = {
            title,
            code,
            description,
            tags: parsedTags,
            userId: Number(userId),
        };

        // Call the service to create the component and handle the image
        const createdComponent = await componentService.createComponent(componentData, imageFile);

        res.status(201).json(createdComponent);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(400).json({ error: 'Error creating component' });
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