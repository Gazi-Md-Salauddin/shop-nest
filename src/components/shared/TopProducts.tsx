"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  inStock: boolean;
}

export default function TopProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
          {
            cache: "no-store",
          }
        );

        const data = await res.json();

        setProducts(data.slice(0, 8));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-10 text-center text-4xl font-bold">
            Top Products
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-[360px] animate-pulse rounded-xl bg-gray-200"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">

        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold">
            Top Products
          </h2>

          <p className="mt-3 text-gray-500">
            Explore our best-selling products.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {products.map((product) => (

            <div
              key={product._id}
              className="overflow-hidden rounded-xl border bg-white shadow transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-60">

                <Image
                  src={
                    product.image ||
                    "https://placehold.co/600x600"
                  }
                  alt={product.name}
                  fill
                  className="object-cover"
                />

              </div>

              <div className="space-y-3 p-5">

                <h3 className="line-clamp-1 text-xl font-bold">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {product.brand}
                </p>

                <div className="flex items-center justify-between">

                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price}
                  </span>

                  {product.inStock ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      In Stock
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                      Out of Stock
                    </span>
                  )}

                </div>

                <Link
                  href={`/all-products/${product._id}`}
                  className="block"
                >
                  <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
                    View Details
                  </button>
                </Link>

              </div>
            </div>

          ))}

        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/all-products">
            <button className="rounded-lg border border-blue-600 px-8 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white">
              View All Products
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}