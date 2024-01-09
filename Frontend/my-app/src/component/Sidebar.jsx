import './style.css'
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LightModeIcon from "@mui/icons-material/LightMode";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from '../Redux/themeSlice';
import axios from 'axios';
const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lightTheme = useSelector((state) => state.themeKey);
    // const refresh = useSelector((state) => state.refreshKey);
    //   const { refresh, setRefresh } = useContext(myContext);
    //   console.log("Context API : refresh : ", refresh);
    const [conversations, setConversations] = useState([]);
    // console.log("Conversations of Sidebar : ", conversations);
    const userData = JSON.parse(localStorage.getItem("userData"));
    // console.log("Data from LocalStorage : ", userData);

    const config = {
        headers: {
            Authorization: `${userData}`
        }
    }
    const fetchAllConversation = async () => {
        const response = await axios.get("http://localhost:5000/api/chat/", config);
        console.log(response);
        setConversations(response.data)
    }
    useEffect(() => {
        fetchAllConversation();
    }, [])
    return (
        <div className="sidebar-container">
            <div className={'sb-header' + (lightTheme ? "" : ' dark')}>
                <div className='other-icons'>
                    <IconButton onClick={() => {
                        navigate("welcome");
                    }}>
                        <AccountCircleIcon className={'icon' + (lightTheme ? "" : ' dark')}></AccountCircleIcon>
                    </IconButton>
                    <IconButton onClick={() => {
                        navigate("users");
                    }}>
                        <PersonAddIcon className={'icon' + (lightTheme ? "" : ' dark')} />
                    </IconButton>
                    <IconButton onClick={() => {
                        navigate("groups");
                    }}>
                        <GroupAddIcon className={'icon' + (lightTheme ? "" : ' dark')} />
                    </IconButton>
                    <IconButton>
                        <ExitToAppIcon className={'icon' + (lightTheme ? "" : ' dark')} />
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            navigate("create-group");
                        }}>
                        <AddCircleIcon className={'icon' + (lightTheme ? "" : ' dark')} />
                    </IconButton>
                    {/* <IconButton onClick={() => setLghtTheme((prev) => { return !prev })}> */}
                    <IconButton onClick={() => dispatch(toggleTheme())}>
                        {lightTheme && <NightlightIcon className={'icon' + (lightTheme ? "" : ' dark')} />}
                        {!lightTheme && <LightModeIcon className={'icon' + (lightTheme ? "" : ' dark')} />}
                    </IconButton>
                </div>
            </div>
            <div className={'sb-search' + (lightTheme ? "" : ' dark')}>
                <IconButton>
                    <SearchIcon className={'icon' + (lightTheme ? "" : ' dark')} />
                </IconButton>
                <input placeholder='search' className={'search-box' + (lightTheme ? "" : ' dark')}></input>
            </div>
            <div className={"sb-conversations" + (lightTheme ? "" : ' dark')}>
                {conversations.map((conversation, index) => {
                    // console.log("current convo : ", conversation);
                    if (conversation.users.length === 1) {
                        return <div key={index}></div>;
                    }
                    if (conversation.latestMessage === undefined) {
                        // console.log("No Latest Message with ", conversation.users[1]);
                        return (
                            <div
                                key={index}
                                onClick={() => {
                                    console.log("Refresh fired from sidebar");
                                    // dispatch(refreshSidebarFun());

                                }}
                            >
                                <div
                                    key={index}
                                    className={"conversation-container" + (lightTheme ? "" : ' dark')}
                                    onClick={() => {
                                        navigate(
                                            "chat/"
                                        );
                                    }}
                                // dispatch change to refresh so as to update chatArea
                                >
                                    <p className={"con-icon" + (lightTheme ? "" : ' dark')}>
                                        {conversation.users[1].name[0]}
                                    </p>
                                    <p className={"con-title" + (lightTheme ? "" : ' dark')}>
                                        {conversation.users[1].name}
                                    </p>

                                    <p className={"con-lastMessage" + (lightTheme ? "" : ' dark')}>
                                        No previous Messages, click here to start a new chat
                                    </p>
                                    <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
                                        {conversation.timeStamp}
                                    </p>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div
                                key={index}
                                className="conversation-container"
                                onClick={() => {
                                    navigate(
                                        "chat/"
                                    );
                                }}
                            >
                                <p className={"con-icon"}>
                                    {conversation.users[1].name[0]}
                                </p>
                                <p className={"con-title"}>
                                    {conversation.users[1].name}
                                </p>

                                <p className="con-lastMessage">
                                    {conversation.latestMessage.content}
                                </p>
                                <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
                                    {conversation.timeStamp}
                                </p>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    )
}

export default Sidebar