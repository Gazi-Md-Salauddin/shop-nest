import Image from "next/image";
import Hero from '@/components/shared/Hero'
import TopProducts from "@/components/shared/TopProducts";
import Review from "@/components/shared/Review";

export default function Home() {
  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans">
      <main className="w-full max-w-3xl">
        <Hero/>
        <TopProducts/>
        <Review/>
      </main>
    </div>
  );
}
