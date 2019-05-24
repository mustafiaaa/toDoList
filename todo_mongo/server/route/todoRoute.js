import express from "express"
import {createTodo, getAllDone, getAllNotDone, updateTodo, deleteTodo, updateAllTodo} from "../controller/todoController"

const Router = express.Router()

Router.post('/insertTodo', createTodo)
Router.get('/getDone', getAllDone)
Router.get('/getNotDone', getAllNotDone)
Router.post('/updateTodo', updateTodo)
Router.post('/deleteTodo', deleteTodo)
Router.post('/updateAllTodo', updateAllTodo)

export default Router