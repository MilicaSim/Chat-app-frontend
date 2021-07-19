import { Divider, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import React, { useState } from 'react';
import chatService from '../../services/chat.service';
import './Messages.css'
import moment from 'moment'
import getIdFromToken from '../../functions/userId.function';

const Messages = (props: any) => {

  const [sendMessage, setSendMessage] = useState({
    forUserId: props.items.forUserId,
    message: ''
  });
    
  const messageChangeHandler = (event: any) => {
    setSendMessage((prevState) => {
      return { ...prevState, message: event.target.value };
    });
  }

  const sendMessageForm = (event: any) => {
    event.preventDefault();
    chatService.sendMessage(sendMessage)
      .then((response: any) => {
        props.onSendClik(sendMessage.forUserId)
      });
  }

  const formatDateTime = (date: string, format: string) => {
    return date ? moment(date).format(format) : ''
  }
  const background = (userId: string) => {
    return sendMessage.forUserId === userId ? "#ffffff" : "#e3f2fd"
  }

  const leftOrRigth = (userId: string) => {
    return sendMessage.forUserId === userId ? 'end' : 'start';
  }

  const putIcon = (seenOn: string, userId: string) => {
    if(seenOn && userId === getIdFromToken())
      return <p>&#9989;</p>;
  }

  return (
    <div >
      <div id= 'my_div' className="message">
        <List component="nav" aria-label="main mailbox folders" >
              {
                  props.items.message.map((item: any, index: any) => {
                    return (
                      <div>
                         <ListItem key= {Math.random()} button style={{ backgroundColor: background(item.forUserId)}}> 
                            <ListItemIcon>{putIcon(item.seenOn, item.fromUserId)} </ListItemIcon>
                            <ListItemText primary = {item.message } secondary = {formatDateTime(item.createdOn, 'DD/MM/YYYY hh:mm:ss A')} style={{textAlign: leftOrRigth(item.forUserId)}}  />
                          </ListItem>
                        <br/>  
                      </div> 
                    )
                  })
              }
        </List>
      </div>
      <Divider />
      <div id='seen' style={{display: "none"}} >Procitano</div>
      <br/>
      <form onSubmit={sendMessageForm}>
        <label>
          <textarea name="message" onChange = {messageChangeHandler} />
        </label>
        <br/>
          <input type="submit" value="Send" />
      </form>  
    </div>
  );
}
export default Messages;