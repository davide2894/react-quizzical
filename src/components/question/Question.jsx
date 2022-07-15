import {useState} from "react";
import { decode } from "html-entities";
import { useEffect } from "react";


function Question(props) {

    const [ choices, setChoices ] = useState([]);
    const { isCorrectAnswer, setIsCorrectAnsert } = useState(false);

    const { questionObject } = props;
    
    console.log(questionObject.question);

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

    function prepareAnswers() {
        var shuffledAnswers = [];
        questionObject.incorrect_answers.forEach(incorrectAnswer => {
            shuffledAnswers.push(incorrectAnswer);
        });
        shuffledAnswers.push(questionObject.correct_answer);
        shuffleArray(shuffledAnswers);
        console.log(shuffledAnswers);
        return shuffledAnswers;
    }

    useEffect(() => {
        setChoices(prepareAnswers());
    },[])

    return (
        <div className="question">
            <h2>{decode(questionObject.question)}</h2>
            <br></br>
            <br></br>
            <br></br>
            <ul className="choices">
                {choices && choices.forEach(choice => <li className="choice">{choice}</li>)}
            </ul>
        </div>
    )
}

export default Question