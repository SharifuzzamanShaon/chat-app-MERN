import { useEffect, useState } from 'react'
import axios from 'axios';
import { IconButton } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";

import './style.css'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux';
import { refreshSidebarFun } from '../Redux/refreshSidebar';
const Users = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [searchValue, setSearchValue] = useState("")
  const [users, setUsers] = useState([])
  const dispatch = useDispatch()
  console.log(searchValue);
  const config = {
    headers: {
      Authorization: `${userData.token}`
    }
  }
  const findUser = async () => {
    const response = await axios.get(`http://localhost:5000/api/auth/get-users?search=${searchValue}`, config);
    setUsers(response.data.allUser)
  }
  useEffect(() => {
    setTimeout(() => {
      findUser();
    }, 2000);
  }, [searchValue]);

  const accesssUser = async (id) => {
    const config = {
      headers: {
        Authorization: `${userData.token}`
      }
    }
    const response = await axios.post('http://localhost:5000/api/chat/', { userId: id }, config)
    console.log(response);
    dispatch(refreshSidebarFun())
  }
  return (
    <div className='list-container'>
      <div className='ug-header'>
        <img src=""></img>
        <p className='ug-title'>online users</p>
      </div>
      <div className='sb-search'>
        <IconButton className={'icon'}>
          <SearchIcon />
        </IconButton>
        <input placeholder='Find User Here' className='search-box' onChange={(e) => setSearchValue(e.target.value)}></input>

      </div>
      <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{
        ease: "anticipate", duration: "0.5",
      }} className='ug-list'>
        {
          users.map((item) => {
            return (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }} className='list-tem' onClick={() => accesssUser(item._id)}>
                <p className='con-icon'>{item.name[0]}</p>
                <p className='con-title'>{item.name}</p>
              </motion.div>)
          })
        }
      </motion.div>
    </div >
  )
}

export default Users