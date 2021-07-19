import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react';
import './UserChats.css'

const UserChats = (props: any) => {
    
    const [selectedIndex, setSelectedIndex] = useState(0);

    const clickHandler = (userId: string, unreadCount: any, event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number) => {
        setSelectedIndex(index);
        props.onClickChat(userId, unreadCount); 
    }

    const background = (unreadCount: number) => {
        return unreadCount === 0 ? "#ffffff" : "#e3f2fd"
    }

    const formatDateTime = (date: string, format: string) => {
        return date ? moment(date).format(format) : ''
    }

    const unreadCount = (count: number) => {
        return count === 0 ? '' : count
    }
    return (
        <div>
            <div className="userChats"> 
                <List component="nav" aria-label="main mailbox folders">
                {
                    props.items.map((item: any, index: any) => {
                    return (
                        <ListItem selected={selectedIndex === index} key={index} button onClick={(event) => clickHandler(item.userId, unreadCount(item.unreadMessageCount),event,index)} style={{ backgroundColor: background(item.unreadMessageCount), color: "blue"}}>
                            <ListItemIcon>
                                {unreadCount(item.unreadMessageCount)}
                            </ListItemIcon>
                            <ListItemText primary = {item.firstName + ' ' + item.lastName} secondary = {formatDateTime(item.lastMessageOn, 'DD/MM/YYYY hh:mm:ss A')}/>
                        </ListItem>  
                    )
                    })
                }
                </List>
        </div>
        <Divider />
        </div>
    );
}

export default UserChats;