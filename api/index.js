export default async function handler(req, res) {
  // आपका वर्किंग TinyURL लिंक
  const targetUrl = "https://tinyurl.com/y5ew5vd9";

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 TiviMate/4.7.0',
        'Accept': '*/*'
      }
    });

    if (!response.ok) {
      return res.status(response.status).send(`Provider Error: ${response.status}`);
    }

    const data = await response.text();

    // Player के लिए Headers सेट करना
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/x-mpegurl; charset=utf-8');
    res.setHeader('Content-Disposition', 'inline; filename="playlist.m3u"');
    
    return res.status(200).send(data);

  } catch (error) {
    return res.status(500).send('Error: ' + error.message);
  }
}
