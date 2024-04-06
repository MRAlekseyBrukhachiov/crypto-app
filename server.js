const express = require('express')
const app = express()
const port = 7070
const base = '/crypto-app'

app.use(base, express.static('frontend/dist'))

app.listen(port, () => {
    console.log(`Server has been started on port ${port}...`)
    console.log(`Your server available at http://localhost:${port}${base}`)
})
