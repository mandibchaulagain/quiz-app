import React, { useState } from 'react';
import './Homepage.css';

const Homepage = ({ handleSportQuiz, handleComputerQuiz }) => {
  return (
    <div className='homepage-container'>
    <div className='introbhai'>
      <h1>Welcome to the Quiz App!</h1>
      </div>
      <div className="intro2"><p>Choose the type of questions you want to answer:</p></div>
      <div className='button-container'>
        <button onClick={handleSportQuiz}>Sport Questions</button>
        <button onClick={handleComputerQuiz}>Computer Questions</button>
      </div>
    </div>
  );
};

export default Homepage;
