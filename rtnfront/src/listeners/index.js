import constants from "../constants"
import { createRoom,joinRoom } from "../redux/slices/roomSlice"
import { receiveMessage } from "../redux/slices/messageSlice"



const Listeners = (socket,dispatch)=>[

    ()=>{
        socket.on(constants.ROOM_CREATED,data=>{
            dispatch(createRoom(data))
        })
    },
    ()=>{
        socket.on(constants.ROOM_JOINED,data=>{
            dispatch(joinRoom(data))
        })
    },
    ()=>{
        socket.on(constants.RECEIVE_MESSAGE,data=>{
            dispatch(receiveMessage(data))
        })
    },

]

export default Listeners