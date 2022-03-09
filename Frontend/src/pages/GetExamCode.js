import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ButtonWithLoader from "../components/ButtonWithLoader";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import axios from "../axios";
import { useDispatch } from "react-redux";
import { setAlert } from "../redux/alert/alertActions";
import { setCurrentUser } from "../redux/user/userActions";

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
  dummyNav: {
    ...theme.mixins.toolbar,
    marginBottom: 20,
  },
  paper: {
    [theme.breakpoints.up(780)]: {
      width: "40%",
      padding: 5,
    },
    height: "60vh",
    margin: "20px auto",
    padding: 20,
  },
  input: {
    margin: "10px auto",
  },
}));

const GetExamCode = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  //Form State

  const [examCode, setExamCode] = useState("");

  //Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/student/exam/${examCode}`);
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
                Get Exam Code
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                className={classes.input}
                name="examCode"
                fullWidth
                onChange={(e) => setExamCode(e.target.value)}
                variant="standard"
                type="text"
                color="primary"
                required
                placeholder="Enter the exam code"
                label="Exam Code">
                {examCode}
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
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default GetExamCode;
