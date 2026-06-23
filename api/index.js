
export default async function handler(req, res) {
  const targetUrl = "https://elitebeam.elitetv.workers.dev/playlist.m3u?uid=8385717493&pass=rq8ht4jziw";

  try {
    // हम सर्वर को असली ब्राउज़र जैसा दिखा रहे हैं ताकि टेलीग्राम पर रीडायरेक्ट न हो
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Origin': 'https://elitebeam.elitetv.workers.dev',
        'Referer': 'https://elitebeam.elitetv.workers.dev/'
      }
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.text();

    // अगर उनके सर्ver ने चालाकी से फिर भी टेलीग्राम का लिंक भेजा, तो ये कोड उसे पकड़ लेगा
    if (data.includes("t.me") || data.includes("telegram")) {
      return res.status(500).send("#EXTM3U\n#EXTINF:-1, [Elite Blocked Server IP - Try TinyURL Direct]");
    }

    // अगर सही डेटा मिला, तो उसे M3U प्लेलिस्ट की तरह प्लेयर को भेज दो
    res.setHeader('Content-Type', 'application/x-mpegurl');
    res.setHeader('Content-Disposition', 'attachment; filename=playlist.m3u');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    return res.status(200).send(data);

  } catch (error) {
    return res.status(500).send(`#EXTM3U\n#EXTINF:-1, Error: ${error.message}`);
  }
                                               }
