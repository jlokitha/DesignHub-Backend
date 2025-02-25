import {TagService} from "../services/tag.service";
import { Request, Response } from 'express';

const tagService = new TagService();

export const findAllTags = async (req: Request, res: Response) => {
    try {
        const tags = await tagService.findAllTags();
        res.status(200).json(tags);
    } catch (error) {
        res.status(400).json('Error fetching tags');
    }
}