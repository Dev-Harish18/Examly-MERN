import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
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
  dummyNav: {
    ...theme.mixins.toolbar,
    marginBottom: 20,
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
    height: "100%",
    width: "80%",
    margin: "20px auto",
    padding: 20,
  },
  input: {
    margin: "10px auto",
  },
}));

const StudentResults = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  //Form State
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      const { data } = await axios({
        method: "GET",
        url: `/teacher/exams`,
      });

      console.log("results", data);

      if (data.status === "success") {
        setResults(data.data.exams);
      } else {
        dispatch(setAlert(data.message.split(",")[0], "error"));
        history.goBack();
      }
    };
    getResults();
  }, []);

  //Returns the component
  return (
    <Grid
      container
      className={classes.container}
      style={{ paddingTop: "10vh" }}>
      <div className={classes.dummyNav}></div>
      {results?.length ? (
        <Paper
          className={classes.paper}
          style={{
            overflowX: "scroll",
          }}
          elevation={5}>
          <Typography
            gutterBottom
            variant="h3"
            color="primary"
            className={classes.title}>
            My Exams
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "800" }} align="center">
                  Subject Name
                </TableCell>
                <TableCell style={{ fontWeight: "800" }} align="center">
                  Start time
                </TableCell>
                <TableCell style={{ fontWeight: "800" }} align="center">
                  End time
                </TableCell>
                <TableCell style={{ fontWeight: "800" }} align="center">
                  Exam Code
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((row, i) => (
                <TableRow key={i}>
                  <TableCell align="center">{row.subjectName}</TableCell>
                  <TableCell align="center">
                    {new Date(row.startTime).toString().split("GMT")[0]}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(row.endTime).toString().split("GMT")[0]}
                  </TableCell>
                  <TableCell align="center">{row._id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ) : (
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h3" className={classes.title} color="primary">
            No results found
          </Typography>
        </Paper>
      )}
    </Grid>
  );
};

export default StudentResults;
