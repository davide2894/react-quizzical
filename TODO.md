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
[] install react router
[] crea componente home
    [] agg title
    [] agg desc
    [] agg btn
    [] click btn -> link to quiz component
[] crea componente quiz
[] start screen
    [] if user clicks start button
        [] switch to questions screen
            [] how do you use react router to switch pages?
                [] look into react router and see how to use it
                [] use react router to switch from one page to another
            [] implement logic by using React Router
[] questions screen
    [] API
        [] get info on what's the API call to make to pull 5 random questions from OTBD API
        [] fetch 5 random questions from the API
        [] render a question component for each question pulled, showing all possible answers
    [] question component
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