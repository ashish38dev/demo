import express from 'express'
import { AddEmployee, GetEmployee } from '../controller/employeeController.js'
const router = express.Router()

router.post('/addemployee', AddEmployee )
router.get('/getemployee', GetEmployee )

export default router