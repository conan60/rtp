import { configureStore } from '@reduxjs/toolkit'
import roomSlice from './slices/roomSlice'
import messageSlice from './slices/messageSlice'
import taskSlice from './slices/taskSlice'

export const store = configureStore({
  reducer: {
      room : roomSlice,
      messages : messageSlice ,
      tasks : taskSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch