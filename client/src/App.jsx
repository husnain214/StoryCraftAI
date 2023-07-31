import "./App.css"
import Navbar from "./components/Navbar.jsx"
import MainContent from "./components/MainContent.jsx"
import { useState } from "react"
import axios from "axios"

function App() {
  const [audioData, setAudioData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleDownloadAudio = async event => {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData(event.target)

    const sendData = {
      prompt: formData.get('description'),
      voiceID: formData.get('voice'),
      language: formData.get('language')
    }

    try {
      const response = await axios.post(
        "/api/stories/create",
        sendData,
        {
          responseType: "blob"
        }
      )
      const audioBlob = new Blob([response.data], { type: "audio/mpeg" })
      setAudioData(URL.createObjectURL(audioBlob))
    } catch (error) {
      console.error("Error fetching audio:", error)
    }

    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }

  return (
    <>
      <Navbar />
      <MainContent
        loading={loading}
        audioData={audioData}
        handleDownloadAudio={handleDownloadAudio}
      />
    </>
  )
}

export default App
