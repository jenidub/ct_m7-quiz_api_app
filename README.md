
# The Ultimate Trivia App by the JeniDub Team

## Overview

This React-based trivia game created as part of Module 7 at Coding Temple fetches quiz questions from the Open Trivia Database API. Players can select a category and difficulty level before answering multiple-choice questions to get the highest score possible.

## Features

-   Fetches quiz questions dynamically via API
-   Allows players to select a category and difficulty level
-   Tracks user score and displays correct/incorrect answers
-   Provides a reset option to start a new game
    
## Gameplay

1.  Enter your name.
2.  Select a category and difficulty level.
3.  Click "Submit Request" to start the game.
4.  Answer the multiple-choice questions.
5.  View your score at the end of the game and reset if desired.

## Components

### `App.jsx`

-   Handles state management and API requests.
-   Renders the form for user input.

### `QuestionForm.jsx`

-   Displays quiz questions and answer options.
-   Tracks the user's progress and score.

### `Results.jsx`

-   Displays feedback on whether the user's answer was correct or incorrect.
-   Shows the correct answer if the user gets it wrong.

## API Information

-   The game fetches questions from: `https://opentdb.com/api.php?amount=10&type=multiple`
-   Categories are mapped as follows:
    -   General: 9
    -   Television: 14
    -   Music: 12
    -   Computers: 18
    -   Math: 19

## Future Enhancements

-   Add a timer for each question.
-   Implement a leaderboard for high scores.
-   Enhance UI with animations and better styling.

## License

This project is licensed under the MIT License. The README file was created using ChatGPT with edits made for accuracy and readability.
