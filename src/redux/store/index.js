import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../reducers/todoReducer';

const store = configureStore({
  reducer: {
    todos: todoReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export default store;