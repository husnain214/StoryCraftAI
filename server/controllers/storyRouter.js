require('dotenv').config()

const storyRouter = require('express').Router()
const logger = require('../utils/logger')
const axios = require('axios')

const { ChatOpenAI } = require('langchain/chat_models/openai')
const { HumanMessage } = require('langchain/schema')
const voice = require('elevenlabs-node')

const chat = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
})

storyRouter.post('/api/stories/create', async (request, response) => {
  const { voiceID, language, prompt } = request.body

  const result = await chat.call([
    new HumanMessage(`Write a short children story in ${language} language with this prompt: ${prompt}`),
  ])

  console.log(result.content)

  try {
    const voiceRes = await voice.textToSpeechStream(
      process.env.ELEVEN_LABS_API_KEY,
      voiceID,
      result.content
    )

    response.setHeader('Content-Type', 'audio/mpeg')
    response.setHeader('Content-Disposition', 'attachment; filename=story.mp3')

    voiceRes.pipe(response)

    voiceRes.on('error', (err) => {
      logger.error('Error streaming audio:', err)
      response.status(500).send('Error streaming audio.')
    })

    voiceRes.on('end', () => {
      logger.info('Audio streaming complete.')
    })
  } catch (error) {
    logger.error('Error generating audio:', error)
    response.status(500).send('Error generating audio.')
  }
})

storyRouter.get('/api/voices', async (request, response) => {
  const voiceResponse = await axios.get('https://api.elevenlabs.io/v1/voices')
  logger.info(voiceResponse.data)
  return response.json(voiceResponse.data)
})

module.exports = storyRouter
