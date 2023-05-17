import { useState } from 'react'
import Trivia from '../components/Trivia'
import HomePage from '../components/HomePage'

function App() {
  const [showQuiz, setShowQuiz] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedNumberQuestions, setSelectedNumberQuestions] = useState(null);

  const handleQuestions = (numberQuestions) => {
    setSelectedNumberQuestions(numberQuestions)
  }


  const handleCategory = (category) => {
    setSelectedCategory(category);
  };
  const handleDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty)
  }


  const startQuiz = () => {
    if (selectedCategory && selectedDifficulty && selectedNumberQuestions) {
      setShowQuiz(true);
    } else {
      alert('Please select all options before starting the quiz.');
    }
  };

  return (
    <div>
      {!showQuiz && (
        <HomePage
          startQuiz={startQuiz}
          handleCategory={handleCategory}
          handleDifficulty={handleDifficulty}
          handleQuestions={handleQuestions}
        />
      )}
      {showQuiz && (
        <Trivia
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          selectedNumberQuestions={selectedNumberQuestions}
        />
      )}
    </div>
  );
}

export default App;