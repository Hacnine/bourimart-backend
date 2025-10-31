import { Request, Response } from 'express';
import productService from '../services/productService';

class ProductController {
    async createProduct(req: Request, res: Response) {
        try {
            const body = req.body;

            if (!body || !body.jsonId || !body.name || (body.price === undefined || body.price === null)) {
                return res.status(400).json({ message: 'jsonId, name and price are required' });
            }

            const created = await productService.createProduct(body);
            return res.status(201).json(created);
        } catch (err: any) {
            console.error('createProduct error', err);
            return res.status(500).json({ message: 'Internal server error', error: err?.message || err });
        }
    }

    async listProducts(req: Request, res: Response) {
        try {
            const page = Number(req.query.page || 1);
            const limit = Number(req.query.limit || 20);
            const category = req.query.category as string | undefined;

            const products = await productService.listProducts({ page, limit, category });
            return res.json(products);
        } catch (err: any) {
            console.error('listProducts error', err);
            return res.status(500).json({ message: 'Internal server error', error: err?.message || err });
        }
    }

    async getProduct(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!id) return res.status(400).json({ message: 'id required' });

            const product = await productService.findByIdOrJsonId(id);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            return res.json(product);
        } catch (err: any) {
            console.error('getProduct error', err);
            return res.status(500).json({ message: 'Internal server error', error: err?.message || err });
        }
    }

    async updateProduct(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const body = req.body;
            if (!id) return res.status(400).json({ message: 'id required' });

            const updated = await productService.updateProduct(id, body);
            if (!updated) return res.status(404).json({ message: 'Product not found' });
            return res.json(updated);
        } catch (err: any) {
            console.error('updateProduct error', err);
            return res.status(500).json({ message: 'Internal server error', error: err?.message || err });
        }
    }

    async deleteProduct(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!id) return res.status(400).json({ message: 'id required' });

            const deleted = await productService.deleteProduct(id);
            if (!deleted) return res.status(404).json({ message: 'Product not found' });
            return res.json({ message: 'Deleted', id: deleted.id });
        } catch (err: any) {
            console.error('deleteProduct error', err);
            return res.status(500).json({ message: 'Internal server error', error: err?.message || err });
        }
    }
}

export default ProductController;
