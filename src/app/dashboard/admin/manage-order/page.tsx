"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import DeleteConfirmationModal from "@/components/dashboard/DeleteConfirmationModal";
import { Trash2 } from 'lucide-react';

interface Order {
  _id: string;
  productName: string;
  image: string;
  price: number;
  quantity: number;
  userName: string;
  userEmail: string;
  status: string;
}

export default function ManageOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error(error);
      setOrders([]);
    } finaly {
      setLoading(false);
    }
  };

  const handleStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const result = await res.json();

      if (result.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === id ? { ...order, status } : order
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setIsDeleting(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${deleteId}`,
        {
          method: "DELETE",
        }
      );

      const result = await res.json();

      if (result.success) {
        setOrders((prev) =>
          prev.filter((order) => order._id !== deleteId)
        );
        setDeleteId(null);
      }
    } catch (error) {
      console.error(error);
    } finaly {
      setIsDeleting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-500";
      case "approved":
        return "bg-green-500/20 text-green-500";
      case "cancelled":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-blue-500/20 text-blue-500";
    }
  };

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-4">

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">
          Manage Orders
        </h1>

        <span className="rounded bg-blue-600 px-4 py-2 text-white">
          {orders.length} Orders
        </span>
      </div>

      {/* Desktop View */}
      <div className="hidden overflow-x-auto rounded-xl border lg:block">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="text-left">Product</th>
              <th className="text-left">User</th>
              <th className="text-left">Email</th>
              <th className="text-left">Price</th>
              <th className="text-left">Qty</th>
              <th className="text-left">Status</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-4">
                  <Image
                    src={order.image}
                    alt={order.productName}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                </td>

                <td>{order.productName}</td>
                <td>{order.userName}</td>
                <td>{order.userEmail}</td>
                <td>${order.price}</td>
                <td>{order.quantity}</td>

                <td>
                  <span
                    className={`rounded px-3 py-1 ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatus(order._id, "Approved")}
                      className="rounded bg-green-600 px-3 py-2 text-sm text-white"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleStatus(order._id, "Cancelled")}
                      className="rounded bg-yellow-500 px-3 py-2 text-sm text-white"
                    >
                      Cancel
                    </button>

                    
                    <button
                      onClick={() => setDeleteId(order._id)}
                      className="rounded bg-red-600 px-3 py-2 text-sm text-white"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
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
              className="h-52 w-full rounded-lg object-cover"
            />

            <h2 className="mt-4 text-xl font-bold">
              {order.productName}
            </h2>

            <div className="mt-3 space-y-2 text-sm">
              <p><strong>User:</strong> {order.userName}</p>
              <p><strong>Email:</strong> {order.userEmail}</p>
              <p><strong>Price:</strong> ${order.price}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <span className={`inline-block rounded px-3 py-1 ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <button
                onClick={() => handleStatus(order._id, "Approved")}
                className="rounded bg-green-600 py-2 text-sm text-white"
              >
                Approve
              </button>

              <button
                onClick={() => handleStatus(order._id, "Cancelled")}
                className="rounded bg-yellow-500 py-2 text-sm text-white"
              >
                Cancel
              </button>

            
              <button
                onClick={() => setDeleteId(order._id)}
                className="rounded bg-red-600 py-2 text-sm text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      
      <DeleteConfirmationModal
        isOpen={!!deleteId}
        isDeleting={isDeleting}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />

    </div>
  );
}
