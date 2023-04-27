import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { decodeString, shuffle } from "../utils";
import { nanoid } from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    questions: [],
    error: null,
    gameStage: 'options', // 'options' 'questions' 'results'
    numCorrect: 0
}

export const fetchQuestions = createAsyncThunk(
    'questions/fetchQuestions',
    async ({ numberQuestions, category, difficulty, type }) => {
        const response = await axios.get(`https://opentdb.com/api.php?amount=${numberQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`)
        return response.data
    }
)

export const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        gameStageChanged: (state, action) => {
            state.gameStage = action.payload
        },
        answerSelected: (state, action) => {
            const { answerId, questionId } = action.payload
            let currentQuestion = state.questions.filter(question => question.id === questionId)[0]
            let newAnswers = currentQuestion.answers.map(answer => {
                if (answer.answerId === answerId) {
                    return {
                        ...answer,
                        isSelected: !answer.isSelected
                    }
                } else {
                    return { ...answer, isSelected: false }
                }
            })
            state.questions = state.questions.map(question => {
                if (question.id === questionId) {
                    return {
                        ...question,
                        answers: newAnswers
                    }
                } else {
                    return { ...question }
                }
            })
        },
        numCorrectUpdated: (state, action) => {
            state.numCorrect = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.numCorrect = 0
                const data = action.payload.results

                state.questions = data.map(entity => {
                    let answers = entity.incorrect_answers.map(answer => (
                        {
                            answer: decodeString(answer),
                            isCorrect: false,
                            isSelected: false,
                            answerId: nanoid()
                        }))
                    answers.push(
                        {
                            answer: decodeString(entity.correct_answer),
                            isCorrect: true,
                            isSelected: false,
                            answerId: nanoid()
                        })

                    return {
                        question: decodeString(entity.question),
                        answers: shuffle(answers),
                        id: nanoid()
                    }
                })
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload
            })
    }
})

export const { gameStageChanged, answerSelected, numCorrectUpdated } = questionsSlice.actions

export const getQuestions = (state) => state.questions.questions
export const getStatus = (state) => state.questions.status
export const getError = (state) => state.questions.error
export const getGameStage = (state) => state.questions.gameStage
export const getNumCorrect = (state) => state.questions.numCorrect
