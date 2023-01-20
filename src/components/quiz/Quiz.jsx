import { useEffect } from "react";
import {useState} from "react";
import { mapQuestionsFromApi } from "../../utilities/choices"
import Question from "../question/Question";
import Result from "../result/Result";
import "./Quiz.scss";

function Quiz() {
  
  const [ questions, setQuestions ] = useState([]);
  const [ showResult, setShowResult ] = useState(false);
  
  function questionClickHandler(evt, answeredQuestionId, selectedChoice){
    setQuestions(oldQuestions => {
      return oldQuestions.map(oldQuestion => {
        if(oldQuestion.id === answeredQuestionId){
          return {
            ...oldQuestion,
            choices: oldQuestion.choices.map(oldChoice => {
              if(oldChoice.id === selectedChoice.id) {
                return {
                  ...oldChoice,
                  selected: true,
                }
              } else {
                return {
                  ...oldChoice,
                  selected: false,
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
  
  function showResultsHandler(){
    setShowResult(true);
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
    {questions && questions.map((question, idx) => 
      <Question
      idxClass={idx.toString()} 
      key={idx} 
      id={idx} 
      questionProp={question} 
      showResultProp={showResult} 
      onClickHandler={questionClickHandler}
      disabledProp={showResult}
      />)
    }
    
    {shouldShowResult() && <button className="quiz__checkAnswersBtn" onClick={showResultsHandler}>Check answers</button>}
    
    {showResult && 
      <Result 
      numberOfCorrectAnswers={questions.filter(question => question.isAnsweredCorrectly).length}
      totalQuestions={questions.length}
      /> 
    }
    </div>    
    )
  }
  
  export default Quiz