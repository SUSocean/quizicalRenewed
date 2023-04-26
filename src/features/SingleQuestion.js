import { answerSelected } from "./questionsSlice"
import { useDispatch } from "react-redux"

const SingleQuestion = ({ question }) => {
    const dispatch = useDispatch()
    // console.log(question)
    const answers = question.answers.map(answer => (
        <span
            onClick={() => dispatch(answerSelected({ answerId: answer.answerId, questionId: question.id }))}
            className={answer.isSelected ? 'selected' : ''}
            key={answer.answerId}
        >
            {answer.answer}
        </span>
    ))
    return (
        <div className="question-wrapper">
            <h3 className="question-question">{question.question}</h3>
            <div className="question-answers-wrapper">
                {answers}
            </div>
        </div>
    )
}

export default SingleQuestion