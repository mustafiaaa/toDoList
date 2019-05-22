import express from "express"
import cors from "cors"
import {createTodo, getAllDone, getAllNotDone} from "../controller/todoController"

const Router = express.Router()

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  

Router.post('/insertTodo', createTodo)
Router.get('/getDone', getAllDone)
Router.get('/getNotDone', getAllNotDone)

export default Router