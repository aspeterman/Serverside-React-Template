import mongoose from 'mongoose'
import config from '../config/config'
import app from './express'

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.connection.on(err => {
    throw new Error(err)
})

app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.log('listening...')
})