import { Link } from "react-router-dom";
import "./Result.scss";

function Result(props) {
  return (
    <div className="result">
        <p className="result__score">You scored {props.numberOfCorrectAnswers}/{props.totalQuestions} correct answers</p>
        <Link className="result__button" to="/">Play Again</Link>
    </div>
  )
}

export default Result;