import React from "react";
import Card from "../../shared/Card";

import './Trivia.css'



const Answers = ({ onClose, results, data }) => {
  return (
    <Card>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <strong>YOUR ANSWERS</strong>
          <hr/>
          <button className="delete" onClick={onClose}></button>
        </header>
        <section className="modal-card-body content">
          <ul>
            {results.map((result, i) => (
              <li key={i} className="mb-6">
                <p>
                  <strong>{i+1}.  {result.q}</strong>
                </p>
                <p
                  className={
                    result.a === data[i].answer
                      ? "correct-ans"
                      : "incorrect-ans"
                  }
                >
                  Your answer: {result.a}
                </p>
                {result.a !== data[i].answer && (
                  <p className="correct-ans" style={{color:'white', backgroundColor:'green'}}>
                    Correct answer: {data[i].answer}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Card>
  );
};

export default Answers;
