import React, { useEffect, useState } from "react";
import he from "he";
import LoadingImage from "./Loading";

function Trivia({ selectedCategory, selectedDifficulty, selectedNumberQuestions }) {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkedAnswers, setCheckedAnswers] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  useEffect(() => {
    // Fetch the questions from the API
    fetch(`https://opentdb.com/api.php?amount=${selectedNumberQuestions}${selectedCategory}${selectedDifficulty}`)
      .then((response) => response.json())
      .then((data) => {
        const modifiedQuestions = data.results.map((question) => {
          const { correct_answer, incorrect_answers } = question;
          const allAnswers = [...incorrect_answers, correct_answer];

          // Shuffle the answers randomly
          const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

          return {
            ...question,
            answers: shuffledAnswers,
            isCorrect: correct_answer,
            selectedAnswerIndex: null,
          };
        });

        setQuestions(modifiedQuestions);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setIsLoading(false);
      });
  }, []);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    if (!checkedAnswers) {
      const updatedQuestions = questions.map((question, index) => {
        if (index === questionIndex) {
          return {
            ...question,
            selectedAnswerIndex: answerIndex,
          };
        }
        return question;
      });

      setQuestions(updatedQuestions);
    }
  };


  const checkAnswers = () => {
    const allAnswersSelected = questions.every((question) => question.selectedAnswerIndex !== null);
    if (allAnswersSelected) {
      setCheckedAnswers(true);
      setGameOver(true);
    } else {
      alert("Please answer all the questions before checking the answers")
    }
    let correct = 0;
    let incorrect = 0;
    questions.forEach((question) => {
      if (question.selectedAnswerIndex !== null) {
        const selectedAnswer = question.answers[question.selectedAnswerIndex];
        if (selectedAnswer === question.isCorrect) {
          correct++;
        } else {
          incorrect++;
        }
        setCorrectCount(correct);
        setIncorrectCount(incorrect);
      }

    })
  };

  function StartNewGame() {
    window.location.reload();

  }

  return (
    <div className="trivia--container">
      {isLoading ? (
        <LoadingImage />
      ) : (
        <>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <div className="questions">
                <h3>{he.decode(question.question)}</h3>
              </div>
              <div className="answers">
                {question.answers.map((answer, answerIndex) => {
                  const isAnswerSelected = question.selectedAnswerIndex === answerIndex;
                  const isAnswerCorrect = answer === question.isCorrect;
                  const isAnswerIncorrect = checkedAnswers && isAnswerSelected && !isAnswerCorrect;

                  let buttonClassName = "answers--btn";
                  if (isAnswerSelected && !checkedAnswers) {
                    buttonClassName += " selected";
                  } else if (checkedAnswers) {
                    if (isAnswerCorrect) {
                      buttonClassName += " correct";
                    } else if (isAnswerIncorrect) {
                      buttonClassName += " incorrect";
                    }
                  }

                  return (
                    <button
                      className={buttonClassName}
                      disabled={checkedAnswers}
                      onClick={() => handleAnswerSelect(questionIndex, answerIndex)}
                      key={answerIndex}
                    >
                      {he.decode(answer)}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {questions.length > 0 && (
            <div className="check">
              <button className="check--btn"
                onClick={gameOver ? StartNewGame : checkAnswers}>
                {gameOver ? "Start New Game" : "Check Answers"}
              </button>
              <div className="results">
                <h3 className="correct-answ">Correct Answers : {correctCount} </h3>
                <h3 className="incorrect-answ">Incorrect Answers : {incorrectCount}</h3>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Trivia;
