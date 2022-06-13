const constants = require('../constants')
const {getRooms} = require('./manage-room')



const sendTask = {
    action: constants.SEND_TASK,
    handler: (socket,sockets) => (data) => {
        const rooms = getRooms()
        const name = rooms[data.room][socket.id]
        sockets.in(data.room).emit(constants.RECEIVE_TASK, { title : data.title,date : new Date(data.date), description : data.description})
    }
}




module.exports = {
    sendTask
}