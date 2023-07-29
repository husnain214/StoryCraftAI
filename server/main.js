require('dotenv').config()

const express = require('express')
const app = express()
const fs = require('fs-extra')
const path = require('path')

const { ChatOpenAI } = require('langchain/chat_models/openai')
const { HumanMessage } = require('langchain/schema')
const voice = require('elevenlabs-node')

const chat = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY
})

app.get('/api/create-story', async (request, response) => {
  const result = await chat.call([
    new HumanMessage(
      'Write a short bed time story about a little girl and a dog.'
    )
  ])
  // const content = `Once upon a time, in a cozy little town nestled at the foot of a majestic mountain, there was a sweet little girl named Lily. Lily had big blue eyes that sparkled like the stars and hair as golden as the sun. She had a heart full of love and kindness, and she adored animals, especially dogs. In this town, there lived a fluffy and playful dog named Max. Max had fur as soft as a cloud and a wagging tail that never seemed to stop. He loved going on adventures and exploring every nook and cranny of the town. One sunny afternoon, as Lily was playing in a meadow close to her home, she spotted Max chasing butterflies, his tail wagging with pure delight. Lily giggled and called out, "Max, oh Max, would you like to be my friend?" Max's ears perked up, and he bounded towards Lily with joy in his eyes. They quickly became inseparable. They strolled through the town hand in paw, exploring everything that caught their attention. They gazed at colorful flowers, watched hummingbirds flutter by, and even shared ice cream from the local ice cream truck. During the day, they played tag in the park, splashed in puddles after the rain, and shared secrets under the shade of a towering oak tree. Max even taught Lily how to chase her own shadow, making her giggle nonstop. As the sun began to set, painting the sky with hues of orange and pink, Lily and Max sat on a hill and gazed at the world below, feeling a sense of tranquility. Lily turned to Max and said, "Max, you have made my days so much brighter. Will you be my friend forever?" Max wagged his tail, his eyes filled with love and loyalty. In response, he laid his head on Lily's lap as if to say, "Always." With Max nestled beside her, Lily felt a wave of comfort and peace wash over her. She realized that true friendship could be found in the most unexpected places and with the most unlikely companions. As the stars emerged, twinkling like little diamonds in the sky, Lily and Max fell asleep in each other's arms, dreaming of the wonderful adventures that awaited them on the morrow. And so, in this charming little town, the bond between a little girl and her furry friend grew stronger with each passing day, reminding everyone that friendship has the power to make life truly magical.`
  const fileName = path.join(__dirname, 'assets', 'story.mp3')
  
  const voiceRes = await voice.textToSpeechStream(
    process.env.ELEVEN_LABS_API_KEY, 
    '21m00Tcm4TlvDq8ikWAM', 
    result.content
  )

  voiceRes.pipe(fs.createWriteStream(fileName))

  response.send(content)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})