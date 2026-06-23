
export default async function handler(req, res) {
  // आपका एलीटबीम का वर्किंग लिंक
  const targetUrl = "https://tinyurl.com/y5ew5vd9";

  // प्लेयर को सीधा सही लोकेशन पर भेजना (Redirect करना)
  res.writeHead(302, {
    'Location': targetUrl,
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  });
  
  res.end();
}
