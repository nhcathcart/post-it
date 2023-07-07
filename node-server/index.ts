import express, { Express, Request, Response} from 'express'

const app = express();
const port = 8000;
app.get('/', (req, res) => {
    res.send('Hello from the server.')
})
app.get('/anotherOne', (req, res) => {
    res.send('Another ONe')
})

app.listen(port, () => {
    console.log('server listening on port 8000')
})