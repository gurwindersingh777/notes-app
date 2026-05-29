"use client"
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string>("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsPending(true)
    setError("")

    try {
      const res = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (res?.data) {
        router.push("/dashboard");
      } else {
        setError(res.error.message as string);
      }

    } catch (err: any) {
      setError(err?.message || "Signup failed");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-2xl space-y-5">

        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-zinc-400 mt-2 text-sm">Sign up to continue</p>
        </div>

        {/* name */}
        <div>
          <label className="block mb-2 text-sm text-zinc-300">Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="Enter name"
            className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-4 py-3 outline-none focus:border-white transition"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-sm text-zinc-300">Email</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
            className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-4 py-3 outline-none focus:border-white transition"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 text-sm text-zinc-300">Password</label>

          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
            className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-4 py-3 outline-none focus:border-white transition"
            required
          />
        </div>

        {/* Button */}
        <button
          disabled={isPending}
          type="submit"
          className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-zinc-200 transition"
        >
          {isPending ? "Signing..." : "Sign Up"}
        </button>

        {error && (<p className="text-red-500 text-sm text-center">{error}</p>)}

        <p className="text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}

