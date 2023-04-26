import React from 'react';
import './App.css';
import QuestionsList from './features/QuestionsList';
import QuestionsForm from './features/QuestionsForm';
import { nanoid } from '@reduxjs/toolkit';
import { getGameStage } from './features/questionsSlice';
import { useSelector } from 'react-redux';

function App() {

  const gameStage = useSelector(getGameStage)
  return (
    <>
      {gameStage == 'options' && <QuestionsForm />}
      {gameStage == 'questions' && <QuestionsList key={nanoid()} />}
    </>
  );
}

export default App;
