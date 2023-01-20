import { shuffleArray } from "./shuffleArray";
import { nanoid } from "nanoid";
import { getDecodeStringFacade } from "./getDecodeString";

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

export function mapQuestionsFromApi(questionsData) {
    const questionsFromApi = questionsData.results;
    const mappedQuestions = [];

    questionsFromApi.forEach(questionFromApi => {      
        const decodedQuestion = getDecodeStringFacade(questionFromApi.question);
        const decodedIncorrectAnswers = questionFromApi.incorrect_answers.map(incorrectAnswer => {
            return getDecodeStringFacade(incorrectAnswer);
        })

        const decodedCorrectAnswer = questionFromApi.correct_answer = getDecodeStringFacade(questionFromApi.correct_answer);
        mappedQuestions.push({
            question: decodedQuestion,
            choices: prepareChoices(decodedIncorrectAnswers, decodedCorrectAnswer),
            isAnswered: false,
            isAnsweredCorrectly: false,
            showAnswer: false,
            id: nanoid()
        })
    })

    return mappedQuestions;
}