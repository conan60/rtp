import constants from "../constants"
import { createRoom,joinRoom } from "../redux/slices/roomSlice"
import { receiveMessage } from "../redux/slices/messageSlice"
import { receiveTask } from "../redux/slices/taskSlice"


const Listeners = (socket,dispatch)=>[
    // Room listener
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
    // Messages listener
    ()=>{
        socket.on(constants.RECEIVE_MESSAGE,data=>{
            dispatch(receiveMessage(data))
        })
    },
    // Tasks listener
    ()=>{
        socket.on(constants.RECEIVE_TASK,data=>{
            dispatch(receiveTask(data))
        })
    },

]

export default Listeners