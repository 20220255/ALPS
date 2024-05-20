import React, { useEffect, useRef, useState } from "react";

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
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h2 className="mb-5">{data.question}</h2>

          <div className="control" ref={radiosWrapper}>
            {data.choices.map((choice, index) => (
              <div key={index} className="mb-2">
                <label
                  className="is-fullwidth button"
                  style={{
                    fontSize: "1.95rem",
                    backgroundColor: selected === choice && "pink",
                  }}
                >
                  <input
                    type="button"
                    name="answer"
                    value={choice}
                    onClick={changeHandler}
                    style={{ backgroundColor: "white" }}
                  />
                </label>
              </div>
            ))}
          </div>

          {error && <div className="has-text-danger">{error}</div>}
          <button
            className="button is-link is-medium is-fullwidth mt-4"
            onClick={nextClickHandler}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;