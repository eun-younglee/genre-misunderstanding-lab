// app/api/history/route.ts
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

const getSearchParams = (req: Request) => new URL(req.url).searchParams;

const getSessionId = (req: Request) => getSearchParams(req).get("session_id");

const jsonError = (message: string, status = 500) =>
  NextResponse.json({ error: message }, { status });

export async function POST(req: Request) {
  const sessionId = getSessionId(req);
  if (!sessionId) return jsonError("No session ID", 400);

  const { original, genre, model, result } = await req.json();

  const { error } = await supabase
    .from("history")
    .insert([{ session_id: sessionId, original, genre, model, result }]);

  if (error) return jsonError(error.message, 500);

  return NextResponse.json({ success: true });
}

export async function GET(req: Request) {
  const sessionId = getSessionId(req);
  if (!sessionId) return jsonError("No session ID", 400);

  const { data, error } = await supabase
    .from("history")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) return jsonError(error.message, 500);

  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const sessionId = getSessionId(req);

  if (!sessionId) return jsonError("No session ID", 400);

  const historyId = getSearchParams(req).get("history_id");

  if (!historyId) return jsonError("Missing session_id or history_id", 400);

  const { error } = await supabase
    .from("history")
    .delete()
    .eq("session_id", sessionId)
    .eq("id", historyId);

  if (error) return jsonError(error.message, 500);

  return NextResponse.json({ success: true });
}
