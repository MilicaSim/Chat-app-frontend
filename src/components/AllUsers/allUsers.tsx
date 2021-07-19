import { Divider, List, ListItem, ListItemText } from '@material-ui/core';
import React, { useState } from 'react';
import Modal from "react-modal";
import chatService from '../../services/chat.service';
import './AllUsers.css'

const AllUsers = (props: any) => {

  const [isOpen, setIsOpen] = useState(false);

  const [sendMessage, setSendMessage] = useState({
    forUserId: '',
    message: ''
  });

  const openModal = (forUserId: string) => {
      setIsOpen(!isOpen);
      setSendMessage((prevState) => {
        return { ...prevState, forUserId: forUserId };
      });
  }

  const closeModal = () => {
    setIsOpen(!isOpen);
  }
  const sendMessageModal = (event: any) => {
    event.preventDefault();
    chatService.sendMessage(sendMessage)
      .then((response: any) => {
        setIsOpen(!isOpen);
        props.onSendClik(sendMessage.forUserId)
      });
  }

  const messageChangeHandler = (event: any) => {
    setSendMessage((prevState) => {
      return { ...prevState, message: event.target.value };
    });
  }

  return (
    <div>
      <div className="allUsers">
        <Modal
          isOpen={isOpen}
          contentLabel="My dialog"
          ariaHideApp={false}
          className="mymodal"
          overlayClassName="myoverlay"
          closeTimeoutMS={500}
        >
          <form onSubmit={sendMessageModal}> 
            <label>
              <textarea name="message" onChange={messageChangeHandler}/>
            </label>
            <br/>
            <input type="submit" value="Send" />
          </form>
          <button onClick = {closeModal}>Cancle</button>
        </Modal>
              <List component="nav" aria-label="main mailbox folders">
                  {
                  props.items.map((item: any, index: any) => {
                    return ( 
                    <ListItem button key={index} onClick={() => openModal(item.id)}>
                      <ListItemText primary = {item.firstName + ' ' + item.lastName} secondary= {item.email} style={{ color: "blue"}}/>
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
export default AllUsers;