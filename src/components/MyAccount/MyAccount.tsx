import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UserServie from '../../services/user.service'
import { IconButton, Snackbar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { IUserAccount } from '../../Interfaces/IUserAccount';
import userService from '../../services/user.service';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const MyAccount = () => {

  const [userInput, setUserInput] = useState<IUserAccount>({
    firstName: '',
    lastName: '',
    email: ''
  });

  const classes = useStyles();
  let history = useHistory();

  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setOpenError(false);
  };

  const firstNameChangeHandler = (event: any) => {
    setUserInput((prevState) => {
      return { ...prevState, firstName:event.target.value };
    });
  }

  const lastNameChangeHandler = (event: any ) => {
    setUserInput((prevState) => {
      return { ...prevState, lastName:event.target.value };
    });
  }

  const emailChangeHandler = (event: any) => {
    setUserInput((prevState) => {
      return { ...prevState, email:event.target.value };
    });
  }

  const cancleHandler = (event: any) =>{
    history.push("/DashBoard");
  }

  const updateHandler = (event: any) => {
    event.preventDefault();
    console.log(userInput);
     UserServie.updateUser(findUserId(),userInput)
      .then((response: any) => {
        console.log(response);
        setOpen(true);
        userService.getUserWithId(findUserId())
          .then((response: any) => {
            console.log(response.data);
            localStorage.setItem("FirstName",response.data.firstName);
            localStorage.setItem("LastName",response.data.lastName);
          });
      })
      .catch((error: Error) => {
        console.log(error);
        setOpenError(true);
      });
    
  }
  
  const findUserId = () => {
    const url = window.location.href.toString();
    const urlElements = url.split('/');
    const userId = urlElements[urlElements.length-1];
    return userId;
  } 

  useEffect(() => {
    console.log(findUserId());
    userService.getUserWithId(findUserId())
    .then((response: any) => {
      setUserInput(()=> {
        return{
          firstName: response.data.firstName,
          lastName:response.data.lastName,
          email:response.data.email
        }
      });
    })
  }, [])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Update account
        </Typography>
        <form className={classes.form} onSubmit = {updateHandler} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={firstNameChangeHandler}
                value={userInput.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={lastNameChangeHandler}
                value={userInput.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={emailChangeHandler}
                value={userInput.email}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            UPDATE
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={cancleHandler}
          >
            CANCEL
          </Button>
        </form>
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}}
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  message="Success"
                  action={
                        <React.Fragment>
                          <Button color="secondary" size="small" onClick={handleClose}>
                            CLOSE
                          </Button>
                          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}/>
                        </React.Fragment>
                  }/>
         <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}}
                  open={openError}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  message="Faild"
                  action={
                        <React.Fragment>
                          <Button color="secondary" size="small" onClick={handleClose}>
                            CLOSE
                          </Button>
                          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}/>
                        </React.Fragment>
                  }/>
      </div>
    </Container>
  );
}

export default MyAccount;
   