import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ButtonWithLoader from "../components/ButtonWithLoader";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import axios from "../axios";
import { useDispatch } from "react-redux";
import { setAlert } from "../redux/alert/alertActions";
import { setCurrentUser } from "../redux/user/userActions";
import { useHistory } from "react-router-dom";
import studentAvatar from "../images/studentAvatar.png";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 800,
    textTransform: "capitalize",
    textAlign: "center",
  },
  container: {
    minHeight: "100vh",
    minWidth: "100vw",
    background: "#eee",
    position: "absolute",
    top: 0,
    left: 0,
  },
  grid: {
    margin: "10px auto",
  },
  paper: {
    [theme.breakpoints.up(780)]: {
      width: "40%",
      padding: 5,
    },
    margin: "20px auto",
    padding: 20,
  },
  input: {
    margin: "10px auto",
  },
  dummyNav: {
    ...theme.mixins.toolbar,
    marginBottom: 20,
  },
}));

const StudentSignup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  //Form State
  const [roll, setRoll] = useState({
    value: "",
    error: false,
    helperText: "",
  });
  const [name, setName] = useState({
    value: "",
    error: false,
    helperText: "",
  });
  const [email, setEmail] = useState({
    value: "",
    error: false,
    helperText: "",
  });
  const [password, setPassword] = useState({
    value: "",
    error: false,
    helperText: "Password must be atleast 8 characters",
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: false,
    helperText: "",
  });

  //Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios({
      method: "POST",
      url: "/auth/signup",
      data: {
        name: name.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        roll: roll.value,
      },
    });

    if (data.status === "success") {
      dispatch(setAlert("Signup Successful", "success"));
      dispatch(setCurrentUser(data.data.user));
      history.push("/");
    } else {
      dispatch(setAlert(data.message.split(",")[0], "error"));
    }
  };

  //Updates and validates state when form changes
  const handleChange = (e) => {
    let error = false,
      helperText = "";
    switch (e.target.name) {
      case "roll":
        if (!e.target.value) {
          error = true;
          helperText = "This field is required";
        } else if (!/^[a-zA-Z0-9]*$/.test(e.target.value)) {
          error = true;
          helperText = "Invalid Roll Number";
        }
        setRoll({
          value: e.target.value,
          error,
          helperText,
        });
        break;
      case "name":
        if (!e.target.value) {
          error = true;
          helperText = "This field is required";
        } else if (e.target.value.length < 3) {
          error = true;
          helperText = "Name must be atleast 3 characters long";
        } else if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
          error = true;
          helperText = "Name must contain only alphabets";
        }
        setName({
          value: e.target.value,
          error,
          helperText,
        });
        break;
      case "email":
        setEmail({
          value: e.target.value,
          error,
          helperText,
        });
        break;
      case "password":
        if (!e.target.value) {
          error = true;
          helperText = "This field is required";
        } else if (e.target.value.length < 8) {
          error = true;
          helperText = "Password must be atleast 8 characters long";
        }
        setPassword({
          value: e.target.value,
          error,
          helperText,
        });
        break;
      case "confirmPassword":
        if (!e.target.value) {
          error = true;
          helperText = "This field is required";
        } else if (e.target.value !== password.value) {
          error = true;
          helperText = "Passwords did not match";
        }
        setConfirmPassword({
          value: e.target.value,
          error,
          helperText,
        });
        break;
      default:
        break;
    }
  };

  //Returns the component
  return (
    <Grid
      container
      className={classes.container}
      style={{ paddingTop: "10vh" }}>
      <div className={classes.dummyNav}></div>
      <Paper className={classes.paper} elevation={5}>
        <Grid className={classes.grid} container spacing={1} justify="center">
          <form onSubmit={handleSubmit}>
            <Grid item style={{ margin: "30px auto" }}>
              <Typography
                variant="h4"
                color="primary"
                className={classes.title}>
                Student Signup
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                className={classes.input}
                name="roll"
                required
                fullWidth
                error={roll.error}
                helperText={roll.helperText}
                variant="standard"
                onChange={handleChange}
                placeholder="eg.1818126"
                label="Roll No.">
                {roll.value}
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                className={classes.input}
                error={name.error}
                helperText={name.helperText}
                name="name"
                required
                fullWidth
                onChange={handleChange}
                variant="standard"
                type="text"
                color="primary"
                placeholder="eg.Harish"
                label="Name">
                {name.value}
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                className={classes.input}
                name="email"
                fullWidth
                error={email.error}
                helperText={email.helperText}
                onChange={handleChange}
                variant="standard"
                type="text"
                color="primary"
                required
                placeholder="eg.abc@gmail.com"
                label="Email">
                {email.value}
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                className={classes.input}
                name="password"
                fullWidth
                error={password.error}
                required
                helperText={password.helperText}
                onChange={handleChange}
                variant="standard"
                type="password"
                color="primary"
                label="Password">
                {password.value}
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                gutterBottom
                className={classes.input}
                fullWidth
                error={confirmPassword.error}
                required
                helperText={confirmPassword.helperText}
                name="confirmPassword"
                onChange={handleChange}
                variant="standard"
                type="password"
                color="primary"
                label="Confirm Password">
                {confirmPassword.value}
              </TextField>
            </Grid>
            <Grid item>
              <ButtonWithLoader
                type="submit"
                fullWidth
                style={{
                  fontWeight: "bolder",
                  marginTop: 20,
                  marginBottom: 20,
                }}
                variant="contained"
                color="primary"
                content="Submit"
              />
            </Grid>
            <Grid item style={{ marinTop: 20, textAlign: "center" }}>
              <Typography variant="body1">
                Already have an account?
                <Link
                  to="/student/signin"
                  color="primary"
                  style={{ fontWeight: "bold", textDecoration: "none" }}>
                  {" "}
                  Signin
                </Link>{" "}
                Here
              </Typography>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default StudentSignup;
