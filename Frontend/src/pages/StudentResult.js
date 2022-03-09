import { useEffect, useState, useRef, React } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import axios from "../axios";
import { useDispatch } from "react-redux";
import { setAlert } from "../redux/alert/alertActions";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import AnswerField from "../components/AnswerField";

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
      width: "80%",
      padding: 20,
      borderLeft: `5px solid ${theme.palette.primary.main}`,
    },
    width: "80%",
    height: "100%",
    margin: "20px auto",
    padding: 20,
    borderLeft: `10px solid ${theme.palette.primary.main}`,
  },
  questions: {
    [theme.breakpoints.up(780)]: {
      width: "80%",
      padding: 20,
      borderLeft: `5px solid ${theme.palette.primary.main}`,
    },
    width: "80%",
    height: "100%",
    margin: "20px auto",
    padding: 20,
    borderLeft: `10px solid ${theme.palette.primary.main}`,
  },
  input: {
    margin: "10px auto",
  },
  dummyNav: {
    ...theme.mixins.toolbar,
    marginBottom: 20,
  },
}));

const StudentResult = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [result, setResult] = useState([]);

  useEffect(() => {
    const getResult = async () => {
      const { data } = await axios({
        method: "GET",
        url: `/student/results/${props.match.params.examId}`,
      });
      console.log("results!", data);
      if (data.status === "success") {
        setResult(data.data.result);
      } else {
        dispatch(setAlert(data.message.split(",")[0], "error"));
        history.goBack();
      }
    };
    getResult();
  }, []);

  //Click handler
  const clickHandler = () => {};

  const submitHandler = async () => {};

  return (
    <Grid
      container
      className={classes.container}
      style={{ paddingTop: "10vh" }}>
      <div className={classes.dummyNav}></div>s
      <Paper className={classes.paper} align="center" elevation={5}>
        <Grid container justify="center" spacing={1}>
          <Grid item xs={12}>
            <Typography
              variant="h3"
              color="primary"
              gutterBottom
              className={classes.title}>
              {result.examId?.subjectName}
            </Typography>
          </Grid>

          <Divider style={{ width: "100%", height: "1px" }} />

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Start Time:</Typography>
            <Typography variant="body1">
              {new Date(result.examId?.startTime).toString().split("GMT")[0]}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">End Time:</Typography>
            <Typography variant="body1">
              {new Date(result.examId?.endTime).toString().split("GMT")[0]}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Total Marks:</Typography>
            <Typography variant="body1">{result.examId?.maxMarks}</Typography>
          </Grid>

          <Divider style={{ width: "100%", height: "1px" }} />

          <Grid item xs={12}>
            <Typography variant="h3" color="primary" className={classes.title}>
              Student's Details
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Roll Number:</Typography>
            <Typography variant="body1">{result.submittedBy?.roll}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Name:</Typography>
            <Typography variant="body1">{result.submittedBy?.name}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Score:</Typography>
            <Typography variant="body1">
              {result?.score} / {result?.examId?.maxMarks}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Percentage:</Typography>
            <Typography variant="body1">{result?.percentage}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Status:</Typography>
            <Typography variant="body1">{result?.status}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.questions}>
        <Grid container justifyContent="center">
          <Typography
            color="primary"
            align="center"
            variant="h3"
            className={classes.title}>
            Questions
          </Typography>
        </Grid>

        {result?.examId?.questions.map((ques, i) => (
          <Box key={i} style={{ margin: "20px auto", padding: 10 }}>
            <Grid item>
              <Typography
                variant="h6"
                style={{
                  fontWeight: "bold",
                  textAlign: "left",
                  color: "#777",
                }}>
                {`${i + 1} . ${ques.name}`}
              </Typography>
              <Typography
                variant="h6"
                color="primary"
                style={{
                  margin: "10px auto",
                  textAlign: "right",
                  fontWeight: "bold",
                }}>
                {`(${ques.maxMarks} marks)`}
              </Typography>

              <Typography
                variant="body1"
                color="primary"
                style={{
                  fontWeight: "bold",
                  margin: "20px auto",
                  padding: 10,
                  border: "2px solid #3f51b5",
                  textAlign: "left",
                }}>
                {result.answers[i]}
              </Typography>

              <Typography
                variant="h6"
                style={{
                  fontWeight: "bold",
                  margin: "20px auto",
                  textAlign: "left",
                }}>
                {`Assigned Marks : ${Math.round(result?.marks[i])}`}
              </Typography>
            </Grid>

            <Divider style={{ width: "100%", height: 1 }} />
          </Box>
        ))}
      </Paper>
    </Grid>
  );
};

export default StudentResult;
