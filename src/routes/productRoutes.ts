import { Router } from 'express';
import ProductController from '../controllers/productController';

export default function productRoutes() {
    const router = Router();
    const productController = new ProductController();

    // Public: list products (supports ?page=&limit=&category=)
    router.get('/', productController.listProducts.bind(productController));

    // Public: get single product by id or jsonId
    router.get('/:id', productController.getProduct.bind(productController));

    return router;
}
