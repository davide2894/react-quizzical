Ok so these are the requirements from https://scrimba.com/learn/learnreact/react-section-4-solo-project-co24f49bea8aace7c174082c8

## Requirements:
[] Two screens
    [] start
    [] questions
[] start screen
    [] if user clicks start button
        [] switch to questions screenx\
            [] how do you use react router to switch pages?
                [] look into react router and see how to use it
                [] use react router to switch from one page to another
[] questions screen
    [] pull 5 random questions from OTBD API
    [] when an answer is clicked
        [] if correct
            [] style it as correct (see graphics)
            [] update the score at the bottom
        [] if wrong
            [] style it as wrong (see graphics)
            [] update the score at the bottom
    [] click on Play Again button
        [] reset the app to its initial state
            [] so clean all states
            [] use Router to switch back to start screen/page


## TODO
### [x] crea componente home
### [x] install react router
        [x] agg title
        [x] agg desc
        [x] agg btn
        [x] click btn -> link to quiz component
        [x] stila
### [x] crea componente quiz
### [x] start screen
        [x] if user clicks start button
            [x] switch to questions screen
                [x] how do you use react router to switch pages?
                    [x] look into react router and see how to use it
                    [x] use react router to switch from one page to another
                [x] implement logic by using React Router
### [] questions screen
        [] API
            [] get info on what's the API call to make to pull 5 random questions from OTBD API
            https://opentdb.com/api.php?amount=5
            [] fetch 5 random questions from the API
            [] render 5 question component for each question pulled, showing all possible answers
            [] question component
                [] when an answer is clicked
                    [] style it to mark it as answered
                    [] handleAnswerClick    
                        [] send answer click to Home.jsx
                        [] question state: mark it as answered
                        [] if there is no question with state "answered: false"     
                            [] display "Show Answers" CTA
                                [] click on "Show Answers" CTA
                                    [] if correct
                                        [] update state
                                        [] style it as correct (see graphics)
                                        [] update the score at the bottom
                                    [] if wrong
                                        [] style it as wrong (see graphics)
                                        [] update the score at the bottom
                                    [] show bottom area
                                        [] show recap text
                                        [] show Play Again button
                                            [] click on Play Again button
                                                [] reset the app to its initial state
                                                    [] so clean all states
                                                    [] use Router to switch back to start screen/page