import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../reducers/todoReducer';

// ConfigureStore from Redux Toolkit đã tích hợp sẵn middleware thunk
const store = configureStore({
  reducer: {
    todos: todoReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false // Cho phép các giá trị không serializable trong action
  })
});

export default store;