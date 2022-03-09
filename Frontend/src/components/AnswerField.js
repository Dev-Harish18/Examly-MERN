import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const AnswerField = ({ idx, answers, setAnswers }) => {
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    //Adding to answers array
    setAnswers([...answers.slice(0, idx), answer, ...answers.slice(idx + 1)]);
  }, [answer]);

  const changeHandler = (e) => setAnswer(e.target.value);
  return (
    <Grid item>
      <TextField
        variant="outlined"
        color="primary"
        onChange={changeHandler}
        rows={6}
        multiline
        fullWidth>
        {answer}
      </TextField>
    </Grid>
  );
};

export default AnswerField;
