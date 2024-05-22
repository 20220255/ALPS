import React, { useEffect, useState } from "react";
import { getTriviaQuestions } from "./TriviaQuestions";
import Start from "./components/Start";
import Question from "./components/Question";
import End from "./components/End";
import Answers from "./components/Answers";


let interval;

const TriviaApp = () => {
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(0);
  const [triviaData, setTriviaData] = useState([{}]);

  useEffect(() => {
    if (step === 3) {
      clearInterval(interval);
    }
  }, [step]);

  const quizStartHandler = async () => {
    const triviaData = await getTriviaQuestions();

    setTriviaData(triviaData);
    console.log(triviaData)
    setStep(2);
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const resetClickHandler = async () => {
    const triviaData = await getTriviaQuestions();
    setTriviaData(triviaData);
    setShowModal(false)
    setActiveQuestion(0);
    setAnswers([]);
    setStep(2);
    setTime(0);
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  return (
    <>
      {step === 1 && <Start onQuizStart={quizStartHandler} />}
      {step === 2 && (
        <Question
          data={triviaData[activeQuestion]}
          onAnswerUpdate={setAnswers}
          numberOfQuestions={triviaData.length}
          activeQuestion={activeQuestion}
          onSetActiveQuestion={setActiveQuestion}
          onSetStep={setStep}
        />
      )}
      {step === 3 && (
        <End
          results={answers}
          data={triviaData}
          onReset={resetClickHandler}
          onAnswersCheck={() => setShowModal(true)}
          time={time}
        />
      )}


      {showModal && (
        <Answers
          onClose={() => setShowModal(false)}
          results={answers}
          //   data={quizData.data}
          data={triviaData}
        />
      )}


    </>
  );
};

export default TriviaApp;
