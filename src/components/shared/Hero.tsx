"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import HeroImage from '@/app/images/heroImage.jpeg'
import CountUp from "react-countup";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Background Blur */}
      <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />

      <div className="container mx-auto px-6 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
              ✨ New Collection 2026
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Discover Your
              <span className="block text-blue-600">
                Perfect Shopping
              </span>
              Experience
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-600">
              Shop Nest brings you premium fashion, electronics, lifestyle,
              and everyday essentials—all in one place with unbeatable prices.
            </p>

            <div className="my-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Button asChild size="lg" variant="default">
                <Link href="/all-products">
                  Shop Now
                  <ShoppingBag className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link href="/">
                  Browse Categories
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative mx-auto aspect-square max-w-lg overflow-hidden rounded-3xl bg-white p-6 shadow-2xl">
              <Image
                src={HeroImage}
                alt="Shop Nest Hero"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -left-6 top-8 hidden rounded-2xl bg-white p-4 shadow-xl md:block">
              <p className="text-sm text-slate-500">Best Seller</p>
              <h4 className="font-semibold">Smart Watch</h4>
              <span className="text-blue-600 font-bold">$99</span>
            </div>

            <div className="absolute -right-6 bottom-8 hidden rounded-2xl bg-white p-4 shadow-xl md:block">
              <p className="text-sm text-slate-500">Flash Sale</p>
              <h4 className="font-semibold">Up to 50% OFF</h4>
              <span className="text-red-500 font-bold">Limited Time</span>
            </div>       
          </div>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t pt-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900"><CountUp end={10} duration={3} separator="," enableScrollSpy
  scrollSpyOnce/>K+</h3>
                <p className="text-sm text-slate-500">Happy Customers</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900"><CountUp end={500} duration={3} separator="," enableScrollSpy
  scrollSpyOnce/>+</h3>
                <p className="text-sm text-slate-500">Products</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900"><CountUp end={24} duration={3} separator="," enableScrollSpy
  scrollSpyOnce/>/7</h3>
                <p className="text-sm text-slate-500">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}