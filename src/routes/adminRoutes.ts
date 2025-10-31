import { Router } from 'express';
import ProductController from '../controllers/productController';

export default function adminRoutes() {
    const router = Router();
    const productController = new ProductController();

    // Admin: add product
    router.post('/products', productController.createProduct.bind(productController));

    // Admin: list (admin view)
    router.get('/products', productController.listProducts.bind(productController));

    // Admin: get single by id or jsonId
    router.get('/products/:id', productController.getProduct.bind(productController));

    // Admin: update
    router.put('/products/:id', productController.updateProduct.bind(productController));

    // Admin: delete
    router.delete('/products/:id', productController.deleteProduct.bind(productController));

    return router;
}
