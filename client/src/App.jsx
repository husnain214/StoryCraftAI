import "./App.css";
import Navbar from "./components/Navbar.jsx";
import MainContent from "./components/MainContent.jsx";
import { useState } from "react";
import axios from "axios";

function App() {
  const [audioData, setAudioData] = useState(null);

  const handleDownloadAudio = async event => {
    event.preventDefault()
    console.log(event.target)
    const formData = new FormData(event.target)

    for(const [key, value] of formData.entries()) {
      console.log(key, value)
    }

    const sendData = {
      prompt: formData.get('description'),
      voiceID: formData.get('voice'),
      language: formData.get('language')
    }

    try {
      const response = await axios.post(
        "http://localhost:3003/api/stories/create",
        sendData,
        {
          responseType: "blob"
        }
      );
      // Create a blob URL from the response data
      const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
      setAudioData(URL.createObjectURL(audioBlob));
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  };

  return (
    <>
      <Navbar />
      <MainContent
        audioData={audioData}
        handleDownloadAudio={handleDownloadAudio}
      />
    </>
  );
}

export default App;
