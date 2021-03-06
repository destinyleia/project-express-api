import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import goldenGlobesData from './data/golden-globes.json'


// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
const port = process.env.PORT || 8080
const app = express()


// Add middlewares to ensable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (request, response) => {
  response.send('Welcome to Destinys Golden Globe-API! Here is the endpoint for all the nominations https://goldenglobeawards.herokuapp.com/nominations, here is for getting a specific year and which won that year https://goldenglobeawards.herokuapp.com/nominations/years/2010?won=false etc')
})

// Get all the nominations and categories
app.get('/nominations', (request, response) => {
  response.json(goldenGlobesData)
})

app.get('/year/:year', (request, response) => {
  const year = request.params.year
  const showWon = request.query.won
  let yearFromYear = goldenGlobesData.filter((item) => item.year_award === +year)

  if (showWon) {
    yearFromYear = yearFromYear.filter((item) => item.win)
  }
  response.json(yearFromYear)
})

// Tried to get a uniqe category back by using this code but instead a got back an empty array... 
app.get('/nominations/:nominee', (request, response) => {
  const category = request.params.category
  const nominationsFilm = goldenGlobesData.filter.length((item) => item.category === category)

  if (nominationsFilm) {
    response.status(404).json("ERROR - This category doesn't exist in the golden-globes API")
  }
    response.json(nominationsFilm)
  })

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
