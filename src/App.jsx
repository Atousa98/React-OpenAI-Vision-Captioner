import React, { useState } from 'react';
import { ImageIcon, Loader2 } from 'lucide-react';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const apiKey = ""; 

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAiResult("");
      setStatusMsg("");
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result); 
        setImgData(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const getAiDescription = async () => {
    if (!imgData) {
      setStatusMsg("Error: Please select an image first!");
      return;
    }

    setLoading(true);
    setStatusMsg("Connecting to OpenAI server...");

    const payload = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Describe this image in a few sentences for my project." },
            { type: "image_url", image_url: { url: imgData } }
          ],
        },
      ],
      max_tokens: 300,
    };

    let retryCount = 0;
    const maxRetries = 3;

    const callApi = async () => {
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error?.message || "Server error");
        }

        const json = await res.json();
        const outputText = json.choices[0]?.message?.content;
        
        if (outputText) {
          setAiResult(outputText);
          setStatusMsg("Success!");
        } else {
          throw new Error("Empty response");
        }
      } catch (err) {
        if (retryCount < maxRetries) {
          retryCount++;
          setStatusMsg(`Retrying... (Attempt ${retryCount})`);
          await new Promise(r => setTimeout(r, 2000));
          return callApi();
        }
        setStatusMsg("Error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    await callApi();
  };

  return (
    <div className="min-h-screen bg-gray-200 p-10 font-mono">
      <div className="max-w-2xl mx-auto bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        
        <h1 className="text-2xl font-bold border-b-2 border-black pb-2 mb-6 text-center uppercase">
          Image Captioning App
        </h1>

        <div className="space-y-6">
          {/* Step 1: Upload */}
          <div className="border-2 border-gray-300 p-4 bg-gray-50">
            <label className="block font-bold mb-2">1. Select an Image:</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={onFileChange}
              className="block w-full text-sm border border-gray-400 p-2 cursor-pointer bg-white"
            />
          </div>

          {/* Image Preview Area */}
          {selectedImage && (
            <div className="border-2 border-black p-2 bg-white flex justify-center">
              <img 
                src={selectedImage} 
                alt="My Preview" 
                className="max-h-64 border border-gray-200"
              />
            </div>
          )}

          {/* Step 2: Action Button */}
          <button
            onClick={getAiDescription}
            disabled={loading || !imgData}
            className={`w-full py-3 px-6 font-bold uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all
              ${loading || !imgData ? 'bg-gray-400' : 'bg-yellow-400 hover:bg-yellow-300'}`}
          >
            {loading ? "Running AI..." : "Get Description"}
          </button>

          {/* Status Message */}
          {statusMsg && (
            <div className="text-sm font-bold text-blue-600 bg-blue-50 p-2 border border-blue-200">
              STATUS: {statusMsg}
            </div>
          )}

          {/* Step 3: Output Area */}
          <div className="border-2 border-black p-4 bg-gray-900 text-green-400 min-h-[150px]">
            <h3 className="text-sm font-bold border-b border-green-800 mb-2 pb-1 text-white uppercase">
              System Output:
            </h3>
            {aiResult ? (
              <p className="text-sm leading-relaxed">{aiResult}</p>
            ) : (
              <p className="text-xs italic text-gray-500">Waiting for user input...</p>
            )}
          </div>
        </div>

        <footer className="mt-10 text-center text-[10px] text-gray-400">
          Submitted by: Atousa Garousian #2310629004 | Intelligent Media Class 2026
        </footer>
      </div>
    </div>
  );
};

export default App;