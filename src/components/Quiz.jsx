import { useCallback, useRef, useState } from "react";
import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTION from "../questions";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const shuffledAnswers = useRef();
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
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...QUESTION[activeQuestionIndex].answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }
  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTION[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.current.map((answer) => {
            let cssClass = "";
            if (userAnswers[userAnswers.length - 1] === answer) {
              if (answerState === "answered") {
                cssClass = "selected";
              } else if (answerState === "wrong" || answerState === "correct") {
                cssClass = answerState;
              }
            }
            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
