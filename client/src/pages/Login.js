import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { setLoading } from '../redux/slice/loadingSlice'

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password:""
  });

  const dispatch = useDispatch()

  const Nav = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const res = await axios.post('http://localhost:8080/api/admin/login', formData)
    if (res.data?.success === false && res.data?.err) {
      res.data?.err.map((err) => (
        toast.error(err)
        ))
      }else if(res.data?.success === false && res.data?.message) {
        
        toast.error(res.data.message)
      }
      if (res.data.success) {
        Cookies.set('token',res.data.token)
        toast.success("Login successfully")
        Nav('/dashboard')
        dispatch(setLoading(false))
    }
  }

  const redirect = () => {
    const token = document?.cookie?.split('; ')?.find(row => row?.startsWith('token='))?.split('=')[1];

    if (token) {
      return Nav('/dashboard')
    }
  }

  useEffect(() => {
    redirect()
  }, []);

  return (
    <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Admin Login</h2>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        name='email'
                        className="form-control"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={e => handleChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name='password'
                        className="form-control"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={e => handleChange(e)}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>
        </div>
  )
}

export default Login