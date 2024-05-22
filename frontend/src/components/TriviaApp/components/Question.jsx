import React, { useEffect, useRef, useState } from "react";
import Card from "../../shared/Card";

const Question = ({
  data,
  onAnswerUpdate,
  numberOfQuestions,
  activeQuestion,
  onSetActiveQuestion,
  onSetStep,
}) => {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const radiosWrapper = useRef();

  useEffect(() => {
    const findCheckedInput =
      radiosWrapper.current.querySelector("input:checked");
    if (findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [data]);

  const changeHandler = (e) => {
    setSelected(e.target.value);
    if (error) {
      setError("");
    }
  };

  const nextClickHandler = (e) => {
    if (selected === "") {
      return setError("Please select one option!");
    }
    onAnswerUpdate((prevState) => [
      ...prevState,
      { q: data.question, a: selected },
    ]);
    setSelected("");
    if (activeQuestion < numberOfQuestions - 1) {
      onSetActiveQuestion(activeQuestion + 1);
    } else {
      onSetStep(3);
    }
  };

  return (
    <Card>
      <h2 className="mb-5">{data.question}</h2>
      <div className="control" ref={radiosWrapper}>
        {data.choices.map((choice, index) => (
          <div key={index} className="mb-2">
            <input
              type="button"
              name="answer"
              value={choice}
              onClick={changeHandler}
              style={{
                backgroundColor: selected === choice ? "pink" : "white",
                width: "100%",
                borderStyle: "outset",
                marginBottom: "0.75rem",
                height: "3.25rem",
              }}
            />
          </div>
        ))}
      </div>

      {error && <div className="has-text-danger">{error}</div>}
      <button
        className="btn-md-navy-wide"
        style={{ marginTop: "1rem" }}
        onClick={nextClickHandler}
      >
        Next
      </button>
    </Card>
  );
};

export default Question;
