import prisma from '../prisma/client';
import { CreateProductDto, Product } from '../types';

export class ProductService {
    async createProduct(data: CreateProductDto): Promise<Product> {
        // Upsert by jsonId to avoid duplicates when seeding/importing
        const product = await prisma.product.upsert({
            where: { jsonId: data.jsonId },
            update: data as any,
            create: data as any,
        });
        return product as unknown as Product;
    }

    async findByJsonId(jsonId: string): Promise<Product | null> {
        return prisma.product.findUnique({ where: { jsonId } }) as unknown as Promise<Product | null>;
    }

    async findById(id: string): Promise<Product | null> {
        return prisma.product.findUnique({ where: { id } }) as unknown as Promise<Product | null>;
    }

    async findByIdOrJsonId(idOrJsonId: string): Promise<Product | null> {
        // try by jsonId then by id
        let p = await this.findByJsonId(idOrJsonId);
        if (!p) p = await this.findById(idOrJsonId);
        return p;
    }

    async listProducts(opts: { page?: number; limit?: number; category?: string }) {
        const page = opts.page && opts.page > 0 ? opts.page : 1;
        const limit = opts.limit && opts.limit > 0 ? opts.limit : 20;
        const skip = (page - 1) * limit;

        const where: any = {};
        if (opts.category) where.category = opts.category;

        const items = await prisma.product.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } });
        const total = await prisma.product.count({ where });
        return { items, total, page, limit };
    }

    async updateProduct(idOrJsonId: string, data: Partial<CreateProductDto>): Promise<Product | null> {
        // find product
        const product = await this.findByIdOrJsonId(idOrJsonId);
        if (!product) return null;
        const updated = await prisma.product.update({ where: { id: product.id }, data: data as any });
        return updated as unknown as Product;
    }

    async deleteProduct(idOrJsonId: string): Promise<Product | null> {
        const product = await this.findByIdOrJsonId(idOrJsonId);
        if (!product) return null;
        const deleted = await prisma.product.delete({ where: { id: product.id } });
        return deleted as unknown as Product;
    }
}

export default new ProductService();
