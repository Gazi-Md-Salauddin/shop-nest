"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

interface Order {
  _id: string;
  productId: string;
  productName: string;
  image: string;
  price: number;
  quantity: number;
  status: string;
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const session = authClient.useSession();
const email = session.data?.user.email;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${email}`,
          {
            cache: "no-store",
          }
        );

        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center">
        Loading...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center">
        <h2 className="text-2xl font-bold">
          No Orders Found
        </h2>
      </div>
    );
  }


  const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-500/20 text-yellow-500";

    case "approved":
      return "bg-green-600/20 text-green-500";

    case "cancelled":
      return "bg-red-600/20 text-red-500";

    default:
      return "bg-blue-500/20 text-blue-500";
  }
};

  return (
    <div className="mx-auto max-w-7xl p-4">

      <h1 className="mb-8 text-3xl font-bold">
        My Orders
      </h1>

      {/* Desktop */}

      <div className="hidden overflow-x-auto rounded-xl border lg:block">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Product</th>
              <th className="p-4">Price</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Status</th>
            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (
              <tr key={order._id} className="border-t">

                <td className="p-4">
                  <Image
                    src={order.image}
                    alt={order.productName}
                    width={70}
                    height={70}
                    className="rounded-lg"
                  />
                </td>

                <td className="p-4">
                  {order.productName}
                </td>

                <td className="p-4">
                  ${order.price}
                </td>

                <td className="p-4">
                  {order.quantity}
                </td>

                <td className="p-4">
                  <span
                    className={`rounded px-3 py-1 ${
                      getStatusColor(order.status)
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile */}

      <div className="space-y-5 lg:hidden">

        {orders.map((order) => (
          <div
            key={order._id}
            className="rounded-xl border p-4 shadow"
          >

            <Image
              src={order.image}
              alt={order.productName}
              width={500}
              height={300}
              className="h-48 w-full rounded-lg object-cover"
            />

            <h2 className="mt-4 text-xl font-bold">
              {order.productName}
            </h2>

            <p className="mt-2">
              <strong>Price:</strong> ${order.price}
            </p>

            <p>
              <strong>Quantity:</strong> {order.quantity}
            </p>

            <p className="mt-2">
              <span
                    className={`rounded px-3 py-1 ${
                      getStatusColor(order.status)
                    }`}
                  >
                    {order.status}
                  </span>
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}