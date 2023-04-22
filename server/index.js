import express from 'express'
import morgan from 'morgan'
import {Server as SocketServer} from 'socket.io'
import http from 'http'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './routes/message.js'
import bodyParser from 'body-parser'

const url = "mongodb+srv://sanhurta2002:3D2GMK8g2ptJwlys@cluster0.pslydzt.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = global.Promise

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: '*'
    }
})
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

io.on('connection', (socket) =>{
   
    socket.on('message', (nickname, admin, message) => {
        console.log(nickname, admin, message )
        socket.broadcast.emit('message', {
            from: nickname,
            admin: admin,
            body: message,
        })
    })
})

app.use("/api", router)

mongoose.connect(url, {useNewUrlParser: true}).then(()=>{
console.log('Conexion realizada');
server.listen(3001, () => {
    console.log("all is working");
})
})




