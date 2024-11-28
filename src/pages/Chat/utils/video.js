export const transcribeAudioWithGoogle = async (audioBlob) => {
  const API_KEY = "YOUR_GOOGLE_CLOUD_API_KEY";

  // Convert Blob to Base64
  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]); // Extract Base64
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  try {
    const audioBase64 = await convertBlobToBase64(audioBlob);

    // Send request to Google Cloud Speech-to-Text
    const response = await fetch(
      `https://speech.googleapis.com/v1p1beta1/speech:recognize?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          config: {
            encoding: "LINEAR16",
            sampleRateHertz: 16000,
            languageCode: "en-US",
          },
          audio: { content: audioBase64 },
        }),
      }
    );

    const data = await response.json();
    console.log("Transcription Result:", data);
    return data.results
      .map((result) => result.alternatives[0].transcript)
      .join(" ");
  } catch (error) {
    console.error("Error transcribing with Google:", error);
    throw error;
  }
};
