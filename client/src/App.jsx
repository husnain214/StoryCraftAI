import "./App.css";
import Navbar from "./components/Navbar.jsx";
import MainContent from "./components/MainContent.jsx";
import { useState } from "react";
import axios from "axios";

function App() {
  const [audioData, setAudioData] = useState(null);

  const handleDownloadAudio = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/download-story",
        {
          responseType: "blob",
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
