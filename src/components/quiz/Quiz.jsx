import { nanoid } from "nanoid";
import { useEffect } from "react";
import {useState} from "react";
import Question from "../question/Question";
import { decode } from "html-entities";
import Result from "../result/Result";


function Quiz() {

  const [ questions, setQuestions ] = useState([]);
  const [ showResult, setShowResult ] = useState(false);

  function mapQuestionsFromApi(questionsData) {
    const questionsFromApi = questionsData.results;
    const mappedQuestions = [];

    questionsFromApi.forEach(questionFromApi => {      
      const decodedQuestion = getDecodeString(questionFromApi.question);
      const decodedIncorrectAnswers = questionFromApi.incorrect_answers.map(incorrectAnswer => {
        return getDecodeString(incorrectAnswer);
      })
      const decodedCorrectAnswer = questionFromApi.correct_answer = getDecodeString(questionFromApi.correct_answer);
      mappedQuestions.push({
        question: decodedQuestion,
        choices: prepareChoices(decodedIncorrectAnswers, decodedCorrectAnswer),
        isAnswered: false,
        isAnsweredCorrectly: false,
        id: nanoid()
      })
    })

    return mappedQuestions;
  }

  function getDecodeString(str) {
    return decode(str);
  }

  function prepareChoices(incorrectAnswers, correctAnswer) {
    let arr = [];

    incorrectAnswers.forEach(incorrectAnswer => {
        arr.push(
            {
                choice: incorrectAnswer, 
                isSelected: false,
                isCorrectChoice: false,
                id: nanoid(),
            });
        }
    );
    
    arr.push(
        {
            choice: correctAnswer, 
            isSelected: false,
            isCorrectChoice: true,
            id: nanoid(),
        }
    );

    shuffleArray(arr);

    return arr;
  }

  // using the Fisher-Yates algorith in combination with Math.Random()
  // see: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
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
      setQuestions(mapQuestionsFromApi(questionsData));
    })
    .catch(err => {
      console.log("error: ", err);
    })
  }, [])


  function questionClickHanlder(evt, answeredQuestionId, selectedChoice){
    console.log(questions.every(question => question.isAnswered));
    setQuestions(oldQuestions => {
        return oldQuestions.map(oldQuestion => {
          console.log(oldQuestion.id, answeredQuestionId);
          console.log(oldQuestion.id === answeredQuestionId);
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

  function  getNumberOfCorrectAnswers() {
    console.log(questions.filter(question => question.isAnsweredCorrectly).length);
  }


  //TODO
  //1. complete single question game logic:  
  // - if questions[0].isAnswered is true --> show "Check Answers" btn
  // - if "Check Answers" btn is clicked --> hide it and show Result element instead
  //2. extend the logic to multiple (5) questions
  //3. style app


  return (
    <div className='quiz'>
      <div>Questions</div>
      {questions && <Question key={nanoid()} id={nanoid()} questionProp={questions[0]} shouldReveal={false} onClickHanlder={questionClickHanlder}/>}
      {/* {showResult && <Result numberOfCorrectAnswers={getNumberOfCorrectAnswers} totalQuestions={questions.length}  />} */}
      {/* {questions[0].isAnswered & !showResult ? <button onClick={showResultsHanlder}>Check answers</button> : null} */}
    </div>    
  )
}

export default Quiz