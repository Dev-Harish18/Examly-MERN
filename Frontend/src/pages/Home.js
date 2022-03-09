import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import mainImg from "../images/main.jpg";

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    minHeight: "70vh",
  },
  dummyNav: {
    ...theme.mixins.toolbar,
    marginBottom: 20,
  },
  heading: {
    fontWeight: 800,
  },
  mainImg: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
    textAlign: "center",
    margin: "0 auto",
  },
  content: {
    display: "flex",
    placeItems: "center",
  },
  contentPara: {
    lineHeight: 1.6,
    fontSize: 18,
    fontWeight: 400,
  },
  button: {
    textTransform: "none",
    fontWeight: "800",
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Container style={{ background: "fff" }}>
      <Grid spacing={3} container className={classes.rowContainer}>
        <Grid item xs={12} sm={6}>
          <img className={classes.mainImg} src={mainImg} alt="main-img" />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.content}>
          <Box>
            <Typography
              variant="h3"
              color="primary"
              gutterBottom
              my={2}
              className={classes.heading}
              component="h1">
              Examly
            </Typography>
            <Typography variant="body1" className={classes.contentPara}>
              An online examination system for secure and seamless online exams
              and robust online testing platform for conducting remote online
              examinations. Teachers can create examinations and students can
              attend exams and can view the status and results of examiations.
            </Typography>
            <Grid container spacing={2} style={{ marginTop: 30 }}>
              <Grid item>
                <Link to="/teacher/signup" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    className={classes.button}
                    color="primary">
                    I'm a Teacher
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/student/signup" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    className={classes.button}
                    color="primary">
                    I'm a Student
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {/* <Grid container className={classes.rowContainer}>
        <Grid item xs={12} sm={6} className={classes.content}>
          <Box my={4}>
            <Typography
              variant="h3"
              gutterBottom
              color="primary"
              my={2}
              className={classes.heading}
              component="h1">
              Quizzes
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              className={classes.contentPara}>
              A quiz is a form of game or mind sport in which players attempt to
              answer questions correctly about a certain or variety of subjects.
              Quizzes can be used as a brief assessment in education and similar
              fields to measure growth in knowledge, abilities, or skills.Check
              out some of our quizzes
            </Typography>
            <Link to="/quizes">
              <Button
                style={{ fontWeight: "bolder" }}
                className="btn"
                variant="contained"
                color="primary">
                Quizzes
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img className={classes.mainImg} src={quizImg} alt="main-img" />
        </Grid>
      </Grid> */}
    </Container>
  );
};

export default Home;
