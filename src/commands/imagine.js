import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const prompt = req.query.prompt;

    if (!prompt) {
      res.status(400).json({ error: "缺少 prompt 参数" });
      return;
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.images.generate({
      model: "gpt-image-1",   // ✅ 正确的 DALL·E 模型名
      prompt,
      size: "512x512"
    });

    res.status(200).json({
      prompt,
      image: response.data[0].url
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({
      error: "图像生成失败",
      detail: error.message
    });
  }
}
