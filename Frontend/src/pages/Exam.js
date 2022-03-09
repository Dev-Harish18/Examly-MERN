import { useEffect, useState, useRef, React } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import axios from "../axios";
import { useDispatch } from "react-redux";
import { setAlert } from "../redux/alert/alertActions";

import Countdown from "react-countdown";
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
  dummyNav: {
    ...theme.mixins.toolbar,
    marginBottom: 20,
  },
  input: {
    margin: "10px auto",
  },
}));

const Exam = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [answers, setAnswers] = useState([]);
  const [exam, setExam] = useState({});

  const [submitted, setSubmitted] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [examEnded, setExamEnded] = useState(false);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    // Render a countdown
    return (
      <Box
        style={{
          padding: 10,
          background: "#3f51b5",
          zIndex: 100,
          display: "inline-block",
          width: 100,
          textAlign: "center",
          borderRadius: "10px",
          boxShadow: "5px 5px 5px rgba(0,0,0,0.5)",
          border: "2px solid black",
          position: "fixed",
          top: "15vh",
          right: 30,
        }}>
        <Typography variant="h6" style={{ fontWeight: 700, color: "#fff" }}>
          {completed ? "Time up" : `${hours}:${minutes}:${seconds}`}
        </Typography>
      </Box>
    );
  };

  useEffect(() => {
    //Init answers
    let keys = [];
    for (let i = 0; i < exam?.questions?.length; i++) keys.push("");
    setAnswers(keys);
  }, [exam]);

  useEffect(() => {
    const getExam = async () => {
      const { data } = await axios({
        method: "GET",
        url: `/student/exam/${props.match.params.id}`,
      });
      console.log(data);
      if (data.status !== "success") {
        dispatch(setAlert(data.message.split(",")[0], "error"));
        history.goBack();
      } else {
        console.log(data);
        setExam({
          ...data.data.exam,
          instructions: data.data.exam.instructions[0],
        });
      }
    };
    getExam();
  }, []);

  useEffect(() => console.log(exam), [exam]);

  //Click handler
  const clickHandler = () => {
    console.log((new Date(exam.endTime) - Date.now()) / 1000);
    if (Date.now() < new Date(exam.startTime)) {
      setExamStarted(false);
      dispatch(
        setAlert(
          `Exam starts at ${
            new Date(exam.startTime).toString().split("GMT")[0]
          }`,
          "error"
        )
      );
      alert("Exam has not yet been started");
      return;
    }
    if (Date.now() >= new Date(exam.endTime)) {
      dispatch(setAlert("Exam has been Ended", "error"));
      setExamEnded(true);
      return;
    }
    setExamStarted(true);
  };

  const submitHandler = async () => {
    if (submitted) {
      alert("Exam has already been submitted");
      return;
    }
    setSubmitted(true);
    if (examEnded) {
      dispatch(setAlert("Exam has already been submitted", "error"));
      alert("Exam has already been submitted");
    }

    const { data } = await axios({
      url: `/student/exam/${props.match.params.id}`,
      method: "POST",
      data: {
        answers,
      },
    });
    console.log("data", data);
    if (data.status === "success")
      dispatch(setAlert(data.message.split(",")[0], "success"));
    else dispatch(setAlert(data.message.split(",")[0], "error"));
    console.log("answers", answers);
    setExamEnded(true);
    alert("Exam has been submitted");
  };

  return (
    <Grid
      container
      className={classes.container}
      style={{ paddingTop: "10vh" }}>
      <div className={classes.dummyNav}></div>
      <Paper className={classes.paper} align="center" elevation={5}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h3" color="primary" className={classes.title}>
              {exam.subjectName}
            </Typography>
          </Grid>

          <Divider style={{ width: "100%", height: "1px" }} />

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Start Time:</Typography>
            <Typography variant="body1">
              {new Date(exam.startTime).toString().split("GMT")[0]}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">End Time:</Typography>
            <Typography variant="body1">
              {new Date(exam.endTime).toString().split("GMT")[0]}
            </Typography>
          </Grid>

          <Divider style={{ width: "100%", height: "1px" }} />

          <Grid item xs={12}>
            <Typography variant="h3" color="primary" className={classes.title}>
              Instructions
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <List component="ul">
              {exam.instructions?.split("\n").map((el, i) => (
                <ListItem key={i}>
                  <Typography
                    variant="h6"
                    style={{ textAlign: "left" }}
                    className={classes.title}>
                    {`${i + 1} .  ${el}`}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Divider style={{ width: "100%", height: "1px" }} />

          <Grid item xs={12}>
            <Button
              style={{ margin: "20px auto" }}
              onClick={clickHandler}
              color="primary"
              variant="contained">
              Start Test
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {examStarted && (
        <Paper className={classes.questions}>
          {!examEnded && (
            <Countdown
              renderer={renderer}
              onComplete={() => {
                submitHandler();
              }}
              date={
                Date.now() + (new Date(exam.endTime) - Date.now())
              }></Countdown>
          )}
          <Grid container justifyContent="center">
            <Typography
              color="primary"
              align="center"
              variant="h3"
              className={classes.title}>
              Questions
            </Typography>
          </Grid>

          {exam.questions.map((ques, i) => (
            <Box key={i} style={{ margin: "20px auto" }}>
              <Grid item>
                <Typography
                  variant="h6"
                  style={{ fontWeight: "bold", textAlign: "left" }}>
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
                  ({ques.maxMarks} marks)
                </Typography>
              </Grid>
              <AnswerField idx={i} answers={answers} setAnswers={setAnswers} />
            </Box>
          ))}

          <Button variant="contained" onClick={submitHandler} color="primary">
            Finish Test
          </Button>
        </Paper>
      )}
    </Grid>
  );
};

export default Exam;
