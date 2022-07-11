import { decode } from "html-entities";

function Question(props) {

    const { questionData } = props;

    return (
        <div className="question"> 
            <h3>{decode(questionData.question)}</h3>
            <ul>
                {questionData.}
            </ul>
        </div>
    )
}

export default Question