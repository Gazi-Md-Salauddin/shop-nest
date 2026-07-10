import Image from "next/image";
import Hero from '@/components/shared/Hero'

export default function Home() {
  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans">
      <main className="w-full max-w-3xl">
        <Hero/>
      </main>
    </div>
  );
}
