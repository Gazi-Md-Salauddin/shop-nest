"use client";

import { use, useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';

interface Product {
  name: string;
  brand: string;
  category: string;
  price: number | "";
  stock: number | "";
  image: string;
  description: string;
}

export default function UpdateProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<Product>({
    name: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`
        );

        const result = await res.json();

        setFormData(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        (name === "price" || name === "stock")
          ? (value == "" ? "" :
        Number(value))
          : value,
    }));
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            inStock: formData.stock > 0,
          }),
        }
      );

      const result = await res.json();

      if (result.success) {
        toast.success("Product updated successfully.");
        router.push("/dashboard/admin/manage-products");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-5">

      <h1 className="mb-8 text-3xl font-bold">
        Update Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border p-6 shadow"
      >
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full rounded border p-3"
        />

        <input
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="w-full rounded border p-3"
        />

        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full rounded border p-3"
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full rounded border p-3"
        />

        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full rounded border p-3"
        />

        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full rounded border p-3"
        />

        <textarea
          name="description"
          rows={5}
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full rounded border p-3"
        />

        <button
          type="submit"
          className="w-full rounded bg-blue-600 py-3 text-white hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}