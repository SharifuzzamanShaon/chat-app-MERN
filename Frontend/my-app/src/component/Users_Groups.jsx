import { IconButton } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import './style.css'
import { motion } from 'framer-motion'

// import logo form '../Images/chatlog'
const Users_Groups = () => {
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
                <input placeholder='search user' className='search-box'></input>

            </div>
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{
                ease: "anticipate", duration: "0.5",
            }} className='ug-list'>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }} className='list-tem'>
                    <p className='con-icon'>T</p>
                    <p className='con-title'>Tests vvnj</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }} className='list-tem'>
                    <p className='con-icon'>T</p>
                    <p className='con-title'>Tests vvnj</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }} className='list-tem'>
                    <p className='con-icon'>T</p>
                    <p className='con-title'>Tests vvnj</p>
                </motion.div>
            </motion.div>
        </div >
    )
}

export default Users_Groups