import axios from "axios";

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const getTriviaQuestions = async () => {
  const resp = await axios.get("https://the-trivia-api.com/v2/questions/");
  const triviaData = await resp.data;
  const triviaQuestions = await triviaData.map((t) => {
    return {
      question: t.question.text,
      choices: shuffle([t.correctAnswer, ...t.incorrectAnswers]),
      answer: t.correctAnswer,
    };
  });

  return triviaQuestions;
};
