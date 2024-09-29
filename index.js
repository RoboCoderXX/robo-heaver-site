const { Server } =  require('socket.io')
const { createServer } = require('http')
const io = new Server()
var users = []
var sckt;
io.on('connection',(socket)=>{
    sckt = socket
    socket.emit('gname')
    socket.on('name',(arg)=>{
        users.push(arg+'<br>')
        console.log(users)
    })
})
const http = createServer((req,res)=>{
    res.write('<body>'+users)
    var body;
    req.on('data',(data)=>{
        body+=data
    })
    req.on('end',()=>{
        console.log(body)
        if(body){
        args = body.split(' ')
        if(args[0] == 'undefinedshellon'){
            sckt.emit('shellon',args[1])
            console.log(`shellon for ${args[1]}`)
        }
    }
    })
    res.end()
})
io.listen(5555)
http.listen(4000)
module.exports = http
