import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import adminRouter from './router/admin.router.js'
import employeeRouter from './router/employee.router.js'
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())
//db connection
mongoose.connect("mongodb://127.0.0.1:27017/adminSchedule")
.then(() => {
    console.log('db is connected');
})
.catch(err => {
    console.log(err.message);
})

//get single user
app.use('/api/admin', adminRouter )
app.use('/api/employee', employeeRouter )


app.listen(8080, () => {
    console.log('server is listening on port 8080');
})