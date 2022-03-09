import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/user/userActions";
import axios from "../axios";
import { v4 as uuidv4 } from "uuid";
import QuestionForm from "../components/QuestionForm";

const CreateExam = () => {
  return <QuestionForm title="Add Exam" initQuestions={[]} />;
};

export default CreateExam;
