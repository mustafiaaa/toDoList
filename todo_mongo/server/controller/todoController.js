import mongoose from "mongoose"
import todoObj from "../model/todoModel"

//insert todo
function createTodo(req, res, next){
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
                return res.status(200).json({
                    success: true,
                    message: "All not done ToDo is found",
                    toDo: newTodo
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
function getAllNotDone(req, res, next){
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
function getAllDone(req, res, next){
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

//update todo
function updateTodo(req, res){
    todoObj.update({_id: req.body.todoid}, {$set: {status: true}})
    .then(() => {
        return res.status(200).json({
            success: true,
            message: "Todo Updated Successfully"
        })
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: "Error occur on sever while updating",
            error: err
        })
    })    
}

//update todo
function updateAllTodo(req, res){
    todoObj.update({status: false}, {$set: {status: true}}, {multi:true})
    .then(() => {
        return res.status(200).json({
            success: true,
            message: "All Todo Updated Successfully"
        })
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: "Error occur on sever while updating",
            error: err
        })
    })    
}

//delete todo
function deleteTodo(req, res){
    todoObj.remove({_id: req.body.todoid})
    .then(() => {
        return res.status(200).json({
            success: true,
            message: "Todo Deleted successfully"
        })
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: "Error occur on server while deleting todo",
            error: err
        })
    })
}

export {createTodo, getAllNotDone, getAllDone, updateTodo, deleteTodo, updateAllTodo}