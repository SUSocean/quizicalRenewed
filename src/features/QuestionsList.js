import { getQuestions, getStatus, getError } from "./questionsSlice"
import { useDispatch, useSelector } from "react-redux"
import SingleQuestion from "./SingleQuestion"
const QuestionsList = () => {
    const questions = useSelector(getQuestions)
    const status = useSelector(getStatus)
    const error = useSelector(getError)
    console.log('questions', questions)

    let content
    if (status === 'pending') {
        content = <p>Loading..</p>
    }
    if (status === 'fulfilled') {
        content = questions.map(question =>
            <SingleQuestion question={question} key={question.id} />)
    }
    if (status === 'rejected') {
        content = <p>error</p>
    }
    return (
        <>
            {content}
        </>
    )
}

export default QuestionsList