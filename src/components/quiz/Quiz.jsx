import { nanoid } from "nanoid";
import { useEffect } from "react";
import {useState} from "react";
import Question from "../question/Question";

function Quiz() {

  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      throw response;
    })
    .then(data => {
      console.log(data.results);
      return setQuizQuestions(data.results);
    })
    .catch(err => {
      console.log("error: ", err);
    })
  }, [])

  useEffect(() => {
    console.log(quizQuestions);
  }, [quizQuestions]);

  return (
    <div className='quiz'>
      <div>Quiz</div>
      {quizQuestions.map(question => {
        console.log(question.question);
        return <Question key={nanoid()} questionData={question} />
      })}
    </div>    
  )
}

export default Quiz