import {ComponentRepository} from "../repositories/component.repository";
import Component from "../models/component.model";
import {UploadedFile} from "express-fileupload";
import path from "path";
import * as fs from "node:fs";

export class ComponentService {
    private componentRepository: ComponentRepository;
    private readonly uploadDir: string;
    private baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    constructor() {
        this.componentRepository = new ComponentRepository();
        this.uploadDir = path.join(__dirname, '../uploads');
    }

    async createComponent(componentData: Component): Promise<Component> {
        const createdComponent = await this.componentRepository.createComponent(componentData);

        if (componentData.imageFile) {
            const file = componentData.imageFile;

            const newFileName = `component_${createdComponent.id}${path.extname(file.name)}`;
            const uploadPath = path.join(this.uploadDir, newFileName);

            await file.mv(uploadPath);

            await this.componentRepository.updateComponentImage(createdComponent.id, newFileName);
            createdComponent.image = `${this.baseUrl}/uploads/${newFileName}`;
        }
        return createdComponent;
    }

    async updateComponent(id: number, componentData: Component): Promise<Component> {
        const updatedComponent = await this.componentRepository.updateComponent(id, componentData);

        if (componentData.imageFile) {
            const file = componentData.imageFile;

            const newFileName = `component_${updatedComponent.id}${path.extname(file.name)}`;
            const uploadPath = path.join(this.uploadDir, newFileName);

            await file.mv(uploadPath);

            await this.componentRepository.updateComponentImage(updatedComponent.id, newFileName);
            updatedComponent.image = `${this.baseUrl}/uploads/${newFileName}`;
        } else {
            updatedComponent.image = updatedComponent.image ? `${this.baseUrl}/uploads/${updatedComponent.image}` : null;
        }
        return updatedComponent;
    }

    async deleteComponent(id: number): Promise<void> {
        const component = await this.componentRepository.findComponentById(id);

        if (component && component.image) {
            const imageFileName = path.basename(component.image);
            const imagePath = path.join(this.uploadDir, imageFileName);

            if (fs.existsSync(imagePath)) {
                try {
                    await fs.promises.unlink(imagePath);
                    console.log(`Deleted image file: ${imagePath}`);
                } catch (error) {
                    console.error(`Error deleting image file: ${error}`);
                }
            }
        }

        await this.componentRepository.deleteComponent(id);
    }

    async findAllComponents(): Promise<Component[]> {
        const components = await this.componentRepository.findAllComponents();
        return components.map(component => ({
            ...component,
            image: component.image ? `${this.baseUrl}/uploads/${component.image}` : null
        }));
    }
}