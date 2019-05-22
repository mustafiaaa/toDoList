import mongoose from "mongoose"

mongoose.Promise = global.Promise

const todoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String, 
        reuired: true
    },
    createdDate: {
        type: Date,
        reuired: true
    },
    lastDate: {
        type: Date,
        reuired: false
    },
    status: {
        type: Boolean,
        reuired: true
    }
})

export default mongoose.model('todo_list', todoSchema)