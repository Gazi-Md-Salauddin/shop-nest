"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteConfirmationModal from "@/components/dashboard/DeleteConfirmationModal";
import { Trash2 } from 'lucide-react';
import { SquarePen } from 'lucide-react';


interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

export default function ManageProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
  if (!deleteId) return;

  setIsDeleting(true);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${deleteId}`,
      {
        method: "DELETE",
      }
    );

    const result = await res.json();

    if (result.success) {
      setProducts((prev) =>
        prev.filter((item) => item._id !== deleteId)
      );
      
    }
  } finally {
    setDeleteId(null);
    setIsDeleting(false);
  }
};

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-4">

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Manage Products
        </h1>

        <span className="rounded bg-blue-600 px-4 py-2 text-white text-center">
          {products.length} Products
        </span>
      </div>

      {/* Desktop Table */}

      <div className="hidden overflow-x-auto rounded-xl border lg:block">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Brand</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (
              <tr
                key={product._id}
                className="border-t"
              >
                <td className="p-4">

                  <Image
                    src={
                      product.image ||
                      "https://placehold.co/100x100"
                    }
                    alt={product.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />

                </td>

                <td className="p-4 font-medium">
                  {product.name}
                </td>

                <td className="p-4">
                  {product.brand}
                </td>

                <td className="p-4">
                  {product.category}
                </td>

                <td className="p-4">
                  ${product.price}
                </td>

                <td className="p-4">
                  {product.stock}
                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <Link
                      href={`/dashboard/admin/manage-products/update-product/${product._id}`}
                    >
                      <button className="flex gap-2 items-center rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                       <SquarePen/>Update
                      </button>
                    </Link>

                    <button
  onClick={() => setDeleteId(product._id)}
  className="rounded bg-red-600 px-4 py-2 text-white flex gap-2 items-center"
>
                    <Trash2/>Delete
</button>

                  </div>

                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile */}

      <div className="space-y-5 lg:hidden">

        {products.map((product) => (

          <div
            key={product._id}
            className="rounded-xl border bg-white p-4 shadow"
          >

            <Image
              src={
                product.image ||
                "https://placehold.co/500x300"
              }
              alt={product.name}
              width={500}
              height={300}
              className="h-48 w-full rounded-lg object-cover"
            />

            <div className="mt-4 space-y-2">

              <h2 className="text-xl font-bold">
                {product.name}
              </h2>

              <p>
                <strong>Brand:</strong>{" "}
                {product.brand}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {product.category}
              </p>

              <p>
                <strong>Price:</strong> $
                {product.price}
              </p>

              <p>
                <strong>Stock:</strong>{" "}
                {product.stock}
              </p>

            </div>

            <div className="mt-5 flex gap-3">

              <Link
                href={`/dashboard/admin/manage-products/update-product/${product._id}`}
                className="flex-1"
              >
                <button className="w-full rounded bg-blue-600 py-2 text-white flex gap-2 items-center">
                 <SquarePen/>Update
                </button>
              </Link>

              <button
  onClick={() => setDeleteId(product._id)}
  className="rounded bg-red-600 px-4 py-2 text-white flex gap-2 items-center"
>
              <Trash2/>Delete
</button>

              <DeleteConfirmationModal
  isOpen={!!deleteId}
  isDeleting={isDeleting}
  onClose={() => setDeleteId(null)}
  onConfirm={handleDelete}
/>

              

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}