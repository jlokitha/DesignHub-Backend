import Tag from "./tag.model";

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
    imageFile?: File;
}

export default Component;