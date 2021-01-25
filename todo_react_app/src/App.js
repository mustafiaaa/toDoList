import React from 'react'
import TodoApp from './components/TodoApp' 
import './App.css';
import {Provider} from "react-redux"
import store from "./store"

function App() {
  return (
    <Provider store={store}>
    <div className="App todoContainer">
        <TodoApp />
    </div>
    </Provider>
  )
}

export default App;
