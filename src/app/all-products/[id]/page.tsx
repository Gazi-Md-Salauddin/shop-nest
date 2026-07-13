import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  inStock: boolean;
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
      </div>
    );
  }

  const product: Product = await res.json();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid gap-10 md:grid-cols-2">

        <div className="relative h-[450px] w-full overflow-hidden rounded-xl border">
          <Image
            src={product.image || "https://placehold.co/600x600/png"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-5">

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-500">
            Brand: {product.brand}
          </p>

          <p className="text-gray-500">
            Category: {product.category}
          </p>

          <h2 className="text-3xl font-bold text-blue-600">
            ${product.price}
          </h2>

          <div>
            {product.inStock ? (
              <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">
                In Stock ({product.stock})
              </span>
            ) : (
              <span className="rounded-full bg-red-100 px-4 py-2 text-red-700">
                Out of Stock
              </span>
            )}
          </div>

          <div>
            <h3 className="mb-2 text-xl font-semibold">
              Description
            </h3>

            <p className="leading-7 text-gray-600">
              {product.description}
            </p>
          </div>

          <button
            className="mt-6 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Buy Now
          </button>

        </div>
      </div>
    </div>
  );
}