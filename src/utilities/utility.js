import { decode } from "html-entities";
import { nanoid } from "nanoid";

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

export function mapQuestionsFromApi(questionsData) {
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
            showAnswer: false,
            id: nanoid()
        })
    })

    return mappedQuestions;
}