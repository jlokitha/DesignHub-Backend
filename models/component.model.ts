import Tag from "./tag.model";
import {UploadedFile} from "express-fileupload";

interface Component {
    id?: number;
    title: string;
    code: string;
    description: string;
    userId: number;
    tags: Tag[];
    createdAt?: Date;
    image?: string | null;
    username?: string;
    imageFile?: UploadedFile | undefined;
}

export default Component;