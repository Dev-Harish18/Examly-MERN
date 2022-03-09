import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonWithLoader from "../components/ButtonWithLoader";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import axios from "../axios";
import { useDispatch } from "react-redux";
import { setAlert } from "../redux/alert/alertActions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles((theme) => ({
  dummyNav: {
    ...theme.mixins.toolbar,
    marginBottom: 20,
  },
  title: {
    fontWeight: 800,
    textTransform: "capitalize",
    textAlign: "center",
  },
  container: {
    minHeight: "100vh",
    minWidth: "100vw",
    background: "#eee",
    justifyContent: "center",
    textAlign: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  grid: {
    margin: "10px auto",
  },
  form: {
    [theme.breakpoints.up(780)]: {
      width: "60%",
      padding: 20,
    },
    width: "100%",
  },
  paper: {
    [theme.breakpoints.up(780)]: {
      width: "60%",
      padding: 20,
    },
    height: "60vh",
    width: "80%",
    margin: "20px auto",
    padding: 20,
  },
  input: {
    margin: "10px auto",
  },
}));

const GetFoilSheet = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  //Form State

  const [examCode, setExamCode] = useState("");
  const [results, setResults] = useState([]);

  //Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios({
      method: "GET",
      url: `/teacher/results/${examCode}`,
    });
    console.log("results", data);
    if (data.status === "success") {
      setResults(data.data.results);
    } else {
      dispatch(setAlert(data.message.split(",")[0], "error"));
    }
  };
  //Publish results
  const publishResults = async () => {
    const { data } = await axios({
      method: "GET",
      url: `/teacher/publish/${examCode}`,
    });
    console.log("results", data);
    if (data.status === "success") {
      dispatch(setAlert("Results have been published successfully", "success"));
    } else {
      dispatch(setAlert(data.message.split(",")[0], "error"));
    }
  };
  //Returns the component
  return (
    <Grid
      container
      className={classes.container}
      justifyContent="center"
      style={{ paddingTop: "10vh" }}
      align="center">
      <div className={classes.dummyNav}></div>
      <Paper className={classes.paper} elevation={5}>
        <Grid
          className={classes.grid}
          container
          spacing={1}
          align="center"
          justify="center">
          <form onSubmit={handleSubmit} className={classes.form}>
            <Grid item style={{ margin: "30px auto" }}>
              <Typography
                variant="h4"
                color="primary"
                className={classes.title}>
                Exam Code
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

            <Grid item align="center">
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

      {results.length ? (
        <Paper className={classes.paper} elevation={5}>
          <Typography
            gutterBottom
            variant="h3"
            color="primary"
            className={classes.title}>
            {results[0].examId.subjectName} Results
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "800" }} align="center">
                  Name
                </TableCell>
                <TableCell style={{ fontWeight: "800" }} align="center">
                  Score
                </TableCell>
                <TableCell style={{ fontWeight: "800" }} align="center">
                  Status
                </TableCell>
                <TableCell style={{ fontWeight: "800" }} align="center">
                  Link
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((row) => (
                <TableRow key={row.roll}>
                  <TableCell align="center">{row.submittedBy.name}</TableCell>
                  <TableCell align="center">{`${row.score}/${row.examId.maxMarks}`}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">
                    <Link
                      to={`/teacher/results/${row.examId._id}/${row.submittedBy._id}`}>
                      Full details
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {results && results[0].published ? null : (
            <Button
              variant="contained"
              style={{ marginTop: 20 }}
              onClick={publishResults}
              color="primary">
              Publish Results
            </Button>
          )}
        </Paper>
      ) : null}
    </Grid>
  );
};

export default GetFoilSheet;
