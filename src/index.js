import express from 'express'

import routes from './routes/routes.js'
import cors from 'cors'

const app = express(); 

app.use(cors())

app.use(express.static('upload'));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse application/json
app.use(express.json())

app.use('/', routes)

app.listen(3000, () => console.log("server berjalan pada http://localhost:3000"))