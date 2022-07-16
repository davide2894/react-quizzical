import React from "react"
import { Link } from "react-router-dom"

function Result(props) {
  return (
    <div className="result">
        <p className="result__score">You scored {props.numberOfCorrectAnswers}/{props.totalQuestions} correct answers</p>
        <Link to="/">Play Again</Link>
    </div>
  )
}

export default Result;