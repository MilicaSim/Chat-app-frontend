import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import getIdFromToken from '../../functions/userId.function'

const Navb = (props: any) => {

  let history = useHistory();

  const logOutHandler = () => {
    localStorage.removeItem('Auth');
    localStorage.removeItem('FirstName');
    localStorage.removeItem('LastName');
    history.push("/");
  }

  const accountHanlder = () => {
    let userId = getIdFromToken();
    history.push('/my-account/'+ userId);
  }
  
    return (
        <AppBar position="static" style={{ display: "flex" }}>
          <Toolbar>
            <Typography variant="h6">{props.items.firstName} {props.items.lastName}</Typography>
            <div style={{ marginLeft: "auto" }}>
                  <Link to="/Dashboard">
                    <Button color="inherit">Home</Button>
                  </Link>
                    <Button color="inherit" onClick = {accountHanlder}>My Account</Button>
                  <Button color="inherit" onClick={logOutHandler}>
                    Logout
                  </Button>
            </div>
          </Toolbar>
        </AppBar>
      );
}

export default Navb;