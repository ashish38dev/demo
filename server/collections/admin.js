import mongoose from "mongoose";

const { model, Schema } = mongoose

const adminSchema = new Schema({
    email:{
        type:String,
        require: true
    },
    password:{
        type:String,
        require: true
    }
})

export default model('admin', adminSchema)