"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

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

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`
        );

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBuyNow = async () => {
    if (!session) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    if (!product) return;

    const order = {
      productId: product._id,
      productName: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
      userEmail: session.user.email,
      userName: session.user.name,
      status: "Pending",
      createdAt: new Date(),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );

      const result = await res.json();

      if (result.success) {
        alert("Order placed successfully");
        router.push("/my-orders");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative h-[450px] overflow-hidden rounded-xl border">
          <Image
            src={product.image || "https://placehold.co/600x600"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-5">
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <p>Brand: {product.brand}</p>

          <p>Category: {product.category}</p>

          <h2 className="text-3xl font-bold text-blue-600">
            ${product.price}
          </h2>

          {product.inStock ? (
            <span className="rounded bg-green-100 px-4 py-2 text-green-700">
              In Stock ({product.stock})
            </span>
          ) : (
            <span className="rounded bg-red-100 px-4 py-2 text-red-700">
              Out of Stock
            </span>
          )}

          <div>
            <h3 className="mb-2 text-xl font-semibold">Description</h3>
            <p>{product.description}</p>
          </div>

          <button
            onClick={handleBuyNow}
            className="rounded-lg bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}