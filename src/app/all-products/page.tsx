"use client";

import { useEffect, useState } from "react";
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

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
        );

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No Products Found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-xl shadow hover:shadow-lg transition bg-white overflow-hidden"
            >
              <div className="relative w-full h-52">
                <Image
                  src={product?.image}
                    
                  
                  alt={product?.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold">
                  {product?.name}
                </h2>

                <p className="text-sm text-gray-500">
                  {product?.brand}
                </p>

                <p className="text-sm">
                  Category: {product.category}
                </p>

                <p className="text-lg font-bold text-blue-600">
                  ${product.price}
                </p>

                <p>
                  Stock:{" "}
                  <span
                    className={
                      product.inStock
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {product.stock}
                  </span>
                </p>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {product.description}
                </p>

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}