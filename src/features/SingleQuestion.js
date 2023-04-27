import { answerSelected, getGameStage } from "./questionsSlice"
import { useDispatch, useSelector } from "react-redux"

const SingleQuestion = ({ question }) => {
    const dispatch = useDispatch()
    const gameStage = useSelector(getGameStage)
    const answers = question.answers.map(answer => {
        const classes = () => {
            if (gameStage === 'questions' && answer.isSelected) {
                return 'selected'
            }
            if (gameStage === 'results') {
                if (answer.isSelected && !answer.isCorrect) {
                    return 'wrong'
                } else if (answer.isCorrect) {
                    return 'correct'
                } else {
                    return 'faded'
                }
            }
        }
        return (
            <button
                onClick={() => {
                    if (gameStage === 'questions') {
                        dispatch(answerSelected({ answerId: answer.answerId, questionId: question.id }))
                    }
                }}
                className={classes()}
                key={answer.answerId}
                disabled={gameStage == 'results'}
            >
                {answer.answer}
            </button>
        )
    })
    return (
        <div className="question-wrapper">
            <h2 className="question-question">{question.question}</h2>
            <div className="question-answers-wrapper">
                {answers}
            </div>
        </div>
    )
}

export default SingleQuestion