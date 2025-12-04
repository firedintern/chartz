// Vercel serverless function to serve React Router app
export default async function handler(req, res) {
  try {
    // Import the built server
    const serverModule = await import('../build/server/index.js');
    const server = serverModule.default;

    // Convert Vercel request to Web Request
    const url = new URL(req.url || '/', `https://${req.headers.host || 'localhost'}`);

    const webRequest = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : null,
    });

    // Handle the request with the Hono server
    const response = await server.fetch(webRequest);

    // Convert Web Response to Vercel response
    res.status(response.status);

    // Set headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Send body
    const body = await response.text();
    res.send(body);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
