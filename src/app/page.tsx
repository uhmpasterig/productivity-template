import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1 className="text-4xl font-bold">Welcome to Our App</h1>
      <p className="text-lg text-center sm:text-left">
        This is a demo content section to showcase the features of our application.
      </p>
      <Button className="mt-4">
        Get Started
      </Button>
      <section className="flex flex-col gap-8">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold">Feature 1</h2>
          <p className="text-sm">
            Explore the amazing capabilities of our app with Feature 1. It allows you to do amazing things effortlessly.
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold">Feature 2</h2>
          <p className="text-sm">
            Discover the power of Feature 2, designed to enhance your productivity and streamline your workflow.
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold">Feature 3</h2>
          <p className="text-sm">
            Feature 3 brings you the latest in technology, ensuring you stay ahead of the curve.
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold">Feature 4</h2>
          <p className="text-sm">
            Feature 4 brings you the latest in technology, ensuring you stay ahead of the curve.
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-md">  
          <h2 className="text-2xl font-semibold">Feature 5</h2>
          <p className="text-sm">
            Feature 5 brings you the latest in technology, ensuring you stay ahead of the curve.
          </p>
          <div className="flex justify-end">
            <Button variant="outline">
              <Link href="/features">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
