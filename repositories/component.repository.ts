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

    async updateComponent(componentId: number, component: Component) {
        return prisma.$transaction(async (prisma) => {
            const updatedComponent = await prisma.component.update({
                where: {id: componentId},
                data: {
                    title: component.title,
                    code: component.code,
                    description: component.description,
                    userId: componentId,
                },
                include: {
                    user: {
                        select: {
                            username: true,
                        },
                    },
                },
            });

            await prisma.componentTag.deleteMany({
                where: {componentId: componentId},
            });

            if (component.tags && component.tags.length > 0) {
                for (const tag of component.tags) {
                    let existingTag = await prisma.tag.findUnique({
                        where: {id: tag.id},
                    });

                    if (!existingTag) {
                        existingTag = await prisma.tag.create({
                            data: {name: tag.name},
                        });
                    }

                    await prisma.componentTag.create({
                        data: {
                            componentId: updatedComponent.id,
                            tagId: existingTag.id,
                        },
                    });
                }
            }

            return {
                ...updatedComponent,
                tags: component.tags,
                username: updatedComponent.user.username,
            };
        });
    }

    async deleteComponent(componentId: number) {
        await prisma.componentTag.deleteMany({
            where: {componentId},
        });

        return prisma.component.delete({
            where: {id: componentId},
        });
    }

    async updateComponentImage(componentId: number, imageName: string) {
        return prisma.component.update({
            where: {id: componentId},
            data: {image: imageName},
        });
    }

    async findComponentById(componentId: number) {
        return prisma.component.findUnique({
            where: {id: componentId},
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