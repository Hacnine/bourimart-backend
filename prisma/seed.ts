import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  // Read the backend-local products.json by default
  const filePath = path.resolve(__dirname, '../products.json');
  if (!fs.existsSync(filePath)) {
    console.error('products.json not found at', filePath);
    process.exit(1);
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const products = JSON.parse(raw);

  for (const p of products) {
    const data: any = {
      jsonId: String(p.id ?? ''),
      name: p.name ?? '',
      brand: p.brand ?? null,
      stock: p.stock != null ? Number(p.stock) : null,
      quantity: p.quantity != null ? Number(p.quantity) : null,
      price: p.price != null ? Number(p.price) : 0,
      discount: p.discount != null ? Number(p.discount) : null,
      rating: p.rating != null ? Number(p.rating) : null,
      reviews: p.reviews != null ? Number(p.reviews) : null,
      recommended: !!p.recommended,
      colors: Array.isArray(p.colors) ? p.colors.map(String) : [],
      images: p.images ?? {},
      description: p.description ?? [],
      category: p.category ?? null,
      featured: !!p.featured,
      // use Prisma model field names
      newProduct: !!p.new_product || !!p.newProduct,
      fullDetails: p.full_details ?? p.fullDetails ?? [],
    };

    await prisma.product.upsert({
      where: { jsonId: data.jsonId },
      update: data,
      create: data,
    });
    console.log(`Upserted product ${data.jsonId} - ${data.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
