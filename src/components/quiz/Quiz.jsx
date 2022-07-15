import { nanoid } from "nanoid";
import { useEffect } from "react";
import {useState} from "react";
import Question from "../question/Question";

function Quiz() {

  const [ questions, setQuestions ] = useState([]);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      throw response;
    })
    .then(questionsData => {
      setQuestions(questionsData.results);
    })
    .catch(err => {
      console.log("error: ", err);
    })
  }, [])

  console.log(questions);


  return (
    <div className='quiz'>
      <div>Questions</div>
      {questions.map(question => {
        return <Question key={nanoid()} questionObject={question} />
      })}
    </div>    
  )
}

export default Quiz