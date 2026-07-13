"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "John Smith",
    role: "Verified Buyer",
    review:
      "Excellent product quality and super fast delivery. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Verified Buyer",
    review:
      "Amazing shopping experience. The product was exactly as described.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Verified Buyer",
    review:
      "Great customer support and premium quality. Will buy again.",
    rating: 4,
  },
];

export default function Reviews() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4">

        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">
            What Our Customers Say
          </h2>

          <p className="mt-3 text-gray-500">
            Trusted by hundreds of happy customers.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: -80 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.6,
      delay: index * 0.2,
    }}
              className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg"
            >
              <div className="mb-4 flex">

                {[...Array(review.rating)].map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}

              </div>

              <p className="text-gray-600 leading-7">
                "{review.review}"
              </p>

              <div className="mt-6">
                <h3 className="font-semibold text-lg">
                  {review.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {review.role}
                </p>
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}