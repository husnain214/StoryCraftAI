require('dotenv').config()

const storyRouter = require('express').Router()
const logger = require('../utils/logger')
const axios = require('axios')

// const { ChatOpenAI } = require('langchain/chat_models/openai')
// const { HumanMessage, SystemMessage } = require('langchain/schema')
const voice = require('elevenlabs-node')

// const chat = new ChatOpenAI({
//   openAIApiKey: process.env.OPENAI_API_KEY,
// })

storyRouter.get('/api/stories/create', async (request, response) => {
  // const { body } = request
  // const result = await chat.call([
  //   new SystemMessage(
  //     'You create bed time stories using the given prompts.'
  //   )
  // ],[
  //   new HumanMessage(
  //     'Write a short bed time story about a little girl and a dog.',
  //   ),
  // ])
  const content = 'Once upon a time, in a cozy little town nestled at the foot of a majestic.';

  try {
    const voiceRes = await voice.textToSpeechStream(
      process.env.ELEVEN_LABS_API_KEY,
      '21m00Tcm4TlvDq8ikWAM',
      content
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
