import { IconButton } from '@mui/material'
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from 'react'
import MessageFromOutside from './DisplayMessage/MessageFromOutside';
import MessageSelf from './DisplayMessage/MessageSelf';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ChatArea = ({ children }) => {
    const { id } = useParams()
    const [messageData, setMessageData] = useState([])
    const userData = JSON.parse(localStorage.getItem("userData"));
    const config = {
        headers: {
            Authorization: `${userData.token}`
        }
    }
    const fetchCHatData = async () => {
        const response = await axios.get(`http://localhost:5000/api/message/${id}`, config);
        console.log(response);
        setMessageData(response.data)
        console.log(messageData);
    }
    useEffect(() => {
        fetchCHatData();

    }, [id])

    const lightTheme = useSelector((state) => state.themeKey)
    return (
        <div className={'chatArea-container' + (lightTheme ? "" : ' dark')}>
            <div className={'chatArea-header' + (lightTheme ? "" : ' dark')}>
                <p className={"con-icon" + (lightTheme ? "" : ' dark')}>user</p>
                <div className={"header-text"}>
                    <p className={"con-title"}> user anme</p>
                    <p className={"con-timeStamp"}> Time stamp</p>
                </div>
                <IconButton>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            </div>
            <div className={'messages-container' + (lightTheme ? "" : ' dark')}>
                {
                    messageData && messageData.map((message, index) => {
                       
                        const sender = message.sender
                        const userId = userData.userInfo._id
                        if (sender._id === userId) {
                            return <MessageSelf props={message} key={index}/>
                        } else {
                            return <MessageFromOutside props={message} key={index}/>
                        }
                        return <p key={index}>{message.content}</p>
                    })
                }

            </div>
            <div className={'text-input-area' + (lightTheme ? "" : ' dark')}>
                <input placeholder='Type message' className={'search-box' + (lightTheme ? "" : ' dark')}></input>
                <IconButton className={'icon' + (lightTheme ? "" : ' dark')}>
                    <SendIcon></SendIcon>
                </IconButton>
            </div>
        </div>
    )
}

export default ChatArea