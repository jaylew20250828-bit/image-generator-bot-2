import OpenAI from "openai";

export default async function handler(req, res) {
  const { prompt } = req.query;
  if (!prompt) {
    res.status(400).json({ error: "缺少 prompt 参数" });
    return;
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "512x512"
    });

    const imageUrl = response.data[0].url;

    res.status(200).json({
      prompt,
      image: imageUrl
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "图像生成失败", detail: error.message });
  }
}
