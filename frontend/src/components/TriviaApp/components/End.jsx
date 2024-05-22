import React, { useEffect, useState } from "react";
import { formatTime } from "../utils";
import Card from "../../shared/Card";

const End = ({ results, data, onReset, onAnswersCheck, time }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    let correct = 0;
    results.forEach((result, index) => {
      if (result.a === data[index].answer) {
        correct++;
      }
    });
    setCorrectAnswers(correct);
    // eslint-disable-next-line
  }, []);

  return (
    <Card>
        <div className="content">
          <h3>Your results</h3>
          <p>
            {correctAnswers} of {data.length}
          </p>
          <p>
            <strong>{Math.floor((correctAnswers / data.length) * 100)}%</strong>
          </p>
          <p>
            <strong>Your time:</strong> {formatTime(time)}
          </p>
          <div>
            <button className="btn-md-navy-2" style={{margin:'1rem'}} onClick={onAnswersCheck}>
              Check your answers
            </button>
            <button className="btn-md-navy-2" onClick={onReset}>
              Try again
            </button>
          </div>
        </div>
    </Card>
  );
};

export default End;
