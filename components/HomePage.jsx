import React, { useState } from 'react';

const categories = [
  { name: 'Animals', value: '&category=27' },
  { name: 'History', value: '&category=23' },
  { name: 'Politics', value: '&category=24' },
  { name: 'Computers', value: '&category=18' },
  { name: 'General Knowledge', value: '&category=9' }
];

const difficulty = [
  { name: 'Easy', value: '&difficulty=easy' },
  { name: 'Medium', value: '&difficulty=medium' },
  { name: 'Hard', value: '&difficulty=hard' }

];
const numberQuestions = [
  { name: '5', value: '5' },
  { name: '10', value: '10' },
  { name: '15', value: '15' },


]

function HomePage({ startQuiz, handleCategory, handleDifficulty, handleQuestions }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedNumberQuestions, setSelectedNumberQuestions] = useState(null);

  const handleNumberQuestions = (numberQuestions) => {
    setSelectedNumberQuestions(numberQuestions);
    handleQuestions(numberQuestions)
  }

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    handleCategory(category)
  };
  const handleDifficultySelection = (difficulty) => {
    setSelectedDifficulty(difficulty);
    handleDifficulty(difficulty)
  }

  return (
    <div className="homePage--container">
      <h1>Quizzical</h1>
      <h4>Show me what you got!</h4>
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => handleCategorySelection(category.value)}
            className={`categories--btn ${selectedCategory === category.value ? 'selected' : ''}`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className='difficulty'>
        {difficulty.map((difficulty) =>
          <button
            key={difficulty.value}
            onClick={() => handleDifficultySelection(difficulty.value)}
            className={`difficulty--btn ${selectedDifficulty === difficulty.value ? 'selected' : ''} `}>
            {difficulty.name}
          </button>
        )}
      </div>
      <div className='numberQuestions'>
        {numberQuestions.map((numberQuestions) => (
          <button
            key={numberQuestions.value}
            onClick={() => handleNumberQuestions(numberQuestions.value)}
            className={`numberQuestions--btn difficulty-$ ${selectedNumberQuestions === numberQuestions.value ? 'selected' : ""}`}>
            {numberQuestions.name}
          </button>
        ))}
      </div>


      <button className="homePage--btn" onClick={startQuiz}>
        Start Quiz
      </button>
    </div>
  );
}

export default HomePage;
