import axios from "axios"
import {
        ADD_TODO,
        SHOW_ACTIV,
        SHOW_COMPLETED, 
        UPDATE_TODO,
        DELETE_TODO,
        UPDATE_ALL_TODO, 
        TODO_ERROR} from "./types"

const APP_URL = "http://localhost:3050/todo"


export const getActiveTodo = () => {
    return async (dispatch) => {
      // dispatch({type: VisibilityFilters.SHOW_ACTIVE})
      try {
        let response = await axios.get(`${APP_URL}/getNotDone`)
        dispatch({
          type: SHOW_ACTIV,
          payload: {todoItems: response.data.toDo}
          
        })
      } catch (e) {
        dispatch({
          type: TODO_ERROR,
          error: "Error is____________________ : "+e,
        })
      }
    }
  }

export const getCompletedTodo = () => {
    return async (dispatch) => {
      // dispatch({type: VisibilityFilters.SHOW_COMPLETED})
      try {
        let response = await axios.get(`${APP_URL}/getDone`)
        dispatch({
          type: SHOW_COMPLETED,
          payload: {todoItems: response.data.toDo}
        })
      } catch (e) {
        dispatch({
          type: TODO_ERROR,
          error: "Error is_________________ : "+e,
        })
      }
    }
  }

export const updateTodo = ({todoid}) => {
    return async (dispatch) => {
      try {
        let response = await axios.post(`${APP_URL}/updateTodo`, {todoid})
        console.log("from action........",response.data.success)
        dispatch({
          type: UPDATE_TODO,
          payload: {serverResponse: response.data.success}
        })
      } catch (e) {
        dispatch({
          type: TODO_ERROR,
          error: "Error is __________ : "+e,
        })
      }
    }
  }

export const deleteTodo = ({todoid}) => {
    return async (dispatch) => {
      try {
        let response = await axios.post(`${APP_URL}/deleteTodo`, {todoid})
        dispatch({
          type: DELETE_TODO,
          payload: response.data.success
        })
      } catch (e) {
        dispatch({
          type: TODO_ERROR,
          error: "Error is __________ : "+e,
        })
      }
    }
  }


  export const updateAllTodo = () => {
    return async (dispatch) => {
      dispatch({type: UPDATE_ALL_TODO})
      try {
        let response = await axios.post(`${APP_URL}/updateAllTodo`)
        dispatch({
          type: UPDATE_TODO,
          payload: {serverResponse: response.data.success}
        })
      } catch (e) {
        dispatch({
          type: TODO_ERROR,
          error: "Error is __________ : "+e,
        })
      }
    }
  }

export const addTodo = (title, date) => {
    return async (dispatch) => {
      try {
        let response = await axios.post(`${APP_URL}/insertTodo`, {title, lastDate: date})
        dispatch({
          type: ADD_TODO,
          payload: response.data.success
        })
      } catch (e) {
        dispatch({
          type: TODO_ERROR,
          error: "Error is __________ : "+e,
        })
      }
    }
  }

