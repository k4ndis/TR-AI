export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const audioContent = req.body.audio;

  const googleApiKey = process.env.GOOGLE_API_KEY;

  const response = await fetch(`https://speech.googleapis.com/v1/speech:recognize?key=${googleApiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      config: {
        encoding: "LINEAR16",
        sampleRateHertz: 16000,
        languageCode: "de-DE"  // oder "en-US" für Englisch – später dynamisch möglich
      },
      audio: {
        content: audioContent
      }
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
