'use client'
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const notes = [
  {
    id: 1,
    title: "Meeting Notes",
    content: "Discuss project roadmap and tasks.",
  },
  {
    id: 2,
    title: "Ideas",
    content: "Build a modern notes app with Next.js.",
  },
  {
    id: 3,
    title: "Todo",
    content: "Learn Prisma and authentication.",
  },
];

export default function DashboardPage() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login")
        },
        onRequest: () => {
          setIsPending(true)
        }
      }
    })
  }
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notes App</h1>

        <button onClick={handleLogout} className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-zinc-200 transition">
          {isPending ? "Logging out..." : "Logout"}
        </button>
      </nav>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">
              Your Notes
            </h2>

            <p className="text-zinc-400 mt-1">
              Manage your notes easily
            </p>
          </div>

          <button className="bg-white text-black px-5 py-3 rounded-lg font-medium hover:bg-zinc-200 transition">
            + New Note
          </button>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-600 transition"
            >
              <h3 className="text-xl font-semibold mb-3">
                {note.title}
              </h3>

              <p className="text-zinc-400 text-sm leading-6">
                {note.content}
              </p>

              <div className="mt-5 flex gap-3">
                <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition">
                  Edit
                </button>

                <button className="border border-zinc-700 px-4 py-2 rounded-lg text-sm hover:bg-zinc-800 transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

