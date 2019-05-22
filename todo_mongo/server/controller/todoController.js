import mongoose from "mongoose"
import todoObj from "../model/todoModel"

//insert todo
function createTodo(req, res){
    let date = new Date()
    let currentTime = date.getTime()
    const todoList = new todoObj({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        createdDate: req.body.createdDate || currentTime,
        lastDate: req.body.lastDate || 0,
        status: false
    })

    return todoList
           .save()
           .then((newTodo) => {
               return res.status(201).json({
                   success: true,
                   message: "New todo is inserted",
                   toDo : newTodo
               })
           })
           .catch((err) => {
               res.status(500).json({
                   success: false,
                   message: "Server error, Please try again",
                   error: err
               })
           })
}

//get all notDone todo
function getAllNotDone(req, res){
    todoObj.find({status: false})
    .select('_id title createdDate lastDate')
    .then((allTodo) => {
        return res.status(200).json({
            success: true,
            message: "All not done ToDo is found",
            toDo: allTodo
        })
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: "Internal Error Occure",
            error: err
        })
    })
}


//get all done todo
function getAllDone(req, res){
    todoObj.find({status: true})
    .select('_id title createdDate lastDate')
    .then((allTodo) => {
        return res.status(200).json({
            success: true,
            message: "All done ToDo is found",
            toDo: allTodo
        })
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: "Internal Error Occure",
            error: err
        })
    })
}

export {createTodo, getAllNotDone, getAllDone}