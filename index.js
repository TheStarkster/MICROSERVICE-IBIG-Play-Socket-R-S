const axios = require('axios') 
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 }, () => {
    console.log("started")
});
var users = []
wss.on('connection', (socket, req) => {
    console.log(req.url+":[Connected]")
    users[req.url] = socket
    socket.on('message', (data) => {
//      users[req.url].send(data)
        console.log(req.url+":"+data) 
//        console.log(JSON.parse(data))
//      console.log(JSON.parse(data).receiver)
//      for(const key in users){
//              console.log(key)
//}
    if(users[JSON.parse(data).receiver] != null){
        users[JSON.parse(data).receiver].send(data)
        }else{
            axios.post("http://localhost:2643/save-message",{
                data:data,
            })
            .then(u=> {
                console.log(u)
            })
	    }
    })
}); 