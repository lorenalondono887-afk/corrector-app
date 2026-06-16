export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { system, messages } = req.body;

    const userMessage = messages[0];
    let parts = [];

    if (typeof userMessage.content === 'string') {
      parts = [{ text: userMessage.content }];
    } else {
      parts = userMessage.content.map(c => {
        if (c.type === 'text') return { text: c.text };
        if (c.type === 'image') return {
          inlineData: { mimeType: c.source.media_type, data: c.source.data }
        };
        return {};
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: system }] },
          contents: [{ role: 'user', parts }]
        })
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    return res.status(200).json({ text });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

