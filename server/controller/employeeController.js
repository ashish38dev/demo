import { AddEmployeeValidateSchema } from "../validator/validateEmployee.js"
import employeeModel from '../collections/employee.js'
import { Novu } from '@novu/node'; 

const novu = new Novu('166b2fd47e948991b37d0e666cb961f6');



export const AddEmployee = async (req,res) => {
    const employeeValidate = AddEmployeeValidateSchema.validate(req.body)
    if (employeeValidate.length) {
        const errors = employeeValidate.map(err => ( err.message ))
        return res.json({ success : false, errors })
    }
    const {email} = req.body
    const employee = await employeeModel.create(req.body);
    await novu.subscribers.identify(employee._id, {
        firstName: employee?.name,
        lastName: "Jain",
        email: email,
        phone: "+1234567890",
        avatar: "https://gravatar.com/avatar/553b157d82ac2880237566d5a644e5fe?s=400&d=robohash&r=x",
        locale: "en-US",
        data: {
          isDeveloper: true,
          customKey: "customValue"
        }
      });
    res.json({ success : true, employee })
} 

export const GetEmployee = async (req,res) => {
    try {
        const employee = await employeeModel.find()
        res.json({ success : true, employee })
    } catch (error) {
        res.json({ success : false, error })
        
    }
} 