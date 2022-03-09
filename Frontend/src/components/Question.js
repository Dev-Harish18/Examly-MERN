import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    width: "90%",
  },
  input: {
    color: theme.palette.primary.main,
    width: "100%",
  },
  question: {
    width: "100%",
    padding: 20,
    [theme.breakpoints.down(400)]: {
      width: "100%",
    },
  },
}));

const Question = ({ id, setQuestions, questions, initial }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({ ...initial, id });

  useEffect(() => {
    //Adding to questions array
    let idx = questions.findIndex((q) => q.id === id);

    if (idx !== -1) {
      setQuestions([
        ...questions.slice(0, idx),
        formData,
        ...questions.slice(idx + 1),
      ]);
    }
  }, [formData]);

  //Handle change
  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //handle delete
  const handleDelete = () => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <Grid
      item
      container
      spacing={2}
      className={classes.question}
      alignItems="center"
      justify="center">
      <Grid item xs={12}>
        <TextField
          required
          className={classes.input}
          name="name"
          onChange={changeHandler}
          variant="standard"
          type="text"
          fullWidth
          multiline
          autoFocus
          color="primary"
          label="Question"
          value={formData.name}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          className={classes.input}
          name="maxMarks"
          onChange={changeHandler}
          variant="standard"
          type="text"
          fullWidth
          autoFocus
          color="primary"
          label="Total Marks for the question"
          value={formData.maxMarks}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          className={classes.input}
          name="modelAns"
          onChange={changeHandler}
          variant="standard"
          type="text"
          multiline
          fullWidth
          autoFocus
          color="primary"
          label="Model answer for the question"
          value={formData.modelAns}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          className={classes.input}
          name="keywords"
          onChange={changeHandler}
          variant="standard"
          type="text"
          fullWidth
          multiline
          autoFocus
          color="primary"
          label="Keywords ( seperate by ',' )"
          value={formData.keywords}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          className={classes.input}
          name="minLength"
          onChange={changeHandler}
          variant="standard"
          type="text"
          fullWidth
          autoFocus
          color="primary"
          label="Minimum length for the answer"
          value={formData.minLength}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          className={classes.input}
          name="maxLength"
          onChange={changeHandler}
          variant="standard"
          type="text"
          fullWidth
          autoFocus
          color="primary"
          label="Maximum length for the answer"
          value={formData.maxLength}
        />
      </Grid>

      <Grid item style={{ textAlign: "right", marginLeft: "auto" }}>
        <Tooltip title="Delete Question" aria-label="delete">
          <Fab color="primary" onClick={handleDelete} className={classes.fab}>
            <DeleteIcon />
          </Fab>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default Question;
