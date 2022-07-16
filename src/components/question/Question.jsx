import { nanoid } from "nanoid";
import "./Question.scss";


function Question(props) {

    const { questionProp, shouldReveal } = props;

    return (
        <div className="question">
            <h2>{questionProp && questionProp.question}</h2>
            <br></br>
            <br></br>
            <br></br>
            <ul className="choices">
                {questionProp && questionProp.choices.map(choice => {
                    return <li className={
                                `choice 
                                ${choice.selcted ? "choice__selected" : ""}
                                ${shouldReveal && choice.isCorrectChoice ? "choice__selected--correct" : ""}
                               `} 
                               key={nanoid()}
                               onClick={(evt) => props.onClickHanlder(evt, questionProp.id, choice)}
                            >{choice.choice}
                            </li>
                })}
            </ul>
        </div>
    )
}

export default Question