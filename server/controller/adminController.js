import { adminLoginValidateSchema } from "../validator/validateAdmin.js";
import admin from "../collections/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import employee from "../collections/employee.js";
import { Novu } from '@novu/node'; 
import schedule from 'node-schedule';
import scheduleModel from '../collections/schedule.js'
import { ValidateSchema } from "../validator/validateSchema.js";
// 166b2fd47e948991b37d0e666cb961f6

const novu = new Novu('166b2fd47e948991b37d0e666cb961f6');



export const AdminLogin = async (req, res) => {
  try {
    const validationResult = adminLoginValidateSchema.validate(req.body);
    if (validationResult.length) {
      const err = validationResult.map((err) => err.message);
      return res.json({ success: false, err });
    }
    const exist = await admin.findOne({ email: req.body.email });
    if (!exist) {
      return res.json({ success: false, message: "user not found!" });
    }

    if (exist && await bcrypt.compare(req.body.password, exist.password)) {
      const token = jwt.sign(
        { _id: exist._id, email: exist.email },
        "test@@1122",
        { expiresIn: "1d" }
      );
      res.cookie("token", token, { httpOnly: true });
      res.json({ success: true, message: "login successfully", token });
    } else {
        return res.json({ success: false, message: "invalid credentials!" });
    }
} catch (error) {
    return res.json({ success: false, message: "server error" });
}
};

export const DashBoard = async (req, res) => {
    try {
        const adminUser = await admin.findOne(req._id)
        
        res.json({ success: true, adminUser });
    } catch (error) {
        return res.json({ success: false, message: "server error" });
        
      }
    };


export const AdminSchedule = async (req, res) => {
  try {
    const validationResult = ValidateSchema.validate(req.body);
    if (validationResult.length) {
      const err = validationResult.map((err) => err.message);
      return res.json({ success: false, err });
    }
    const { date, time, comment } = req.body;
    const employees = await employee.find({ _id: { $in: req.body.ids } });
    const adminData = await admin.find()
    // Create new schedule
    const createSchedule = await scheduleModel.create({ date, time, comment, employees });
    if (!createSchedule) {
      return res.json({ success: false, message: "Failed to create schedule" });
    }
    // Clear all existing jobs
    schedule.cancelJob();

    // Set up new schedule jobs
    const allSchedule = await scheduleModel.find().populate('employees');
    allSchedule.forEach(element => {
      const meetingDateTime = new Date(`${element.date}T${element.time}`);

      const notificationTime1 = new Date(meetingDateTime.getTime() - (90 * 60 * 1000)); // 90 minutes before the meeting
      const notificationTime2 = new Date(meetingDateTime.getTime() - (15 * 60 * 1000)); // 15 minutes before the meeting

      schedule.scheduleJob(notificationTime1, function () {
        element.employees.forEach((employee) => {
          novu.trigger('onboarding-workflow', {
            to: {
              subscriberId: employee._id,
              email: employee.email
            },
            payload: {
              "test": employee.name,
              "comment": element.comment
            }
          });
        });
      });

      schedule.scheduleJob(notificationTime2, function () {
        element.employees.forEach((employee) => {
          novu.trigger('onboarding-workflow', {
            to: {
              subscriberId: employee._id,
              email: employee.email
            },
            payload: {
              "test": employee.name,
              "comment": element.comment 
            }
          })
          novu.trigger('onboarding-workflow', {
            to: {
              subscriberId: adminData[0]._id,
              email: 'test007@yapmail.com' // use proper email to send notification 
            },
            payload: {
              "test": "hello admin",
              "comment": "email sended successfully" 
            }
          })
        });
      });
    });
    res.json({ success: true, message: "Meeting scheduled successfully" });


  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

