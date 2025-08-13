import { fetchXeMay, addXeMay, updateXeMay, deleteXeMay } from '../../api/xeMayApi';

// Action Types
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const FETCH_TODOS = 'FETCH_TODOS';

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

// Thunk action creators
export const fetchTodosFromApi = () => async (dispatch) => {
  try {
    const data = await fetchXeMay();
    dispatch({ type: FETCH_TODOS, payload: data });
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
};

export const addTodoToApi = (todo) => async (dispatch) => {
  try {
    const data = await addXeMay(todo);
    dispatch(addTodo(data));
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateTodoInApi = (id, updatedTodo) => async (dispatch) => {
  try {
    const data = await updateXeMay(id, updatedTodo);
    dispatch(updateTodo(id, data));
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteTodoFromApi = (id) => async (dispatch) => {
  try {
    await deleteXeMay(id);
    dispatch(deleteTodo(id));
  } catch (error) {
    throw error;
  }
};