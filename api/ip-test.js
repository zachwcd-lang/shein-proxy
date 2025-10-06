export default async function handler(req, res) {
  // Only allow GET requests (so the "method not allowed" message never appears again)
  if (req.method !== "GET") {
    return res.status(200).json({ ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress });
  }

  // Return proxy IP as plain text for GAS
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  res.status(200).send(ip);
}
