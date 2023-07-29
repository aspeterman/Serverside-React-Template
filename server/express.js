import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import path from 'path'
import React from 'react'
import App from '../src/App'

const app = express()
const CURRENT_WORKING_DIRECTORY = process.cwd()

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIRECTORY, '/dist')))

app.get("/", (req, res) => {
    fs.readFile(path.resolve("./public/index.html"), "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("An error occurred");
        }

        return res.send(
            data.replace(
                '<div id="root"></div>',
                `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
            )
        );
    });
});

export default app