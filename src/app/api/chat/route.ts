import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Sen arkadaşça sohbet eden bir asistansın." },
        { role: "user", content: message },
      ],
    });

    const reply = response.choices[0]?.message?.content;

    if (!reply) {
      return NextResponse.json({ reply: "Cevap üretilemedi." });
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ reply: "Bir hata oluştu." }, { status: 500 });
  }
}
