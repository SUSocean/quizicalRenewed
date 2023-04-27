import { useState } from "react"
import { categoryDecoder, capitalizeFirstLetter } from "../utils"
import { useDispatch } from "react-redux"
import { fetchQuestions, gameStageChanged } from "./questionsSlice"
const QuestionsForm = () => {

    const dispatch = useDispatch()
    const handleStart = () => {
        dispatch(fetchQuestions({ numberQuestions, category, difficulty, type }))
        dispatch(gameStageChanged('questions'))
    }

    const [selectedInput, setSelectedInput] = useState(null)
    const [numberQuestions, setNumberQuestions] = useState(5)
    const [category, setCategory] = useState('')
    const [difficulty, setDifficulty] = useState('easy')
    const [type, setType] = useState('')
    return (
        <div className="form-wrapper">
            <h2 className="form-title">Quizzical</h2>
            <h3 className="form-header">Select your quiz options</h3>
            <span className="form-helper">click to change</span>
            <div className="form-options">

                <button className="form-category"
                    onClick={() => setSelectedInput('number')}
                >
                    <span className="form-category-name">Number of Questions:
                    </span>
                    <span className="form-category-user-choise">{numberQuestions}</span>
                </button>
                <button className="form-category"
                    onClick={() => setSelectedInput('category')}>
                    <span className="form-category-name">
                        Category:
                    </span>
                    <span className="form-category-user-choise">{categoryDecoder(category)}</span>
                </button>
                <button className="form-category"
                    onClick={() => setSelectedInput('difficulty')}
                >
                    <span className="form-category-name">
                        Difficulty:
                    </span>
                    <span className="form-category-user-choise">{capitalizeFirstLetter(difficulty)}</span>
                </button>
                <button className="form-category"
                    onClick={() => setSelectedInput('type')}>
                    <span className="form-category-name">
                        Questions Type:
                    </span>
                    <span className="form-category-user-choise">
                        {
                            type === 'boolean' ? 'True / False'
                                : type === 'multiple' ? 'Multiple Choice'
                                    : 'Any type'
                        }
                    </span>
                </button>
            </div>
            <button className="form-start-btn"
                onClick={() => handleStart()}
            >
                Start Quiz
            </button>
            {selectedInput === 'number' &&

                <div className="form-user-input-wrapper">
                    <p className="form-user-input-info">{numberQuestions}</p>
                    <input
                        className="form-user-input-range"
                        type="range"
                        min='3'
                        max='10'
                        value={numberQuestions}
                        onChange={(e) => setNumberQuestions(e.target.value)}
                        onInput={(e) => setNumberQuestions(e.target.value)}
                        step='1'
                        onBlur={(e) => setSelectedInput(null)}
                    />
                    <button className="form-user-input-close-btn"
                        onClick={(e) => setSelectedInput(null)}>close</button>
                </div>}

            {selectedInput === 'category' &&

                <div className="form-user-input-wrapper">
                    <p className="form-user-input-info">{categoryDecoder(category)}</p>
                    <select
                        onChange={(e) => {
                            setCategory(e.target.value)
                        }}
                        onBlur={(e) => setSelectedInput(null)}
                        className="form-user-input-select"
                        value={category}
                    >
                        <option value=''>Any Category</option>
                        <option value='9'>General Knowledge</option>
                        <option value='10'>Books</option>
                        <option value='11'>Films</option>
                        <option value='12'>Music</option>
                        <option value='13'>Musicals & Theaters</option>
                        <option value='14'>Television</option>
                        <option value='15'>Video Games</option>
                        <option value='16'>Board Games</option>
                        <option value='17'>Science & Nature</option>
                        <option value='18'>Computers</option>
                        <option value='19'>Mathematics</option>
                        <option value='20'>Mythology</option>
                        <option value='21'>Sports</option>
                        <option value='22'>Geography</option>
                        <option value='23'>History</option>
                        <option value='24'>Politics</option>
                        <option value='25'>Art</option>
                        <option value='26'>Celebrities</option>
                        <option value='27'>Animals</option>
                    </select>
                    <button className="form-user-input-close-btn"
                        onClick={(e) => setSelectedInput(null)}>close</button>
                </div>}

            {selectedInput === 'difficulty' &&

                <div className="form-user-input-wrapper">
                    <p className="form-user-input-info">{capitalizeFirstLetter(difficulty)}</p>
                    <select
                        onChange={(e) => {
                            setDifficulty(e.target.value)
                        }}
                        onBlur={(e) => setSelectedInput(null)}
                        className="form-user-input-select"
                        value={difficulty}
                    >
                        <option value='easy'>Easy</option>
                        <option value='medium'>Medium</option>
                        <option value='hard'>Hard</option>
                    </select>
                    <button className="form-user-input-close-btn"
                        onClick={(e) => setSelectedInput(null)}>close</button>
                </div>}

            {selectedInput === 'type' &&

                <div className="form-user-input-wrapper">
                    <p className="form-user-input-info">{
                        type === 'boolean' ? 'True / False'
                            : type === 'multiple' ? 'Multiple Choice'
                                : 'Any type'
                    }</p>
                    <select
                        onChange={(e) => {
                            setType(e.target.value)
                        }}
                        onBlur={(e) => setSelectedInput(null)}
                        className="form-user-input-select"
                        value={type}
                    >
                        <option value=''>Any Type</option>
                        <option value='multiple'>Multiple Choice</option>
                        <option value='boolean'>True / False</option>
                    </select>
                    <button className="form-user-input-close-btn"
                        onClick={(e) => setSelectedInput(null)}>close</button>
                </div>}
        </div>
    )
}

export default QuestionsForm