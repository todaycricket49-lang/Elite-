
export default async function handler(req, res) {
  // आपका एलीटबीम का ओरिजिनल लिंक (TinyURL की जगह सीधा असली लिंक)
  const targetUrl = "https://elitebeam.elitetv.workers.dev/playlist.m3u?uid=8385717493&pass=rq8ht4jziw";

  // Vercel सीधे TiviMate को निर्देश देगा कि वो इस हेडर के साथ सीधे एलीटबीम से जुड़े
  res.writeHead(302, {
    'Location': targetUrl,
    'Access-Control-Allow-Origin': '*',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  });
  
  res.end();
}
