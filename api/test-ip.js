export default async function handler(req, res) {
  // Accept both GET and POST
  try {
    const ipCheckResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipCheckResponse.json();
    
    return res.status(200).json({
      outboundIPv4: ipData.ip,
      message: "This is the IPv4 address that SHEIN will see. Whitelist this IP in SHEIN's developer portal.",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Could not determine IP',
      message: error.message
    });
  }
}
