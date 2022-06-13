import { RootState } from '../store'

export const roomSelector = (state : RootState)=>state.room.value
export const userSelector = (state : RootState)=>state.room.me