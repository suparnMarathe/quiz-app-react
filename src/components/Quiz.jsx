import { useCallback, useState } from "react";
import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTION from "../questions";
import Question from "./Question";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTION.length;
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers((prevUserAnswer) => {
        return [...prevUserAnswer, selectedAnswer];
      });
      setTimeout(() => {
        console.log(activeQuestionIndex);
        console.log(selectedAnswer);
        if (selectedAnswer === QUESTION[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
          console.log(answerState);
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );
  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy image" />
        <h2>Quiz completed!</h2>
      </div>
    );
  }
  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        answers={QUESTION[activeQuestionIndex].answers}
        questionText={QUESTION[activeQuestionIndex].text}
        onSelectAnswer={handleSelectAnswer}
        handleSkipAnswer={handleSkipAnswer}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
      />
    </div>
  );
}
