import {
    getQuestions,
    getStatus,
    getError,
    getGameStage,
    gameStageChanged,
    getNumCorrect,
    numCorrectUpdated
} from "./questionsSlice"
import { useDispatch, useSelector } from "react-redux"
import SingleQuestion from "./SingleQuestion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'

const QuestionsList = () => {
    const dispatch = useDispatch()
    const questions = useSelector(getQuestions)
    const status = useSelector(getStatus)
    const error = useSelector(getError)
    const gameStage = useSelector(getGameStage)
    const numCorrect = useSelector(getNumCorrect)

    const handleSubmit = () => {
        if (gameStage === 'questions') {
            let count = 0
            dispatch(gameStageChanged('results'))
            questions.forEach(question => {
                question.answers.forEach(answer => {
                    if (answer.isSelected && answer.isCorrect) {
                        count++
                    }
                })
            })
            dispatch(numCorrectUpdated(count))
        }
        if (gameStage === 'results') {
            dispatch(gameStageChanged('options'))
        }
    }

    let content
    if (status === 'pending') {
        content = <div className="loading-status">
            <p className="loading-message">Getting your questions</p>
            <FontAwesomeIcon icon={faQuestion} flip className="loading-icon" />
        </div>
    }
    if (status === 'fulfilled') {
        content = questions.map(question =>
            <SingleQuestion question={question} key={question.id} />)
    }
    if (status === 'rejected') {
        content = <>
            <p>error</p>
            <span>{error}</span>
        </>
    }
    return (
        <>
            <div className="questions-list-wrapper">
                {content}
            </div>
            {gameStage === 'results' &&
                <div className="result-message"><span>You answered {numCorrect} of {questions.length} questions correctly</span></div>}
            {status === 'fulfilled' && <button className="submit-answers-btn" onClick={handleSubmit}>
                {gameStage === 'questions' ? 'Submit answers' : 'Take another quiz'}
            </button>}
        </>
    )
}

export default QuestionsList