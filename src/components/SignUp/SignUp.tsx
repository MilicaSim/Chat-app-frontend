import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UserServie from '../../services/user.service'
import { IconButton, Snackbar } from '@material-ui/core';


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

const SignUp = () => {

  const [userInput, setUserInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const classes = useStyles();

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

  const passwordChangeHandler = (event: any) => {
    setUserInput((prevState) => {
      return { ...prevState, password:event.target.value };
    });
  }

  const signUpHandler = (event: any) => {
    event.preventDefault();
    console.log(userInput);
     UserServie.signUp(userInput)
      .then((response: any) => {
        console.log('Called signUp');
        setOpen(true);
        setUserInput(() => {
          return{
            firstName: '',
            lastName: '',
            email: '',
            password: ''
          }
        });
      })
      .catch((error: Error) => {
        console.log(error);
        setOpenError(true);
        setUserInput(() => {
          return{
            firstName: '',
            lastName: '',
            email: '',
            password: ''
          }
        });
      });
    
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit = {signUpHandler} noValidate>
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={passwordChangeHandler}
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
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

export default SignUp;