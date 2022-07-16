import { nanoid } from "nanoid";
import { useEffect } from "react";
import {useState} from "react";
import Question from "../question/Question";
import { decode } from "html-entities";


function Quiz() {

  const [ questions, setQuestions ] = useState([]);
  const [ shouldReveal, setShouldReveal ] = useState(false);

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

  function mapQuestionsFromApi(questionsData) {
    const questionsFromApi = questionsData.results;
    const mappedQuestions = [];

    questionsFromApi.forEach(questionFromApi => {
      console.log(questionFromApi);
      
      const decodedQuestion = getDecodeString(questionFromApi.question);
      const decodedIncorrectAnswers = questionFromApi.incorrect_answers.forEach(incorrectAnswer => {
        incorrectAnswer = getDecodeString(incorrectAnswer);
      })
      const decodedCorrectAnswer = questionFromApi.correct_answer = getDecodeString(questionFromApi.correct_answer);
      
      mappedQuestions.push({
        question: decodedQuestion,
        choices: prepareChoices({decodedIncorrectAnswers, decodedCorrectAnswer}),
        isAnsweredCorrectly: false,
      })
    })
  }

  function getDecodeString(str) {
    return decode(str);
  }

  function prepareChoices(choicesObject) {
    let arr = [];
    
    choicesObject.decodedIncorrectAnswers.forEach(incorrectAnswer => {
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
            choice: choicesObject.decodedCorrectAnswer, 
            isSelected: false,
            isCorrectChoice: true,
            id: nanoid(),
        }
    );

    shuffleArray(arr);

    return arr;
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
      let mappedQuestions = mapQuestionsFromApi(questionsData);
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
      {questions && <Question key={nanoid()} questionObject={questions[0]} shouldReveal={shouldReveal} />}

      {/* {shouldRevealResults && <Result numberOfCorrectAnswers={numberOfCorrectAnswers} totalQuestions={questions.length}  />} */}
      
      {/* {isAllSelected && <button onClick={showResultsHanlder}>CheckAnswers</button>} */}
    </div>    
  )
}

export default Quiz