export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // In Vercel Node API routes, req.body is already parsed JSON
    const { url, headers, body } = req.body;

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    });

    const data = await response.text(); // don’t assume JSON
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
