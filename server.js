const express= require('express')
const path= require('path')


const app = express()
const http = require('http').createServer(app)


app.use(express.static(path.join(__dirname,'public')))

const io=require('socket.io')(http)
io.on('connection',Socket=> {
    console.log('connected Ready')

    Socket.on('sendMessage',msg=>{
        console.log(msg)
        Socket.broadcast.emit('sendToAll',msg)
    })
    })


const PORT = process.env.PORT || 8000
http.listen(PORT,()=>{
    console.log('server is running on port',PORT)
})