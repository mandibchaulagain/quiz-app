import React, { useState, useRef } from 'react';
import './Quiz.css';
import Homepage from './Homepage'; // Import the Homepage component
import { data } from '../../assets/data';
import { sportt } from '../../assets/sports';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(null); // Initialize with null
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [quizType, setQuizType] = useState(null); // State to track the type of quiz

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);
  const option_array = [Option1, Option2, Option3, Option4];

  const handleSportQuiz = () => {
    setQuizType('sport');
    setQuestion(sportt[index]);
  };

  const handleComputerQuiz = () => {
    setQuizType('computer');
    setQuestion(data[index]);
  };

  const checkAns = (e, ans) => {
    if (!lock) {
      const correctAns = quizType === 'sport' ? sportt[index].ans : data[index].ans;
      if (correctAns === ans) {
        e.target.classList.add('correct');
        setLock(true);
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add('wrong');
        setLock(true);
        option_array[correctAns - 1].current.classList.add('correct');
      }
    }
  };

  const next = () => {
    if (lock) {
      if (index === (quizType === 'sport' ? sportt.length - 1 : data.length - 1)) {
        setResult(true);
        return;
      }
      setIndex(prevIndex => prevIndex + 1);
      setQuestion(quizType === 'sport' ? sportt[index + 1] : data[index + 1]);
      setLock(false);
      option_array.forEach(option => {
        option.current.classList.remove('wrong');
        option.current.classList.remove('correct');
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(null);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className='container'>
      {question ? (
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={Option1} onClick={e => checkAns(e, 1)}>{question.option1}</li>
            <li ref={Option2} onClick={e => checkAns(e, 2)}>{question.option2}</li>
            <li ref={Option3} onClick={e => checkAns(e, 3)}>{question.option3}</li>
            <li ref={Option4} onClick={e => checkAns(e, 4)}>{question.option4}</li>
          </ul>
          <button onClick={next}>Next</button>
          <div className='index'>{index + 1} of {quizType === 'sport' ? sportt.length : data.length} questions</div>
        </>
      ) : (
        <Homepage handleSportQuiz={handleSportQuiz} handleComputerQuiz={handleComputerQuiz} />
      )}
      {result ? (
        <>
          <h2>You scored {score} out of {quizType === 'sport' ? sportt.length : data.length}</h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : null}
    </div>
  );
};

export default Quiz;
