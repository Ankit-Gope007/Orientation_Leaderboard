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

    // Process each name with Gemini
    const results = await Promise.all(
      names.map(async (name: string) => {
        try {
          const prompt = `Explain the meaning of "${name}" in terms of Free and Open Source Software (FOSS). Keep it beginner-friendly and relevant to open source culture in 20 to 25 words if there is no specific meaning then make a meaning yourself anyhow`;
          const result = await model.generateContent(prompt);
          const response = result.response.text();
          return { name, meaning: response };
        } catch (err: any) {
          return { name, error: err.message || "Failed to fetch meaning" };
        }
      })
    );

    return NextResponse.json(results);
  } catch (err: any) {
    console.error("Gemini Error:", err);
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}
