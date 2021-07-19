import React, {useState} from "react";
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
import AuthService from '../../services/auth.service'
import { ILogin } from "../../Interfaces/ILogin";
import { decodeToken } from "react-jwt";
import { useHistory } from "react-router-dom";
import { IconButton, Snackbar } from "@material-ui/core";
import userService from "../../services/user.service";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {

  let history = useHistory();

  const [openError, setOpenError] = useState(false);

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };

  const [userInput, setUserInput] = useState<ILogin>({
    username: '',
    password: ''
  });

  const classes = useStyles();

  const usernameChangeHandler = (event: any) => {
    setUserInput((prevState) => {
      return { ...prevState, username: event.target.value };
    });
  }

  const passwordChangeHandler = (event: any ) => {
    setUserInput((prevState) => {
      return { ...prevState, password: event.target.value };
    });
  }

  const signInHandler = (event: any) => {
    event.preventDefault();
    console.log(userInput);
    AuthService.signIn(userInput)
      .then((response: any) => {
        localStorage.setItem("Auth",JSON.stringify(response.data));
        console.log(response);
        const token = response.data.accessToken;
        const myDecodedToken = decodeToken(token);
        console.log(myDecodedToken);
        userService.getUserWithId(myDecodedToken.sub)
          .then((response: any) => {
            console.log(response.data);
            localStorage.setItem("FirstName", response.data.firstName);
            localStorage.setItem("LastName", response.data.lastName);
          });
        history.push("/Dashboard");
      })
      .catch((error: Error) => {
        console.log(error);
        setOpenError(true);
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
          Sign in
        </Typography>
        <form className={classes.form} onSubmit = {signInHandler} noValidate >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="username"
            autoComplete="email"
            autoFocus
            onChange={usernameChangeHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={passwordChangeHandler}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
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
export default Login;