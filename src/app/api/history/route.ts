// app/api/history/route.ts
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  const { original, genre, model, result } = await req.json();

  const { error } = await supabase
    .from("history")
    .insert([{ session_id: sessionId, original, genre, model, result }]);

  if (error) {
    console.error("error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json([], { status: 200 });
  }

  const { data, error } = await supabase
    .from("history")
    .select("*")
    // .eq("session_id", sessionId)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json(
      { error: "Failed to load history" },
      { status: 500 },
    );
  }

  console.log(data);

  return NextResponse.json(data);
}
