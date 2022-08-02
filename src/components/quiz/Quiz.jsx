import { nanoid } from "nanoid";
import { useEffect } from "react";
import {useState} from "react";
import { mapQuestionsFromApi } from "../../utilities/utility"
import Question from "../question/Question";
import Result from "../result/Result";
import "./Quiz.scss";

function Quiz() {

const [ questions, setQuestions ] = useState([]);
const [ showResult, setShowResult ] = useState(false);

function questionClickHanlder(evt, answeredQuestionId, selectedChoice){
    setQuestions(oldQuestions => {
        return oldQuestions.map(oldQuestion => {
          if(oldQuestion.id === answeredQuestionId){
            return {
              ...oldQuestion,
              choices: oldQuestion.choices.map(oldChoice => {
                  if(oldChoice.id === selectedChoice.id) {
                      return {
                          ...oldChoice,
                          selcted: true,
                      }
                  } else {
                      return {
                          ...oldChoice,
                          selcted: false,
                      };
                  }
              }),
              isAnswered: true,
              isAnsweredCorrectly: selectedChoice.isCorrectChoice
            };
          } else {
            return oldQuestion;
          }
        })
    })
  }

  function showResultsHanlder(){
    setShowResult(true);
  }

  function getNumberOfCorrectAnswers() {
    return questions.filter(question => question.isAnsweredCorrectly).length;
  }

  function shouldShowResult() {
    if(questions.length) {
      if(!showResult & questions.every(question => question.isAnswered)) {
        return true;
      } else {
        return false;
      }
    }
  }

  var quizClassNames=`quiz${showResult ? " quiz--complete" : ""}`;

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      throw response;
    })
    .then(questionsData => {
      setQuestions(mapQuestionsFromApi(questionsData));
    })
    .catch(err => {
      console.log("error: ", err);
    })
  }, [])

  return (
    <div className={quizClassNames}>
      {questions && questions.map(question => 
        <Question 
          key={nanoid()} 
          id={nanoid()} 
          questionProp={question} 
          showResultProp={showResult} 
          onClickHanlder={questionClickHanlder}
          disabledProp={showResult}
        />)
      }
      
      {shouldShowResult() && <button className="quiz__checkAnswersBtn" onClick={showResultsHanlder}>Check answers</button>}

      {showResult && 
        <Result 
          numberOfCorrectAnswers={getNumberOfCorrectAnswers}
          totalQuestions={questions.length}
        /> 
      }
    </div>    
  )
}

export default Quiz