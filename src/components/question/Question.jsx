import { nanoid } from "nanoid";
import "./Question.scss";


function Question(props) {

    const { questionProp, showResultProp, disabledProp } = props;

    function assignAnswerClass(isCorrectChoice) {
        return isCorrectChoice ? "choice__selected--correct" : "choice__selected--wrong";
    }

    return (
        <div className={`question${disabledProp ? " question--disabled" : ""}`}>
            <h2 className="question__text">{questionProp && questionProp.question}</h2>
            <ul className="question__choices choices">
                {questionProp && questionProp.choices.map(choice => {
                    return <li className={
                                `choice 
                                ${choice.selcted ? "choice__selected" : ""}
                                ${(showResultProp & choice.selcted) && assignAnswerClass(choice.isCorrectChoice)}
                               `} 
                               key={nanoid()}
                               onClick={(evt) => props.onClickHanlder(evt, questionProp.id, choice)}
                            >{choice.choice}
                            </li>
                })}
            </ul>
            <hr className="question__hr"></hr>
        </div>
    )
}

export default Question