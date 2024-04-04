import React, { useState } from 'react'
import axios from 'axios';
import './addemployee.css'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {

     // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const Nav = useNavigate()
  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:8080/api/employee/addemployee', formData)
  
    if (res.data?.success === false && res.data?.errors) {
      res.data?.errors.map((err) => (
        toast.error(err)
        ))
      }
      if (res.data.success) {
        toast.success("user added successfully")
        setFormData({ name: '', email: '' });
        Nav('/dashboard')
      }
  };


  return (
    <div className="form-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  )
}

export default AddEmployee