export default async function handler(req, res) {
  // आपका एलीटबीम वाला ओरिजिनल लिंक (TinyURL की जगह सीधा असली लिंक भी डाल सकते हो)
  const targetUrl = "https://tinyurl.com/y5ew5vd9";

  try {
    // सामने वाले सर्वर को लगेगा कि कोई असली TV प्लेयर रिक्वेस्ट कर रहा है
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 TiviMate/4.7.0',
        'Accept': '*/*',
        'Connection': 'keep-alive'
      }
    });

    if (!response.ok) {
      return res.status(response.status).send(`#EXTM3U\n#EXTINF:-1, Server Error: ${response.status}`);
    }

    // पूरी प्लेलिस्ट का डेटा टेक्स्ट फॉर्मेट में निकालना
    const data = await response.text();

    // TiviMate को डेटा भेजने के लिए सबसे जरूरी सेटिंग्स (Headers)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/mpegurl'); 
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

    // सीधा डेटा प्लेयर को दे देना
    return res.status(200).send(data);

  } catch (error) {
    // अगर कोई गड़बड़ हो तो प्लेयर में एरर मैसेज दिखेगा
    return res.status(500).send(`#EXTM3U\n#EXTINF:-1, Error: ${error.message}`);
  }
}

