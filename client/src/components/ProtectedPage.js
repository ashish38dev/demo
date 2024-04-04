import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLoading } from '../redux/slice/loadingSlice';
const ProtectedPage = () => {

    const [admin, setAdmin] = useState({});
    const Nav = useNavigate() 
    const dispatch = useDispatch()
  const getCurrent = async () => {
    
    const token = document?.cookie?.split('; ')?.find(row => row?.startsWith('token='))?.split('=')[1];

    if (token === undefined) {
      return Nav('/')
    }

    const res = await axios.get("http://localhost:8080/api/admin/dashboard", {
        headers: {
          Authorization: token 
        }
      })
      setAdmin(res.data.adminUser)
      if (res.data.success) {
        dispatch(setLoading(false))
        
      }
  }

  useEffect(() => {
    
    getCurrent()

  }, []);


  return (
    <>

        <div>
            <Header />
            {
                admin ? (<Outlet />) : (<></>)
            }
        </div>
    </>
  )
}

export default ProtectedPage