import { PrismaClient } from "@prisma/client";
import Component from "../models/component.model";

const prisma = new PrismaClient();

export class ComponentRepository {
    async createComponent(component: Component) {
        return prisma.$transaction(async (prisma) => {
            const savedComponent = await prisma.component.create({
                data: {
                    title: component.title,
                    code: component.code,
                    description: component.description,
                    userId: component.userId,
                },
                include: {
                    user: {
                        select: {
                            username: true,
                        },
                    },
                },
            });

            if (component.tags && component.tags.length > 0) {
                for (const tag of component.tags) {
                    let existingTag = await prisma.tag.findUnique({
                        where: {name: tag.name},
                    });

                    if (!existingTag) {
                        existingTag = await prisma.tag.create({
                            data: {name: tag.name},
                        });
                    }

                    await prisma.componentTag.create({
                        data: {
                            componentId: savedComponent.id,
                            tagId: existingTag.id,
                        },
                    });
                }
            }

            return {
                ...savedComponent,
                tags: component.tags,
                username: savedComponent.user.username,
            };
        });
    }

    async updateComponentImage(componentId: number, imageName: string) {
        return prisma.component.update({
            where: {id: componentId},
            data: {image: imageName},
        });
    }

    async findAllComponents() {
        const components = await prisma.component.findMany({
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
                user: {
                    select: {
                        username: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return components.map(component => ({
            ...component,
            tags: component.tags.map(componentTag => ({
                id: componentTag.tag.id,
                name: componentTag.tag.name,
            })),
            username: component.user.username,
        }));
    }
}