import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
//Components
import Navbar from "./components/Navbar";
//Pages
import StudentSignup from "./pages/StudentSignup";
import StudentSignin from "./pages/StudentSignin";
import TeacherSignup from "./pages/TeacherSignup";
import TeacherSignin from "./pages/TeacherSignin";
import CreateExam from "./pages/CreateExam";
import GetFoilSheet from "./pages/GetFoilSheet";
import Exam from "./pages/Exam";
import Home from "./pages/Home";
import Error from "./pages/Error";
import GetExamCode from "./pages/GetExamCode";
import TeacherResult from "./pages/TeacherResult";
import StudentResults from "./pages/StudentResults";
import StudentResult from "./pages/StudentResult";
import Exams from "./pages/Exams";
import MyAlert from "./components/Alert";
import Signout from "./pages/Signout";

const theme = createTheme({
  typography: {
    fontFamily: "Catamaran",
    fontWeight: 300,
  },
});

const useStyles = makeStyles((theme) => ({
  dummyNav: {
    ...theme.mixins.toolbar,
    marginBottom: 20,
  },
}));

function App() {
  const classes = useStyles();
  const user = useSelector((state) => state.user.currentUser);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div className={classes.dummyNav}></div>
        <div className="content">
          <Container>
            <MyAlert />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/student/signup" component={StudentSignup} />
              <Route exact path="/student/signin" component={StudentSignin} />
              <Route exact path="/student/examcode" component={GetExamCode} />
              <Route exact path="/student/exam/:id" component={Exam} />
              <Route exact path="/student/results" component={StudentResults} />
              <Route
                exact
                path="/student/results/:examId"
                component={StudentResult}
              />

              <Route exact path="/teacher/signup" component={TeacherSignup} />
              <Route exact path="/teacher/signin" component={TeacherSignin} />
              <Route exact path="/teacher/create" component={CreateExam} />
              <Route exact path="/teacher/results" component={GetFoilSheet} />
              <Route exact path="/teacher/exams" component={Exams} />
              <Route
                exact
                path="/teacher/results/:examId/:studentId"
                component={TeacherResult}
              />

              <Route
                exact
                path="/signout"
                render={() => (user ? <Signout /> : <Redirect to="/" />)}
              />
              <Route path="*" component={Error} />
            </Switch>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
