import { useState } from "react";
import { IconBrain, IconUser, IconLock, IconPlus } from "@tabler/icons-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config/config";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username.trim() || !password.trim()) return;
    setLoading(true);
    setError("");
    try {
      await axios.post(`${BACKEND_URL}/api/v1/signup`, { username, password });
      navigate("/signin");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div
        className="w-full max-w-[22rem] rounded-xl bg-white flex flex-col p-6"
        style={{
          boxShadow:
            "0 1px 1px rgba(0,0,0,0.05), 0 4px 6px rgba(34,42,53,0.04), 0 24px 68px rgba(47,48,55,0.05), 0 2px 3px rgba(0,0,0,0.04)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-[8px] bg-[#3b5bdb]">
            <IconBrain className="h-[17px] w-[17px] text-white" />
          </div>
          <span className="text-[15px] font-bold tracking-[-0.4px] text-neutral-800">
            Second <span className="text-[#3b5bdb]">Brain</span>
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[14px] font-bold text-neutral-800 mt-4">
          Create an account
        </h2>
        <p className="mt-1 text-[12px] text-neutral-500">
          Start building your second brain today.
        </p>

        {/* Divider */}
        <div className="my-4 h-px w-full bg-neutral-100" />

        {/* Form fields */}
        <div className="rounded-lg border border-dashed border-neutral-200 bg-gray-50 divide-y divide-neutral-200 overflow-hidden">
          {/* Username */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-white"
              style={{
                boxShadow:
                  "0 1px 1px rgba(0,0,0,0.05), 0 4px 6px rgba(34,42,53,0.04), 0 2px 3px rgba(0,0,0,0.04)",
              }}
            >
              <IconUser className="h-4 w-4 text-neutral-500" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-neutral-500 mb-0.5">
                Username
              </p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. johndoe"
                className="w-full bg-transparent text-[12px] text-neutral-700 placeholder:text-neutral-300 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-white"
              style={{
                boxShadow:
                  "0 1px 1px rgba(0,0,0,0.05), 0 4px 6px rgba(34,42,53,0.04), 0 2px 3px rgba(0,0,0,0.04)",
              }}
            >
              <IconLock className="h-4 w-4 text-neutral-500" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-neutral-500 mb-0.5">
                Password
              </p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                onKeyDown={(e) => e.key === "Enter" && handleSignup()}
                className="w-full bg-transparent text-[12px] text-neutral-700 placeholder:text-neutral-300 outline-none"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="px-4 py-2">
              <p className="text-[11px] text-red-500">{error}</p>
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center justify-center px-4 py-3">
            <button
              onClick={handleSignup}
              disabled={!username.trim() || !password.trim() || loading}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-semibold text-neutral-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 active:scale-[0.97]"
              style={{
                boxShadow:
                  "0 1px 1px rgba(0,0,0,0.05), 0 4px 6px rgba(34,42,53,0.04), 0 2px 3px rgba(0,0,0,0.04)",
              }}
            >
              <IconPlus className="h-4 w-4" />
              {loading ? "Creating account..." : "Create account"}
            </button>
          </div>
        </div>

        {/* Sign in link */}
        <p className="mt-4 text-center text-[11px] text-neutral-400">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-[#3b5bdb] font-semibold hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
