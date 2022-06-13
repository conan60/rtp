import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface messagePayload {
  name : string;
  message : string;
  date : Date;
}

export interface MessageState {
  value : messagePayload[]
}

const initialState: MessageState  = {
  value: [],
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    receiveMessage: (state : MessageState,action : PayloadAction<messagePayload>) => {
      state.value = [...state.value,action.payload]
    },
  },
})

// Action creators are generated for each case reducer function
export const { receiveMessage} = messageSlice.actions

export default messageSlice.reducer