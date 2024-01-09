import { IconButton } from '@mui/material'
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import React from 'react'
import MessageFromOutside from './DisplayMessage/MessageFromOutside';
import MessageSelf from './DisplayMessage/MessageSelf';
import { useDispatch, useSelector } from 'react-redux';

const ChatArea = ({ children }) => {
    // const dispatch = useDispatch()
    const lightTheme = useSelector((state)=>state.themeKey)
    return (
        <div className={'chatArea-container'  + (lightTheme ? "" : ' dark')}>
            <div className={'chatArea-header'  + (lightTheme ? "" : ' dark')}>
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
                <MessageFromOutside>

                </MessageFromOutside>
                <MessageSelf></MessageSelf>
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