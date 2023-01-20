import "./Question.scss";

function Question(props) {

    const { questionProp, showResultProp, disabledProp } = props;

    function assignAnswerClass(isCorrectChoice) {
        return isCorrectChoice ? "choice__selected--correct" : "choice__selected--wrong";
    }

    const disabledQuestionClassName = `${disabledProp ? " question--disabled" : ""}`;
    const showResultInQuestion = `${showResultProp ? " question--showResults" : ""}`;
    const questionClassNames = `question${disabledQuestionClassName}${showResultInQuestion}`; 

    return (
        <div className={questionClassNames + " " + props.idxClass}>
            <h2 className="question__text">{questionProp && questionProp.question}</h2>
            <ul className="question__choices choices">
                {questionProp && questionProp.choices.map((choice, idx) => {
                    return <li className={
                                `choice
                                ${choice.isCorrectChoice ? "choice--correct" : ""} 
                                ${choice.selected ? "choice__selected" : ""}
                                ${(showResultProp & choice.selected) ? assignAnswerClass(choice.isCorrectChoice) : ""}
                                ${showResultProp & choice.selected ? "choice__reveal" : ""}
                                ${idx}
                               `} 
                               key={idx}
                               onClick={(evt) => props.onClickHandler(evt, questionProp.id, choice)}
                            >{choice.choice}
                            </li>
                })}
            </ul>
            <hr className="question__hr"></hr>
        </div>
    )
}

export default Question