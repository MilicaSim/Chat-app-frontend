import React, { useEffect, useState } from 'react';
import UserChats from '../UserChats/userChats';
import AllUsers from '../AllUsers/allUsers';
import userService from '../../services/user.service';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import chatService from '../../services/chat.service';
import { IUserChats } from '../../Interfaces/IUserChats';
import { IAllUsers } from '../../Interfaces/IAllUsers';
import Messages from '../AllMessagesWithUser/Messages';
import Navb from '../Navbar/navbar';
import socket from '../../socket/socket'
import getIdFromToken from '../../functions/userId.function';
import generateString from '../../functions/generateString';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3), //grid padding
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

let page = 1;
let totalPages = 1;
let messWithUser = '';

 const Dashboard = () => {

  const classes = useStyles();

  const [user, setUser] = useState({
    firstName: '',
    lastName: ''
  });

  const [userName, setUserName] = useState({
    firstName: '',
    lastName: ''
  });

  const [userChats, setUserChats] = useState<IUserChats[]>([{
    userId: '',
    firstName: '',
    lastName: '',
    unreadMessageCount: 0
  }]);

  const [allUsers, setAllUsers] = useState<IAllUsers[]>([{
    id: '',
    firstName: '',
    lastName: '',
    email: ''
  }]);

  const [messages, setMessages] = useState({
    forUserId: '',
    message: [],
  });

  const [disable, setDisable] = useState(true);

  const showMessagesHandler = (id: string) => {
    page = 1;

    setMessages((prevState) => {
      return {
        ...prevState,
        forUserId: id
      }
    });

    chatService.getAll()
      .then((response: any) => {
        setUserChats(response.data);
      });

    if(messWithUser === id){
      chatService.getAllWithUser(id,page)
      .then((response: any) => {
        totalPages = response.data.totalPages;
        let a= response.data.data.reverse();

        setMessages((prevState) => {
          return {
            ...prevState,
           message: response.data.data
          }
        });
        userService.getUserWithId(id)
          .then((response: any) => {
            setUserName(() => {
              return {
                firstName: response.data.firstName,
                lastName: response.data.lastName
              }
            })
          })
        });
      }
  }

  const messagesHandler = (id: string, unreadCount: any) => {
    page = 1;
    setDisable(false);
    messWithUser = id;
    if(unreadCount) {
      chatService.updateMessageSeenOn(id)
        .then((response: any) => {
          showMessagesHandler(id);
        });
    }
    else
    {
      showMessagesHandler(id);
    }
  }

  const showHandler = () => {
    if( page <= totalPages)
      page = page + 1;
      if(page == totalPages)
        setDisable(true);
      chatService.getAllWithUser(messages.forUserId, page)
      .then((response: any) => {
        setMessages((prevState) => {
          return {
            ...prevState,
            message: ((messages.message.reverse()).concat(response.data.data)).reverse()
          }
        });
      });
      
  }

  useEffect(() => {

    chatService.getAll()
      .then((response: any) => {
        console.log(response);
        setUserChats(response.data);
      });

    userService.getAllUsers()
      .then((response: any) => {
        console.log(response);
        setAllUsers(response.data);
        const firstName = localStorage.getItem("FirstName");
        const lastName = localStorage.getItem("LastName");
        if (firstName && lastName) {
          setUser(()=>
          {
            return {
              firstName: firstName,
              lastName: lastName
            }
          });
        }
      });
  }, []);

  socket.off(generateString(getIdFromToken())).on(generateString(getIdFromToken()), (data: any) => {
    if(data.type === 'message'){
      if(messWithUser == data.fromUserId)
        messagesHandler(data.fromUserId,1);
      showMessagesHandler(messWithUser);
    }
    else if(data.type === 'seen'){
      if(messWithUser == data.fromUserId)
        chatService.getAllWithUser(data.fromUserId,page)
        .then((response: any) => {
          response.data.data.reverse();
          setMessages((prevState) => {
            return {
              ...prevState,
              message: response.data.data
            }
          });
        });
      showMessagesHandler(messWithUser);
    }
    else if(data.type === 'typing')
      console.log('typing');
  });
  
  
  const FormRow = () => {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            User chats<UserChats items={userChats} onClickChat = {messagesHandler} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            Messages with 
            <br/>
            <b>{userName.firstName} {userName.lastName} </b>
            <br/>
              <button disabled={disable} onClick={showHandler}>
                Show more
              </button>
              <Messages items={messages} onSendClik={showMessagesHandler}></Messages>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            All users<AllUsers items = {allUsers} onSendClik = {showMessagesHandler}></AllUsers>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <Grid container spacing={1}>
      <Navb items={user}></Navb>
      <Grid container item xs={12} spacing={3}>
        <FormRow />
      </Grid>
    </Grid>
  );
}
export default Dashboard;