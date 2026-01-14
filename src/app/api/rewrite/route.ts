import { getRewritePrompt } from "./constants";

const MODELS = [
  "google/gemma-3-27b-it:free",
  "openai/gpt-oss-120b:free",
  "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
];

export async function POST(req: Request) {
  const { genre, text } = await req.json();
  console.log("입력 데이터: ", { genre, text });

  let lastError = null;

  for (const model of MODELS) {
    try {
      console.log(`모델 시도 중: ${model}`);
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: model,
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

      if (response.ok && data.choices?.[0]?.message?.content) {
        console.log(`모델 ${model} 성공!`);
        console.log("AI 응답 데이터:", JSON.stringify(data, null, 2));
        return Response.json({
          result: data.choices[0].message.content,
        });
      } else {
        console.warn(`모델 ${model} 실패:`, data.error || "알 수 없는 오류");
        lastError = data.error || "응답 데이터가 올바르지 않습니다.";
      }
    } catch (error) {
      console.error(`모델 ${model} 호출 중 예외 발생:`, error);
      lastError = error;
    }
  }

  return Response.json(
    {
      result: "모든 모델 변환에 실패했습니다.",
      error: lastError,
    },
    { status: 500 }
  );
}
