import {useState} from "react";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import "./Question.scss";


function Question(props) {

    const { questionObject, shouldReveal } = props;
    
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
                choice: questionObject.correct_answer, 
                isSelected: false,
                isCorrectChoice: true,
                id: nanoid(),
            }
        );

        shuffleArray(arr);

        return arr;
    }

    useEffect(() => {
        questionObject && setQuestion(oldQuestion => {
            return {
                ...oldQuestion,
                question: questionObject.question,
                choices: prepareChoices(),    
            }
        });
    }, [questionObject]);


    function choiceClickHanlder(selectedChoice) {
        console.log(selectedChoice);
        setQuestion(oldQuestion => {
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
                }) 
            };
        })
    }

    return (
        <div className="question">
            <h2>{question && question.question}</h2>
            <br></br>
            <br></br>
            <br></br>
            <ul className="choices">
                {question && question.choices.map(choice => {
                    return <li className={
                                `choice 
                                ${choice.selcted ? "choice__selected" : ""}
                                ${shouldReveal && choice.isCorrectChoice ? "choice__selected--correct" : ""}
                               `} 
                               onClick={() => choiceClickHanlder(choice)} 
                               key={nanoid()}>{choice.choice}
                            </li>
                })}
            </ul>
        </div>
    )
}

export default Question