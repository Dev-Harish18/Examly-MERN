import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ButtonWithLoader from "../components/ButtonWithLoader";
import Paper from "@material-ui/core/Paper";
import Question from "../components/Question";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import Divider from "@material-ui/core/Divider";
import axios from "../axios";
import { useDispatch } from "react-redux";
import { setAlert } from "../redux/alert/alertActions";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 800,
    textTransform: "capitalize",
    textAlign: "center",
  },
  form: {
    [theme.breakpoints.up(780)]: {
      width: "80%",
    },
    width: "100%",
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
    width: "100%",
  },
  paper: {
    [theme.breakpoints.up(780)]: {
      width: "40%",
      padding: 30,
    },
    margin: "20px auto",
    padding: 30,
  },
  input: {
    margin: "10px auto",
    width: "100%",
  },
  fab: {
    margin: "20px auto",
  },
  dummyNav: {
    ...theme.mixins.toolbar,
    marginBottom: 20,
  },
}));

//Submit Handler

const QuestionForm = ({ title, initQuestions }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState(initQuestions);

  const [formData, setFormData] = useState({
    subjectName: "",
    minMarks: "",
    startTime: Date.now(),
    endTime: Date.now(),
    maxMarks: "",
    instructions: "",
  });

  const initial = {
    name: "",
    maxMarks: "",
    modelAns: "",
    keywords: "",
    minLength: "",
    maxLength: "",
  };
  //UseEffect
  useEffect(() => {
    console.log(questions);
  }, [questions]);
  //change Handler
  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(Date.now() > new Date(e.target.value));
  };
  //Add Handler
  const addQuestion = () => {
    setQuestions([...questions, { id: uuidv4(), ...initial }]);
  };
  //Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    if (questions.length === 0) {
      alert("Please add atleast one question");
      return;
    }
    let quesArray = [];
    let keys = [];

    questions.forEach((q) => {
      quesArray.push({ name: q.name, maxMarks: q.maxMarks });

      keys.push({
        modelAns: q.modelAns,
        keywords: q.keywords,
        minLength: q.minLength,
        maxLength: q.maxLength,
      });
    });

    const { data } = await axios({
      method: "POST",
      url: `/teacher/create`,
      data: { ...formData, questions: quesArray, keys },
    });

    if (data.status === "success") {
      dispatch(setAlert("Exam created successfuly", "success"));
      console.log("exam", data.data.exam._doc._id);
      alert(
        "Don't forget to copy the exam code for future use , The Exam Code is " +
          data.data.exam._doc._id
      );
    } else {
      dispatch(setAlert(data.message.split(",")[0], "error"));
    }
  };

  return (
    <Grid
      container
      className={classes.container}
      style={{ paddingTop: "10vh" }}>
      <div className={classes.dummyNav}></div>
      <Paper className={classes.paper} align="center" elevation={5}>
        <Grid className={classes.grid} container spacing={1} justify="center">
          <form className={classes.form} onSubmit={submitHandler}>
            <Grid item style={{ margin: "30px auto" }}>
              <Typography
                variant="h3"
                className={classes.title}
                color="primary">
                {title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                className={classes.input}
                name="subjectName"
                onChange={changeHandler}
                variant="standard"
                type="text"
                fullWidth
                autoFocus
                color="primary"
                label="Subject Name"
                value={formData.subjectName}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                className={classes.input}
                onChange={changeHandler}
                name="minMarks"
                variant="standard"
                type="text"
                color="primary"
                label="Pass marks for the examination"
                value={formData.minMarks}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                onChange={changeHandler}
                id="datetime-local"
                name="startTime"
                label="Start time of the examination"
                type="datetime-local"
                className={classes.input}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                onChange={changeHandler}
                id="datetime-local"
                name="endTime"
                label="End time of the examination"
                type="datetime-local"
                className={classes.input}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                onChange={changeHandler}
                className={classes.input}
                name="maxMarks"
                variant="standard"
                type="text"
                color="primary"
                label="Total marks of the examination"
                value={formData.maxMarks}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                onChange={changeHandler}
                className={classes.input}
                name="instructions"
                variant="standard"
                multiline
                type="text"
                color="primary"
                label="Instructions for the examination"
                value={formData.instructions}
              />
            </Grid>
            {/* Question Component */}
            {questions.length ? (
              <>
                <Typography
                  style={{ fontWeight: 800, margin: "10px auto" }}
                  align="center"
                  variant="h3"
                  color="primary">
                  Questions
                </Typography>
                {questions.map((q) => {
                  return (
                    <>
                      <Question
                        questions={questions}
                        setQuestions={setQuestions}
                        key={q.id}
                        id={q.id}
                        initial={initial}
                      />
                      <Divider />
                    </>
                  );
                })}
              </>
            ) : (
              <Typography
                style={{ margin: "20px auto", fontWeight: "bold" }}
                gutterBottom
                variant="body1">
                {" "}
                Click the + icon to add questions{" "}
              </Typography>
            )}

            {/* Add Question*/}
            <Grid item>
              <Tooltip title="Add Question" aria-label="add">
                <Fab
                  onClick={addQuestion}
                  color="primary"
                  className={classes.fab}>
                  <AddIcon />
                </Fab>
              </Tooltip>
            </Grid>
            {/* Submit button */}
            <Grid item>
              <ButtonWithLoader
                type="submit"
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

export default QuestionForm;
