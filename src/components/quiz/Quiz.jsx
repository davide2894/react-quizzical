import { nanoid } from "nanoid";
import { useEffect } from "react";
import {useState} from "react";
import Question from "../question/Question";
import { decode } from "html-entities";


function Quiz() {

  const [ questions, setQuestions ] = useState([]);

  function decodeQuestionsData(questionsData) {
    questionsData.forEach(question => {
      question.question = decode(question.question);
      question.incorrect_answers.forEach(incorrectAnswer => {
        incorrectAnswer = decode(incorrectAnswer);
      })
      question.correct_answer = decode(question.correct_answer);
    });

    return questionsData;
  }

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      throw response;
    })
    .then(questionsData => {
      const decodedQuestions = decodeQuestionsData(questionsData.results);
      setQuestions(decodedQuestions);
    })
    .catch(err => {
      console.log("error: ", err);
    })
  }, [])

  // TODO: 
  // print just one question to make things simpler
  // for some reason goes in error
  return (
    <div className='quiz'>
      <div>Questions</div>
      {questions && <Question key={nanoid()} questionObject={questions[0]} />}
    </div>    
  )
}

export default Quiz