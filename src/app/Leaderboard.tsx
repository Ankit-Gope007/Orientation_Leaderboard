"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  branch: string;
  createdAt?: string;
}

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [meanings, setMeanings] = useState<Record<string, string>>({});
  const [loadingMeanings, setLoadingMeanings] = useState(false);
  const [showParagraphs, setShowParagraphs] = useState(false);

  useEffect(() => {
    axios.get("/api/user/leaderboard")
      .then(async (res) => {
        const usersArr = res.data.users || [];
        setUsers(usersArr);
        if (usersArr.length > 0) {
          setLoadingMeanings(true);
          try {
            const names = usersArr.map((u: User) => u.name);
            const meaningRes = await axios.post("/api/meaning", { names });
            const meaningMap: Record<string, string> = {};
            (meaningRes.data || []).forEach((item: { name: string; meaning: string }) => {
              meaningMap[item.name] = item.meaning;
            });
            setMeanings(meaningMap);
          } catch {
            // fallback: do nothing
          }
          setLoadingMeanings(false);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Simple Caesar cipher for demo (shift by 3)
  // function encryptText(text: string) {
  //   return text.replace(/[a-zA-Z]/g, (c) => {
  //     const base = c <= 'Z' ? 65 : 97;
  //     return String.fromCharCode(((c.charCodeAt(0) - base + 3) % 26) + base);
  //   });
  // }

  // Decrypt animation for all names
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="bg-gray-950/80 p-8 rounded-2xl shadow-xl w-full max-w-6xl flex flex-col gap-6 border border-gray-800 backdrop-blur-md animate-fade-in min-h-[350px]">
        <h2 className="text-2xl font-bold text-white mb-2 text-center tracking-tight">Leaderboard</h2>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <span className="loader mb-3"></span>
            <span className="text-gray-400">Loading...</span>
          </div>
        ) : (
          <ol className="space-y-4">
            {users.map((user, idx) => (
              <li key={user.id} className="bg-gray-900 rounded-lg px-4 py-3 flex flex-col">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-lg text-white font-semibold">{idx + 1}. {user.name}</span>
                  <span className="text-base text-blue-300 font-medium bg-blue-950/60 px-2 py-0.5 rounded-full">{user.branch}</span>
                </div>
                {showParagraphs && (
                  <div
                    id={`para-${user.id}`}
                    className="mt-3 text-gray-300 text-sm bg-gray-800 rounded p-3 animate-fade-in"
                  >
                    {loadingMeanings ? (
                      <span className="loader"></span>
                    ) : meanings[user.name] ? (
                      meanings[user.name]
                    ) : (
                      `No meaning found for ${user.name}.`
                    )}
                  </div>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
      <button
        className="mt-8 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow-lg transition"
        onClick={() => setShowParagraphs(true)}
        disabled={showParagraphs}
      >
        Decrypt
      </button>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .loader {
          border: 3px solid #2563eb;
          border-top: 3px solid #fff;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
