"use client";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { useEffect } from "react";

import { use } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function WriterDashboard({ params }) {
  const { data: session, status } = useSession();
  const { slug } = use(params);

  if (status === "loading") return <p>Loading…</p>;
  if (!session) return <p>Access denied</p>;
  if (session.user.slug !== slug) return notFound();

  return (
    <div className="p-10 flex flex-col space-x-13">
      <h1 className="text-3xl font-bold">
        Welcome, {session.user.name} — /writers-dashboard/
        {slug}
        <Link href={"/Create-Article"}>
          <button className="ml-2 text-yellow-900">Create Blogs</button>
        </Link>
        <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
      </h1>
    </div>
  );
}
