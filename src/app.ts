import 'dotenv/config';
import express from 'express';
import { json } from 'body-parser';
import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import authJwt from './middleware/authJwt';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use('/api/users', userRoutes());

// Public product read endpoints
app.use('/api/products', productRoutes());

// Auth routes
app.use('/api/auth', authRoutes());

// Admin routes protected by JWT middleware (ensureAuthenticated + ensureAdmin)
app.use('/api/admin', authJwt.ensureAuthenticated, authJwt.ensureAdmin, adminRoutes());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});