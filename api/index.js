// Vercel Serverless Function Entry Point
export default async function handler(req, res) {
  // Dynamic import to avoid bundling issues
  const { default: app } = await import('../apps/web/build/server/index.js');

  // Create a proper Request object
  const url = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}${req.url}`;

  const request = new Request(url, {
    method: req.method,
    headers: new Headers(req.headers),
    body: ['GET', 'HEAD'].includes(req.method) ? null : req,
  });

  // Get response from the app
  const response = await app.fetch(request);

  // Set status
  res.status(response.status);

  // Set headers
  for (const [key, value] of response.headers.entries()) {
    res.setHeader(key, value);
  }

  // Handle different response types
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    const json = await response.json();
    res.json(json);
  } else if (contentType.includes('text/')) {
    const text = await response.text();
    res.send(text);
  } else {
    const buffer = Buffer.from(await response.arrayBuffer());
    res.send(buffer);
  }
}
