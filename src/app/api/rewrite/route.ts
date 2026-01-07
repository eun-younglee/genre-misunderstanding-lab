import { getRewritePrompt } from "./constants";

export async function POST(req: Request) {
  const { genre, text } = await req.json();
  console.log("입력 데이터: ", { genre, text });

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "nex-agi/deepseek-v3.1-nex-n1:free",
        // prompt 대신 messages를 사용하는 것이 더 정확합니다.
        messages: [
          {
            role: "user",
            content: getRewritePrompt(genre, text),
          },
        ],
      }),
    }
  );

  const data = await response.json();

  // response 대신 data를 찍어야 실제 AI 응답 내용이 보입니다!
  console.log("AI 응답 데이터:", JSON.stringify(data, null, 2));

  return Response.json({
    result: data.choices?.[0]?.message?.content || "변환에 실패했습니다.",
  });
}
