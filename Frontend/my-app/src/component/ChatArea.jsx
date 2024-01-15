import { IconButton } from '@mui/material'
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from 'react'
import MessageFromOutside from './DisplayMessage/MessageFromOutside';
import MessageSelf from './DisplayMessage/MessageSelf';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { refreshSidebarFun } from '../Redux/refreshSidebar';
import { io } from 'socket.io-client'
const ChatArea = ({ children }) => {
    const params = useParams()
    const [id, name] = params.id.split("&");
    const dispatch = useDispatch()
    const [messageData, setMessageData] = useState([]);
    const [msgText, setMsgText] = useState('');
    const [msgBoxRefresh, setMsgBoxRefesh] = useState(false)
    const userData = JSON.parse(localStorage.getItem("userData"));
    const lightTheme = useSelector((state) => state.themeKey)

    const config = {
        headers: {
            Authorization: `${userData.token}`
        }
    }
    const fetchCHatData = async () => {
        const response = await axios.get(`http://localhost:5000/api/message/${id}`, config);
        // console.log(response);
        setMessageData(response.data);
        // console.log(response.data);
    }
    useEffect(() => {
        fetchCHatData();

    }, [id, msgBoxRefresh])

    let socket = io('http://localhost:5000')
    useEffect(() => {
        try {

            socket.on('receive-msg', (message) => {
                console.log(message);

                const currentMsg = {
                    sender: {
                        _id: '09090io'
                    },
                    content: message
                }
                setMessageData([...messageData, currentMsg])
                // console.log(messageData);
            })

        } catch (error) {
            console.log(error);
        }
    })
    const sendMessage = async () => {
        try {
            socket.on("connect", () => {
                console.log('connected with', socket.id);
            })
            socket.emit("send-msg", msgText, socket.id)
            const config = {
                headers: {
                    Authorization: `${userData.token}`
                }
            }
            await axios.post('http://localhost:5000/api/message/', { content: msgText, chatId: id }, config)
            setMsgText("");
            setMsgBoxRefesh(!msgBoxRefresh);
            dispatch(refreshSidebarFun())
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={'chatArea-container' + (lightTheme ? "" : ' dark')}>
            <div className={'chatArea-header' + (lightTheme ? "" : ' dark')}>
                <p className={"con-icon" + (lightTheme ? "" : ' dark')}>user</p>
                <div className={"header-text"}>
                    <p className={"con-title"}> {name}</p>
                    <p className={"con-timeStamp"}> Time stamp</p>
                </div>
                <IconButton>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            </div>
            <div className={'messages-container' + (lightTheme ? "" : ' dark')}>
                {
                    messageData && messageData.slice().reverse().map((message, index) => { /// Slice() is  used to create a shallow copy of the messageData array [avoid original array mutation]

                        const sender = message.sender
                        const userId = userData.userInfo._id
                        if (sender._id === userId) {
                            return <MessageSelf props={message} key={index} />
                        } else {
                            return <MessageFromOutside props={message} key={index} />
                        }

                    })
                }

            </div>
            <div className={'text-input-area' + (lightTheme ? "" : ' dark')}>
                <input placeholder='Type message' className={'search-box' + (lightTheme ? "" : ' dark')} value={msgText} onChange={(e) => setMsgText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && msgText && sendMessage()}></input>
                <IconButton className={'icon' + (lightTheme ? "" : ' dark')} onClick={() => sendMessage()}>
                    { msgText ? <SendIcon/> : ""}
                </IconButton>
            </div>
        </div>
    )
}

export default ChatArea