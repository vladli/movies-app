import Link from "next/link";

export const dynamic = "force-static";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-6xl font-bold">404</h2>
      <p className="text-2xl font-normal">This page could not be found.</p>
      <Link
        className="text-xl font-normal underline"
        href="/"
      >
        Return Home
      </Link>
    </div>
  );
}
