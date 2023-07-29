const axios = require('axios')
const fs = require('fs')

// Streaming chunk size
const CHUNK_SIZE = 1024

const XI_API_KEY = "<xi-api-key>"
const VOICE_SAMPLE_PATH1 = "<path-to-file>"
const VOICE_SAMPLE_PATH2 = "<path-to-file>"
const OUTPUT_PATH = "<path-to-file>"

const add_voice_url = "https://api.elevenlabs.io/v1/voices/add"
const tts_url = `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}/stream`
const history_url = "https://api.elevenlabs.io/v1/history"

const headers = {
  "Accept": "application/json",
  "xi-api-key": XI_API_KEY
}

// Add voice
const data = {
  'name': 'Voice name',
  'labels': '{"accent": "American", "gender": "Female"}',
  'description': 'An old American male voice with a slight hoarseness in his throat. Perfect for news.'
}

const formData = new FormData()
formData.append('name', data.name)
formData.append('labels', data.labels)
formData.append('description', data.description)
formData.append('files', fs.createReadStream(VOICE_SAMPLE_PATH1), 'sample1.mp3')
formData.append('files', fs.createReadStream(VOICE_SAMPLE_PATH2), 'sample2.mp3')

axios.post(add_voice_url, formData, { headers })
  .then(response => {
    const voice_id = response.data.voice_id

    // Get default voice settings
    axios.get("https://api.elevenlabs.io/v1/voices/settings/default", { headers })
      .then(response => {
        const { stability, similarity_boost } = response.data

        const tts_data = {
          "text": "Some very long text to be read by the voice",
          "model_id": "eleven_monolingual_v1",
          "voice_settings": {
            "stability": stability,
            "similarity_boost": similarity_boost
          }
        }

        headers["Content-Type"] = "application/json"

        // Generate speech
        axios.post(tts_url, tts_data, { headers, responseType: 'stream' })
          .then(response => {
            const writer = fs.createWriteStream(OUTPUT_PATH)
            response.data.pipe(writer)

            writer.on('finish', () => {
              console.log("Speech generated and saved.")
            })
          })
          .catch(error => {
            console.error("Error generating speech:", error)
          })
      })
      .catch(error => {
        console.error("Error getting default voice settings:", error)
      })
  })
  .catch(error => {
    console.error("Error adding voice:", error)
  })

axios.get(history_url, { headers })
  .then(response => {
    console.log("History response:", response.data)
  })
  .catch(error => {
    console.error("Error retrieving history:", error)
  })
