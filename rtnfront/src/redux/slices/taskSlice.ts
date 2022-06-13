import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TaskPayload {
  title : string;
  description : string;
  date : Date;
}

export interface TaskState {
  value : TaskPayload[]
}

const initialState: TaskState  = {
  value: [],
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    receiveTask: (state : TaskState,action : PayloadAction<TaskPayload>) => {
      state.value = [...state.value,action.payload]
    },
  },
})

// Action creators are generated for each case reducer function
export const { receiveTask} = taskSlice.actions

export default taskSlice.reducer