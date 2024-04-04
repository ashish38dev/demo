import mongoose from "mongoose";

const { Schema, model } = mongoose;

const scheduleSchema = new Schema({
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'employee'
    }]
});

export default model("schedule", scheduleSchema);
