import { useCallback, useState } from "react";
import QUESTIONS from "../question.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }, []);

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz completed!</h2>
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer} />
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
