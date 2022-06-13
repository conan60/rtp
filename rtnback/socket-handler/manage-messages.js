const constants = require('../constants')
const {getRooms} = require('./manage-room')



const sendMessage = {
    action: constants.SEND_MESSAGE,
    handler: (socket,sockets) => (data) => {
        const rooms = getRooms()
        const name = rooms[data.room][socket.id]
        sockets.in(data.room).emit(constants.RECEIVE_MESSAGE, { message : data.message,date : new Date(), name})
    }
}




module.exports = {
    sendMessage
}