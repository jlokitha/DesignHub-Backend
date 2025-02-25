import {ComponentRepository} from "../repositories/component.repository";
import Component from "../models/component.model";
import {UploadedFile} from "express-fileupload";
import path from "path";

export class ComponentService {
    private componentRepository: ComponentRepository;
    private readonly uploadDir: string;
    private baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    constructor() {
        this.componentRepository = new ComponentRepository();
        this.uploadDir = path.join(__dirname, '../uploads');
    }

    async createComponent(
        componentData: Component,
        imageFile?: UploadedFile
    ): Promise<Component> {
        // Save the component data (without the image) in the repository (e.g., DB)
        const createdComponent = await this.componentRepository.createComponent(componentData);

        // If an image file was provided, process and save it
        if (imageFile) {
            // Handle possible array of files; assume single file for now
            const file = imageFile;

            // Create a new filename using the component id, current timestamp, and the original file extension
            const newFileName = `component_${createdComponent.id}${path.extname(file.name)}`;
            const uploadPath = path.join(this.uploadDir, newFileName);

            // Move the file to the uploads folder
            await file.mv(uploadPath);

            await this.componentRepository.updateComponentImage(createdComponent.id, newFileName);
            createdComponent.image = `${this.baseUrl}/uploads/${newFileName}`;
        }
        return createdComponent;
    }

    async findAllComponents(): Promise<Component[]> {
        const components = await this.componentRepository.findAllComponents();
        return components.map(component => ({
            ...component,
            image: component.image ? `${this.baseUrl}/uploads/${component.image}` : null
        }));
    }
}