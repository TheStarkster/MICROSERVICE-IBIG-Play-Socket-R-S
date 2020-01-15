const axios = require('axios')
const WebSocket = require('ws');
const wss = new WebSocket.Server({
    port: 8080
}, () => {
    console.log("started")
});
var users = []
wss.on('connection', (socket, req) => {
    console.log(req.url + ":[Connected]")
    users[req.url] = socket
    socket.on('message', (data) => {
        console.log(req.url + ":" + data)
        if (JSON.parse(data).groupid != null) {
            JSON.parse(data).participants.forEach(element => {
                if (users[element] != null && user[element] !== "/"+JSON.parse(data).sender_phone) {
                    users[element].send(data)
                }
            });
        } else {
            if (users[JSON.parse(data).receiver] != null) {
                users[JSON.parse(data).receiver].send(data)
            }
        }
        // if (users[JSON.parse(data).receiver] != null) {
        //     users[JSON.parse(data).receiver].send(data)
        // }
        // else {
        //     axios.post("http://localhost:2643/save-message", {
        //         data: data,
        //     })
        // }
    })
});
async function SendToGroup() {
    let promise = new Promise((res, rej) => {
        //TODO send message to groups
    })
}