import {
    SHOW_ACTIV,
    SHOW_COMPLETED, 
    UPDATE_TODO,
    UPDATE_ALL_TODO,
    DELETE_TODO, 
    TODO_ERROR,
    ADD_TODO} from "../actions/types"

const initialState = {
    todoItems: [],
    selectedItem: {},
    serverResponse: false, 
    error: ''
}

export default (state=initialState, action) => {
    switch(action.type){
        case UPDATE_TODO:
            return {
                ...state,
                error: action.error || '',
                serverResponse: action.payload.serverResponse || false
        }        
        case SHOW_ACTIV:
            return {
                ...state,
                error: '',
                todoItems: action.payload.todoItems || []
            }
        case SHOW_COMPLETED:
            return {
                ...state,
                error: action.error || '',
                todoItems: action.payload.todoItems || []
            }
        case UPDATE_ALL_TODO:
            return {
                ...state,
                error: action.error || '',
            }       
        case TODO_ERROR:
            return {
                ...state,
                error: action.error || 'Something Went Wrong plese fix it soon.',
                selectedItem: {}
            }

        case DELETE_TODO:
            return {
                 ...state,
                error: action.error || '',
                serverResponse: action.payload || false
            }
        
        case ADD_TODO:
            return {
                ...state,
                error: action.error || '',
                serverResponse: action.payload || false
            }                
        default : 
            return state;
    }
}