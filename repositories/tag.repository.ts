import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TagRepository {
    async findAllTags() {
        return prisma.tag.findMany();
    }
}