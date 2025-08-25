// import { NextRequest, NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// // export async function POST(req: NextRequest) {
// //   try {
// //     const { names } = await req.json();

// //     if (!Array.isArray(names) || names.length === 0) {
// //       return NextResponse.json({ error: "Array of names is required" }, { status: 400 });
// //     }

// //     // Process each name with Gemini
// //     const results = await Promise.all(
// //       names.map(async (name: string) => {
// //         try {
// //           const prompt = `Explain the meaning of "${name}" in terms of Free and Open Source Software (FOSS). Keep it beginner-friendly and relevant to open source culture in 20 to 25 words if there is no specific meaning then make a meaning yourself anyhow`;
// //           const result = await model.generateContent(prompt);
// //           const response = result.response.text();
// //           return { name, meaning: response };
// //         } catch (err: unknown) {
// //           const errorMessage = err instanceof Error ? err.message : "Failed to fetch meaning";
// //           return { name, error: errorMessage };
// //         }
// //       })
// //     );
// //     return NextResponse.json(results);

// //   } catch (err: unknown) {
// //     console.error("Gemini Error:", err);
// //     const errorMessage = err instanceof Error ? err.message : "Something went wrong";
// //     return NextResponse.json({ error: errorMessage }, { status: 500 });
// //   }
// // }
// export async function POST(req: NextRequest) {
//   try {
//     const { names } = await req.json();

//     if (!Array.isArray(names) || names.length === 0) {
//       return NextResponse.json({ error: "Array of names is required" }, { status: 400 });
//     }

//     // Limit number of names and length of each name
//     const safeNames = names.slice(0, 10).map((n: string) => n.slice(0, 30));

//     const prompt = `For each of these names, give a FOSS-related meaning in 20-25 words:\n${safeNames.join(", ")}`;

//     const result = await model.generateContent(prompt /*, { maxTokens: 300 }*/);
//     const response = result.response.text();

//     // Optionally, split the response into meanings per name
//     // (You may need to parse the response if Gemini returns a list)

//     return NextResponse.json({ meanings: response });

//   } catch (err: unknown) {
//     console.error("Gemini Error:", err);
//     const errorMessage = err instanceof Error ? err.message : "Something went wrong";
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function POST(req: NextRequest) {
  try {
    const { names } = await req.json();

    if (!Array.isArray(names) || names.length === 0) {
      return NextResponse.json({ error: "Array of names is required" }, { status: 400 });
    }

    // Limit number of names and length of each name
    const safeNames = names.slice(0, 10).map((n: string) => n.slice(0, 30));

    const prompt = `For each of these names, how is the word related to open source, tell in a fun and unique way  in 20-25 words. Return each meaning on a new line in the same order as the names and no extra comment except the names:\n${safeNames.join(", ")}`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Split the response by lines and map to names
    const meaningsArr = response
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    // Map each meaning to its corresponding name
    const resultArr = safeNames.map((name, idx) => ({
      name,
      meaning: meaningsArr[idx] || "No meaning found."
    }));

    return NextResponse.json(resultArr);

  } catch (err: unknown) {
    console.error("Gemini Error:", err);
    const errorMessage = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
