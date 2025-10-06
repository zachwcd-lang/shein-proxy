// api/shein.js (rename from [...shein].js to just shein.js)

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, headers, body } = req.body;

    if (!url || !headers) {
      return res.status(400).json({ error: 'Missing url or headers' });
    }

    // Forward the request to SHEIN
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...headers,
        'User-Agent': 'Mozilla/5.0'
      },
      body: body
    });

    const text = await response.text();
    
    // Try to parse as JSON
    try {
      const json = JSON.parse(text);
      return res.status(response.status).json(json);
    } catch (e) {
      return res.status(response.status).send(text);
    }

  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      error: 'Proxy error', 
      message: error.message 
    });
  }
}
