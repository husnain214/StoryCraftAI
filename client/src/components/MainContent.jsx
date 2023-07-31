/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from 'axios'
import { InfinitySpin } from 'react-loader-spinner'
import "../App.css";

function MainContent({ handleDownloadAudio, audioData, loading }) {
  const [language, setLanguage] = useState('')
  const [voice, setVoice] = useState('')
  const [prompt, setPrompt] = useState('')
  const [voiceList, setVoiceList] = useState([])

  useEffect(() => {
    const getVoiceList = async () => {
      try {
        const response = await axios.get('/api/voices')
        setVoiceList(response.data.voices) 
      } catch (error) {
        console.error(error)
      }
    }

    getVoiceList()
  }, [])

  return (
    <main>
      <section className="main-content">
        <section>
          <div className="main-text">
            <h1>Ready to listen to some stories?</h1>
            <div>
              Crafting a story is not difficult anymore. Give us new ideas and
              we will generate a creative story for you. Lets craft some new
              ideas into beautiful stories together.
            </div>
          </div>
          <div className="main-form">
            <form onSubmit={handleDownloadAudio}>
              <h2>Lets Craft Stories</h2>
              <div className="voice-type">
                <label htmlFor="voice">Select Voice</label>
                <select value={voice} onChange={({ target }) => setVoice(target.value)} name="voice" id="voice">
                  {
                    voiceList.map(voice => <option key={voice.voice_id} value={voice.voice_id}>{voice.name}</option>)
                  }
                </select>
              </div>
              <div className="language">
                <label htmlFor="language">Select Language</label>
                <select value={language} onChange={({ target }) => setLanguage(target.value)} name="language" id="language">
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="hindi">Hindi</option>
                  <option value="italian">Italian</option>
                  <option value="german">German</option>
                  <option value="polish">Polish</option>
                  <option value="portuguese">Portuguese</option>
                </select>
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={prompt} 
                  onChange={({ target }) => setPrompt(target.value)} 
                  cols="30"
                  rows="10"
                />
              </div>

              <button>Create Now!</button>
              <InfinitySpin 
                width={loading ? '200': '0'}
                color="rgb(121, 16, 73)"
              />
              {audioData && (
                <audio controls>
                  <source src={audioData} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}

export default MainContent;