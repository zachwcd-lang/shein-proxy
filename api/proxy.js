export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { url, headers, body } = req.body;

    // Rebuild headers object to preserve exact casing
    const fixedHeaders = {};
    for (const key in headers) {
      fixedHeaders[key] = headers[key];
    }

    const response = await fetch(url, {
      method: "POST",
      headers: fixedHeaders,
      body: JSON.stringify(body),
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
