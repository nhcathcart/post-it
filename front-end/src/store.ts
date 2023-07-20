import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './reducers/loginReducer'
import eventsReducer from './reducers/eventsReducer'
import friendsReducer from './reducers/friendsReducer'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    events: eventsReducer,
    friends: friendsReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch