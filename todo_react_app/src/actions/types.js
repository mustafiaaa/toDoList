export const ADD_TODO = "ADD_TODO"
export const SHOW_ACTIV = "SHOW_ACTIV"
export const SHOW_COMPLETED = "SHOW_COMPLETED"
export const SHOW_ALL = "SHOW_ALL"
export const UPDATE_TODO = "UPDATE_TODO"
export const DELETE_TODO = "DELETE_TODO"
export const UPDATE_ALL_TODO = "UPDATE_ALL_TODO"
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER" 
export const TODO_ERROR = "TODO_ERROR"


export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
  }


  export function addTodo(text, date) {
    return { type: ADD_TODO, text, date}
  }
  
  export function toggleTodo(index) {
    return { type: UPDATE_TODO, index }
  }
  
  export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter }
  }