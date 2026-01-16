import { getRewritePrompt, MODELS, ERROR_MESSAGE } from "./constants";

export async function POST(req: Request) {
  const { genre, text, model } = await req.json();

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODELS[model],
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

    // API response successful, has data
    if (response.ok && data.choices?.[0]?.message?.content) {
      return Response.json({
        result: data.choices[0].message.content,
      });
    } else {
      // API responded but has error
      console.warn(`model ${model} failed:`, data.error || "unknown error");
    }
  } catch (error) {
    // failure like network disconnected
    console.error("Exception during API calling:", error);
  }
  return Response.json({ result: ERROR_MESSAGE[genre] });
}
