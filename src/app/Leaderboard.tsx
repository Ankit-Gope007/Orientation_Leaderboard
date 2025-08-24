// // "use client";

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // interface User {
// //   id: string;
// //   name: string;
// //   branch: string;
// //   createdAt?: string;
// // }

// // export default function Leaderboard() {
// //   const [users, setUsers] = useState<User[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [meanings, setMeanings] = useState<Record<string, string>>({});
// //   const [loadingMeanings, setLoadingMeanings] = useState(false);
// //   const [showParagraphs, setShowParagraphs] = useState(false);

// //   useEffect(() => {
// //     axios.get("/api/user/leaderboard")
// //       .then(async (res) => {
// //         const usersArr = res.data.users || [];
// //         setUsers(usersArr);
// //         if (usersArr.length > 0) {
// //           setLoadingMeanings(true);
// //           try {
// //             const names = usersArr.map((u: User) => u.name);
// //             const meaningRes = await axios.post("/api/meaning", { names });
// //             const meaningMap: Record<string, string> = {};
// //             (meaningRes.data || []).forEach((item: { name: string; meaning: string }) => {
// //               meaningMap[item.name] = item.meaning;
// //             });
// //             setMeanings(meaningMap);
// //           } catch {
// //             // fallback: do nothing
// //           }
// //           setLoadingMeanings(false);
// //         }
// //       })
// //       .finally(() => setLoading(false));
// //   }, []);

// //   // Simple Caesar cipher for demo (shift by 3)
// //   // function encryptText(text: string) {
// //   //   return text.replace(/[a-zA-Z]/g, (c) => {
// //   //     const base = c <= 'Z' ? 65 : 97;
// //   //     return String.fromCharCode(((c.charCodeAt(0) - base + 3) % 26) + base);
// //   //   });
// //   // }

// //   // Decrypt animation for all names
// //   return (
// //     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-8">
// //       <div className="bg-gray-950/80 p-8 rounded-2xl shadow-xl w-full max-w-6xl flex flex-col gap-6 border border-gray-800 backdrop-blur-md animate-fade-in min-h-[350px]">
// //         <h2 className="text-2xl font-bold text-white mb-2 text-center tracking-tight">Leaderboard</h2>
// //         {loading ? (
// //           <div className="flex flex-col items-center justify-center py-12">
// //             <span className="loader mb-3"></span>
// //             <span className="text-gray-400">Loading...</span>
// //           </div>
// //         ) : (
// //           <ol className="space-y-4">
// //             {users.map((user, idx) => (
// //               <li key={user.id} className="bg-gray-900 rounded-lg px-4 py-3 flex flex-col">
// //                 <div className="flex items-center gap-3 flex-wrap">
// //                   <span className="text-lg text-white font-semibold">{idx + 1}. {user.name}</span>
// //                   <span className="text-base text-blue-300 font-medium bg-blue-950/60 px-2 py-0.5 rounded-full">{user.branch}</span>
// //                 </div>
// //                 {showParagraphs && (
// //                   <div
// //                     id={`para-${user.id}`}
// //                     className="mt-3 text-gray-300 text-sm bg-gray-800 rounded p-3 animate-fade-in"
// //                   >
// //                     {loadingMeanings ? (
// //                       <span className="loader"></span>
// //                     ) : meanings[user.name] ? (
// //                       meanings[user.name]
// //                     ) : (
// //                       `No meaning found for ${user.name}.`
// //                     )}
// //                   </div>
// //                 )}
// //               </li>
// //             ))}
// //           </ol>
// //         )}
// //       </div>
// //       <button
// //         className="mt-8 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow-lg transition"
// //         onClick={() => setShowParagraphs(true)}
// //         disabled={showParagraphs}
// //       >
// //         Decrypt
// //       </button>
// //       <style jsx>{`
// //         .animate-fade-in {
// //           animation: fadeIn 0.8s cubic-bezier(0.4,0,0.2,1);
// //         }
// //         @keyframes fadeIn {
// //           from { opacity: 0; transform: translateY(20px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }
// //         .loader {
// //           border: 3px solid #2563eb;
// //           border-top: 3px solid #fff;
// //           border-radius: 50%;
// //           width: 28px;
// //           height: 28px;
// //           animation: spin 0.7s linear infinite;
// //         }
// //         @keyframes spin {
// //           0% { transform: rotate(0deg); }
// //           100% { transform: rotate(360deg); }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }


// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import DecryptedText from "@/app/components/text/DecryptedText"

// interface User {
//   id: string;
//   name: string;
//   branch: string;
//   createdAt?: string;
// }

// export default function Leaderboard() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [meanings, setMeanings] = useState<Record<string, string>>({});
//   const [loadingMeanings, setLoadingMeanings] = useState(false);
//   const [isDecrypted, setIsDecrypted] = useState(false);
//   const [error, setError] = useState<string>("");

//   // Simple Caesar cipher for encrypting text (shift by 3)
//   function encryptText(text: string) {
//     return text.replace(/[a-zA-Z]/g, (c) => {
//       const base = c <= 'Z' ? 65 : 97;
//       return String.fromCharCode(((c.charCodeAt(0) - base + 3) % 26) + base);
//     });
//   }

//   useEffect(() => {
//     console.log("Fetching leaderboard data..."); // Debug log
//     axios.get("/api/user/leaderboard")
//       .then(async (res) => {
//         console.log("API Response:", res.data); // Debug log
//         const usersArr = res.data.users || [];
//         console.log("Users array:", usersArr); // Debug log
//         setUsers(usersArr);

//         if (usersArr.length > 0) {
//           setLoadingMeanings(true);
//           try {
//             const names = usersArr.map((u: User) => u.name);
//             console.log("Fetching meanings for:", names); // Debug log
//             const meaningRes = await axios.post("/api/meaning", { names });
//             console.log("Meanings response:", meaningRes.data); // Debug log
//             const meaningMap: Record<string, string> = {};
//             (meaningRes.data || []).forEach((item: { name: string; meaning: string }) => {
//               meaningMap[item.name] = item.meaning;
//             });
//             setMeanings(meaningMap);
//             console.log("Final meanings map:", meaningMap); // Debug log
//           } catch (error) {
//             console.error("Error fetching meanings:", error); // Debug log
//             setError("Failed to fetch meanings");
//           }
//           setLoadingMeanings(false);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching leaderboard:", error); // Debug log
//         setError("Failed to fetch leaderboard data. Check your API endpoint.");
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const handleDecrypt = () => {
//     setIsDecrypted(true);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-8">
//       <div className="bg-gray-950/80 p-8 rounded-2xl shadow-xl w-full max-w-6xl flex flex-col gap-6 border border-gray-800 backdrop-blur-md animate-fade-in min-h-[350px]">
//         <h2 className="text-2xl font-bold text-white mb-2 text-center tracking-tight">Leaderboard</h2>
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-12">
//             <span className="loader mb-3"></span>
//             <span className="text-gray-400">Loading...</span>
//           </div>
//         ) : error ? (
//           <div className="flex flex-col items-center justify-center py-12">
//             <span className="text-red-400 mb-4">{error}</span>
//             <span className="text-gray-400">Check browser console for details</span>
//           </div>
//         ) : users.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-12">
//             <span className="text-gray-400">No users found in database</span>
//             <span className="text-gray-500 text-sm mt-2">Make sure your Prisma database has user records</span>
//           </div>
//         ) : (
//           <>
//             <ol className="space-y-4">
//               {users.map((user, idx) => (
//                 <li key={user.id} className="bg-gray-900 rounded-lg px-4 py-3 flex flex-col">
//                   <div className="flex items-center gap-3 flex-wrap">
//                     <span className="text-lg text-white font-semibold">
//                       {idx + 1}. 
//                       {isDecrypted ? (
//                         <DecryptedText 
//                           text={user.name}
//                           speed={40}
//                           sequential={true}
//                           revealDirection="start"
//                           className="text-white font-semibold ml-1"
//                           encryptedClassName="text-green-400"
//                           animateOn="view"
//                         />
//                       ) : (
//                         <span className="text-green-400 ml-1">{encryptText(user.name)}</span>
//                       )}
//                     </span>
//                     <span className="text-base text-blue-300 font-medium bg-blue-950/60 px-2 py-0.5 rounded-full">
//                       {isDecrypted ? (
//                         <DecryptedText 
//                           text={user.branch}
//                           speed={50}
//                           sequential={true}
//                           revealDirection="start"
//                           className="text-blue-300"
//                           encryptedClassName="text-blue-500"
//                           animateOn="view"
//                         />
//                       ) : (
//                         <span className="text-blue-500">{encryptText(user.branch)}</span>
//                       )}
//                     </span>
//                   </div>
//                   <div
//                     id={`para-${user.id}`}
//                     className="mt-3 text-gray-300 text-sm bg-gray-800 rounded p-3 animate-fade-in"
//                   >
//                     {loadingMeanings ? (
//                       <span className="loader"></span>
//                     ) : meanings[user.name] ? (
//                       isDecrypted ? (
//                         <DecryptedText 
//                           text={meanings[user.name]}
//                           speed={25}
//                           sequential={true}
//                           revealDirection="start"
//                           className="text-gray-300"
//                           encryptedClassName="text-gray-500"
//                           maxIterations={8}
//                           animateOn="view"
//                         />
//                       ) : (
//                         <span className="text-gray-500">{encryptText(meanings[user.name])}</span>
//                       )
//                     ) : (
//                       isDecrypted ? (
//                         <DecryptedText 
//                           text={`No meaning found for ${user.name}.`}
//                           speed={30}
//                           sequential={true}
//                           className="text-gray-400"
//                           encryptedClassName="text-gray-600"
//                           animateOn="view"
//                         />
//                       ) : (
//                         <span className="text-gray-600">{encryptText(`No meaning found for ${user.name}.`)}</span>
//                       )
//                     )}
//                   </div>
//                 </li>
//               ))}
//             </ol>

//             {!isDecrypted && (
//               <div className="flex justify-center mt-6">
//                 <button
//                   onClick={handleDecrypt}
//                   className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
//                 >
//                   DECRYPT
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//       <style jsx>{`
//         .animate-fade-in {
//           animation: fadeIn 0.8s cubic-bezier(0.4,0,0.2,1);
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .loader {
//           border: 3px solid #2563eb;
//           border-top: 3px solid #fff;
//           border-radius: 50%;
//           width: 28px;
//           height: 28px;
//           animation: spin 0.7s linear infinite;
//         }
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import DecryptedText from "@/app/components/text/DecryptedText";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [error, setError] = useState<string>("");

  // Simple Caesar cipher for encrypting text (shift by 3)
  function encryptText(text: string) {
    return text.replace(/[a-zA-Z]/g, (c) => {
      const base = c <= 'Z' ? 65 : 97;
      return String.fromCharCode(((c.charCodeAt(0) - base + 3) % 26) + base);
    });
  }

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
          } catch (error) {
            setError("Failed to fetch meanings");
          }
          setLoadingMeanings(false);
        }
      })
      .catch(() => {
        setError("Failed to fetch leaderboard data. Check your API endpoint.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDecrypt = () => {
    setIsDecrypted(true);
  };

  return (
    <div className="hacker-bg min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Optional: Matrix Rain Canvas (GSAP) */}
      {/* <MatrixRain /> */}
      <div className="absolute inset-0 pointer-events-none z-0 matrix-overlay"></div>
      <motion.div
        className="bg-black/90 p-8 rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col gap-6 border border-green-700/60 backdrop-blur-md animate-fade-in min-h-[350px] relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <h2 className="text-3xl font-bold text-green-400 mb-2 text-center tracking-widest font-mono neon-glow">
          LEADERBOARD
        </h2>
        {loading ? (
          // <div className="flex flex-col items-center justify-center py-12">
          //   <span className="loader mb-3"></span>
          //   <span className="text-green-400 font-mono">Loading...</span>
          // </div>
          <div className="flex flex-col items-center justify-center py-12">
            <span className="terminal-loader font-mono text-green-400 text-xl mb-3">
              <span className="prompt">&gt; Loading</span>
              <span className="dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
              <span className="cursor" />
            </span>
            <span className="text-green-400 font-mono">Please wait while we hack the mainframe...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <span className="text-red-400 mb-4">{error}</span>
            <span className="text-green-700 font-mono">Check browser console for details</span>
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <span className="text-green-700 font-mono">No users found in database</span>
            <span className="text-green-800 text-sm mt-2 font-mono">Make sure your Prisma database has user records</span>
          </div>
        ) : (
          <>
            <ol className="space-y-4">
              <AnimatePresence>
                {users.map((user, idx) => (
                  <motion.li
                    key={user.id}
                    className="bg-black/80 border border-green-800 rounded-lg px-4 py-3 flex flex-col shadow-lg neon-border"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-lg text-green-400 font-semibold font-mono tracking-wide">
                        {idx + 1}.
                        {isDecrypted ? (
                          <DecryptedText
                            text={user.name}
                            speed={40}
                            sequential={true}
                            revealDirection="start"
                            className="text-green-300 font-semibold ml-1"
                            encryptedClassName="text-green-600"
                            animateOn="view"
                          />
                        ) : (
                          <span className="text-green-600 ml-1">{encryptText(user.name)}</span>
                        )}
                      </span>
                      <span className="text-base text-cyan-300 font-medium bg-cyan-900/40 px-2 py-0.5 rounded-full font-mono border border-cyan-700/40">
                        {isDecrypted ? (
                          <DecryptedText
                            text={user.branch}
                            speed={50}
                            sequential={true}
                            revealDirection="start"
                            className="text-cyan-300"
                            encryptedClassName="text-cyan-500"
                            animateOn="view"
                          />
                        ) : (
                          <span className="text-cyan-500">{encryptText(user.branch)}</span>
                        )}
                      </span>
                    </div>
                    <div
                      id={`para-${user.id}`}
                      className="mt-3 text-green-200 text-sm bg-black/70 rounded p-3 animate-fade-in font-mono border border-green-900/40 shadow-inner"
                    >
                      {loadingMeanings ? (
                        <span className="loader"></span>
                      ) : meanings[user.name] ? (
                        isDecrypted ? (
                          <DecryptedText
                            text={meanings[user.name]}
                            speed={25}
                            sequential={true}
                            revealDirection="start"
                            className="text-green-200"
                            encryptedClassName="text-green-700"
                            maxIterations={8}
                            animateOn="view"
                          />
                        ) : (
                          <span className="text-green-700">{encryptText(meanings[user.name])}</span>
                        )
                      ) : (
                        isDecrypted ? (
                          <DecryptedText
                            text={`No meaning found for ${user.name}.`}
                            speed={30}
                            sequential={true}
                            className="text-green-400"
                            encryptedClassName="text-green-600"
                            animateOn="view"
                          />
                        ) : (
                          <span className="text-green-600">{encryptText(`No meaning found for ${user.name}.`)}</span>
                        )
                      )}
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ol>
            {/* {!isDecrypted && (
              <motion.div
                className="flex justify-center mt-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.button
                  onClick={handleDecrypt}
                  className="bg-green-700 hover:bg-green-900 text-black font-bold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 neon-glow font-mono text-xl tracking-widest border-2 border-green-400"
                  whileHover={{ scale: 1.08, boxShadow: "0 0 16px #00ff41" }}
                  whileTap={{ scale: 0.96 }}
                >
                  DECRYPT
                </motion.button>
              </motion.div>
            )} */}
            {!isDecrypted && (
              <motion.div
                className="flex justify-center mt-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.button
                  onClick={handleDecrypt}
                  className="decrypt-btn font-mono text-xl tracking-widest"
                  whileHover={{ scale: 1.08, boxShadow: "0 0 24px #00ff41" }}
                  whileTap={{ scale: 0.96 }}
                >
                  <span className="relative z-10">DECRYPT</span>
                  <span className="decrypt-btn-glow"></span>
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
      {/* <style jsx global>{`
        body {
          font-family: 'Fira Mono', 'JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', monospace;
        }
        .hacker-bg {
          background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
          min-height: 100vh;
        }
        .matrix-overlay {
          background: repeating-linear-gradient(
            120deg,
            rgba(0,255,70,0.06) 0px,
            rgba(0,255,70,0.09) 2px,
            transparent 2px,
            transparent 8px
          );
          opacity: 0.7;
          z-index: 1;
        }
        .neon-glow {
          text-shadow:
            0 0 8px #00ff41,
            0 0 16px #00ff41,
            0 0 24px #00ff41;
        }
        .neon-border {
          box-shadow: 0 0 8px #00ff41, 0 0 16px #00ff41 inset;
        }
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .loader {
          border: 3px solid #00ff41;
          border-top: 3px solid #222;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style> */}

      {/* <style jsx global>{`
        body {
          font-family: 'Fira Mono', 'JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', monospace;
        }
        .hacker-bg {
          background: #0a0f0a;
          background-image:
            radial-gradient(ellipse at center, rgba(0,255,70,0.07) 0%, rgba(0,0,0,0.95) 100%);
          min-height: 100vh;
        }
        .matrix-overlay {
          background: repeating-linear-gradient(
            120deg,
            rgba(0,255,70,0.03) 0px,
            rgba(0,255,70,0.05) 2px,
            transparent 2px,
            transparent 8px
          );
          opacity: 0.4;
          z-index: 1;
        }
        .neon-glow {
          text-shadow:
            0 0 2px #00ff41,
            0 0 4px #00ff41;
        }
        .neon-border {
          box-shadow: 0 0 2px #00ff41, 0 0 4px #00ff41 inset;
        }
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .loader {
          border: 3px solid #00ff41;
          border-top: 3px solid #222;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style> */}

      <style jsx global>{`
  // ...existing styles...
  .decrypt-btn {
    position: relative;
    background: rgba(10, 30, 10, 0.95);
    color: #00ff41;
    border: 2px solid #00ff41;
    border-radius: 0.75rem;
    padding: 0.85rem 3rem;
    font-weight: bold;
    letter-spacing: 0.15em;
    overflow: hidden;
    box-shadow: 0 0 8px #00ff4144, 0 0 0px #00ff41;
    transition: 
      background 0.2s,
      color 0.2s,
      box-shadow 0.2s,
      border-color 0.2s;
    backdrop-filter: blur(2px);
    outline: none;
    cursor: pointer;
    z-index: 1;
  }
  .decrypt-btn:focus, .decrypt-btn:hover {
    background: rgba(0, 30, 0, 0.98);
    color: #b6ffb6;
    border-color: #00ff41;
    box-shadow: 0 0 24px #00ff41cc, 0 0 8px #00ff41;
  }
  .decrypt-btn-glow {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 0.75rem;
    background: radial-gradient(circle at 50% 50%, #00ff4133 0%, transparent 80%);
    opacity: 0.7;
    z-index: 0;
    pointer-events: none;
    animation: decryptPulse 2s infinite alternate;
  }
    .terminal-loader {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  letter-spacing: 0.05em;
}
.terminal-loader .prompt {
  color: #00ff41;
}
.terminal-loader .dots span {
  animation: blinkDot 1.2s infinite;
  opacity: 0;
}
.terminal-loader .dots span:nth-child(1) { animation-delay: 0s; }
.terminal-loader .dots span:nth-child(2) { animation-delay: 0.3s; }
.terminal-loader .dots span:nth-child(3) { animation-delay: 0.6s; }
@keyframes blinkDot {
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
}
.terminal-loader .cursor {
  display: inline-block;
  width: 10px;
  height: 1.2em;
  background: #00ff41;
  margin-left: 4px;
  animation: blinkCursor 0.8s steps(1) infinite;
}
@keyframes blinkCursor {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
  @keyframes decryptPulse {
    0% { opacity: 0.5; box-shadow: 0 0 8px #00ff41; }
    100% { opacity: 1; box-shadow: 0 0 24px #00ff41; }
  }
`}</style>

    </div>
  );
}