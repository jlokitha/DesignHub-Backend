import fs from 'fs/promises';
import path from 'path';

export class ImageService {
    private readonly folderPath: string;

    constructor() {
        this.folderPath = 'assets';
        fs.mkdir(this.folderPath, { recursive: true }).catch(err =>
            console.error('Error creating image folder:', err)
        );
    }

    /**
     * Saves an image file (of type File) to the folder.
     * Converts the File to a Buffer using its arrayBuffer() method.
     * @param file - The File object to be saved.
     * @param fileName - The name (with extension) for the saved file.
     * @returns The full path of the saved file.
     */
    async saveImage(file: File, fileName: string): Promise<string> {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const filePath = path.join(this.folderPath, fileName);
        await fs.writeFile(filePath, buffer);
        return filePath;
    }

    /**
     * Updates an existing image by overwriting it with new data from the File.
     * @param file - The new File data to update the image.
     * @param fileName - The name (with extension) of the image to update.
     * @returns The full path of the updated file.
     */
    async updateImage(file: File, fileName: string): Promise<string> {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const filePath = path.join(this.folderPath, fileName);
        await fs.writeFile(filePath, buffer);
        return filePath;
    }

    /**
     * Retrieves an image file from the folder.
     * @param fileName - The name (with extension) of the image to retrieve.
     * @returns The image data as a Buffer.
     */
    async getImage(fileName: string): Promise<Buffer> {
        const filePath = path.join(this.folderPath, fileName);
        return await fs.readFile(filePath);
    }

    /**
     * Deletes an image file from the folder.
     * @param fileName - The name (with extension) of the image to delete.
     */
    async deleteImage(fileName: string): Promise<void> {
        const filePath = path.join(this.folderPath, fileName);
        await fs.unlink(filePath);
    }
}
