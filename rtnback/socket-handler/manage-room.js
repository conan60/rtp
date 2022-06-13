const constants = require('../constants')
const { v4: uuid } = require('uuid');

let rooms = {}



const createRoom = {
    action: constants.CREATE_ROOM,
    handler: (socket) => (data) => {
        console.log(data)
        const roomid = uuid()
        rooms = { ...rooms, [roomid]: { [socket.id]: data.name } }
        socket.join(roomid)
        socket.emit(constants.ROOM_CREATED, { room: roomid, name: data.name })
    }
}

const joinRoom = {
    action: constants.JOIN_ROOM,
    handler: (socket,sockets) => (data) => {
        if (Object.keys(rooms).includes(data.roomid)) {
            rooms = { ...rooms, [data.roomid]: { ...rooms[data.roomid], [socket.id]: data.name } }
            socket.join(data.roomid)
            sockets.in(data.roomid).emit(constants.ROOM_JOINED, Object.values(rooms[data.roomid]).map(el=>({room : data.roomid,name : el})))
        }
    }
}

const getRooms = ()=>rooms

module.exports = {
    createRoom,
    joinRoom,
    getRooms
}