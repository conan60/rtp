import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface roomPayload {
  name : string,
  room ?: string
}

export interface RoomState {
  me : string;
  value : roomPayload[]
}

const initialState: RoomState  = {
  me : '',
  value: [],
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setMe : (state : RoomState,action : PayloadAction<string>) => {
      state.me  = action.payload
    },
    createRoom: (state : RoomState,action : PayloadAction<roomPayload>) => {
      state.value = [...state.value,action.payload]
    },
    joinRoom : (state : RoomState,action : PayloadAction<roomPayload[]>) => {
      state.value = action.payload
    },
    exitRoom : (state : RoomState,action : PayloadAction<roomPayload>) => {
      state.value = state.value.filter(el=>el.name!==action.payload.name)
    },
  },
})

// Action creators are generated for each case reducer function
export const { createRoom, joinRoom, exitRoom, setMe } = roomSlice.actions

export default roomSlice.reducer