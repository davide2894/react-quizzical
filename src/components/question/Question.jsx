import {useState} from "react";
import { useEffect } from "react";
import { nanoid } from "nanoid";


function Question(props) {

    const { questionObject } = props;
    
    const [question, setQuestion] = useState({
        question: "",
        choices: [],
        isAnsweredCorrectly: false,
    });
    
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

    function prepareChoices() {
        let arr = [];
        
        questionObject.incorrect_answers.forEach(incorrectAnswer => {
            arr.push({choice: incorrectAnswer, isCorrectChoice: false});
        });
        
        arr.push({choice: questionObject.correct_answer, isCorrectChoice: true});

        shuffleArray(arr);

        return arr;
    }

    useEffect(() => {
        questionObject && setQuestion(oldQuestion => {
            console.log(questionObject);
            return {
                ...oldQuestion,
                question: questionObject.question,
                choices: prepareChoices(),    
            }
        });
    }, [questionObject]);

    return (
        <div className="question">
            <h2>{question && question.question}</h2>
            <br></br>
            <br></br>
            <br></br>
            <div className="choices">
                {question && question.choices.map(choice => {
                    return <li key={nanoid()}>{choice.choice}</li>
                })}
            </div>
        </div>
    )
}

export default Question