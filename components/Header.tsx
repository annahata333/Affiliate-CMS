"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.replace("/login");
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <header className="border-b border-purple-dark bg-purple text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Affiliate CMS
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/categories"
            className="rounded-md px-4 py-2 text-sm font-medium transition hover:bg-purple-dark"
          >
            Categories
          </Link>

          <Link
            href="/products/new"
            className="rounded-md bg-yellow px-4 py-2 text-sm font-semibold text-purple-dark transition hover:bg-yellow-dark"
          >
            Create Product
          </Link>

          <button type="button" onClick={handleLogout}>
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
}
