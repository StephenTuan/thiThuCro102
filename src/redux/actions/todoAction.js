// Action Types
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const SET_FILTER = 'SET_FILTER';
export const FETCH_TODOS = 'FETCH_TODOS';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';

// Action Creators
export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo
});

export const updateTodo = (id, updatedTodo) => ({
  type: UPDATE_TODO,
  payload: {
    id,
    updatedTodo
  }
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter
});

// API related actions
export const fetchTodos = () => ({
  type: FETCH_TODOS
});

export const fetchTodosSuccess = (todos) => ({
  type: FETCH_TODOS_SUCCESS,
  payload: todos
});

export const fetchTodosFailure = (error) => ({
  type: FETCH_TODOS_FAILURE,
  payload: error
});

// Thunk action creators
export const fetchTodosFromApi = () => {
  return async (dispatch) => {
    dispatch(fetchTodos());
    try {
      const response = await fetch('http://192.168.31.79:3000/XeMay');
      const data = await response.json();
      dispatch(fetchTodosSuccess(data));
    } catch (error) {
      dispatch(fetchTodosFailure(error.message));
    }
  };
};

export const addTodoToApi = (todo) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://192.168.31.79:3000/XeMay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      const data = await response.json();
      dispatch(addTodo(data));
      return data;
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  };
};

export const updateTodoInApi = (id, updatedTodo) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://192.168.31.79:3000/XeMay/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      const data = await response.json();
      dispatch(updateTodo(id, data));
      return data;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  };
};

export const deleteTodoFromApi = (id) => {
  return async (dispatch) => {
    try {
      await fetch(`http://192.168.31.79:3000/XeMay/${id}`, {
        method: 'DELETE',
      });
      dispatch(deleteTodo(id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  };
};