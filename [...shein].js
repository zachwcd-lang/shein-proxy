// api/[...shein].js
export default async function handler(req, res) {
  const path = "/" + (req.query.shein || []).join("/");
  const sheinUrl = "https://openapi.sheincorp.cn" + path;

  try {
    const sheinRes = await fetch(sheinUrl, {
      method: req.method,
      headers: req.headers,
      body: req.method === "GET" ? undefined : JSON.stringify(req.body),
    });

    const text = await sheinRes.text();
    res.status(sheinRes.status).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
