import { useState } from "react";
import PropTypes from "prop-types";
import Results from "./Results";

function QuestionForm ({ data, setFormDefaultState, defaultFormState }) {
    const { firstName, category, difficulty, triviaData } = data;

    const [ questionIndex, setQuestionIndex ] = useState(0)
    const [ answer, setAnswer ] = useState("")
    const [ correctAnswer, setCorrectAnswer ] = useState("")
    const [ correct, setCorrect ] = useState(false)
    const [ incorrect, setIncorrect ] = useState(false)
    const [ score, setScore ] = useState(0)
    const [ gameOver, setGameOver ] = useState(false)

    // RENDER QUIZ ITEM COMPONENT
    const renderQuestion = (currentQuestion) => {
        if (!currentQuestion) {
            setGameOver(true)
            resetState()
            return
        }

        let answerOptions = []
        let answerArray = []

        let quizQuestion = convertEntities(currentQuestion.question)
        answerOptions.push(
            <h3 className="quiz-question">{quizQuestion}</h3>
        )

        answerArray = currentQuestion.incorrect_answers
        let currentCorrectAnswer = currentQuestion.correct_answer

        if (currentCorrectAnswer !== correctAnswer) {
            setCorrectAnswer(currentCorrectAnswer)
        }

        if (answerArray.length < 4) {
            answerArray.push(currentCorrectAnswer)
        }

        // The answers as a radio button group with labels - these must be looped through 
        // and displayed, not pulled individually
        for (let i = 0; i < answerArray.length; i++) {
            answerOptions.push(
                <div key={i} className="question-choices">
                    <input type="radio" id={i} name="answer_option" value={answerArray[i]} onChange={handleAnswer} checked={answer === answerArray[i]} />
                    <label htmlFor={i}>{convertEntities(answerArray[i])}</label>
                </div>
            )
        }

        return answerOptions
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!answer) {
            // * An error message, stopping the form submit, if an answer isn't chosen.  
            if (!answer) {
                alert("Please select an answer to the question")
                return; // If no answer given, exit
            }
        } else if (answer === correctAnswer) {
            setScore(score + (Math.round(Math.random() * 10) * 100))
            setCorrect(true)
        } else {
            setIncorrect(true)
        }
    }

    const getNextQuestion = () => {
        setQuestionIndex(questionIndex + 1)
        setAnswer("")
        setCorrectAnswer("")
        setCorrect(false)
        setIncorrect(false)
    }

    const resetState = () => {
        setQuestionIndex(0)
        setAnswer("")
        setCorrectAnswer("")
        setCorrect(false)
        setIncorrect(false)
    }

    // HELPER FUNCTIONS
    function convertEntities(str) {
        return String(str)
            .replaceAll('&amp;', '&')
            .replaceAll('&lt;', '<')
            .replaceAll('&gt;', '>')
            .replaceAll('&quot;', '"')
            .replaceAll('&#039;', "'")
            .replaceAll('&#039', "'")
            .replaceAll('&rsquo;', "'")
    }

    const handleAnswer = (e) => {
        setAnswer(e.target.value)
    }
    
    // COMPONENT RENDERING
    return (
        <>
            { !gameOver &&
                <div>
                    <div className="selection-text">
                        <h3>You selected the {category} category with a {difficulty[0].toUpperCase() + difficulty.slice(1)} level of difficulty</h3>
                    </div>
                    <div className="quiz-display">
                        <div className="question-display">
                            <h2>Question #{questionIndex + 1} of 10</h2>
                            <h2>Your Score: {score}</h2>
                            {renderQuestion(triviaData[questionIndex])}
                        </div>
                        <Results
                            correct={correct}
                            incorrect={incorrect}
                            correctAnswer={correctAnswer}
                            handleSubmit={handleSubmit}
                            getNext={getNextQuestion}
                        />
                    </div>
                </div>
            }
            { gameOver && 
                <div className="quiz-end-display">
                    <h3>Game Over!</h3>
                    <h2>{firstName}, Your Final Score Is {score}</h2>
                    <h3>Thank you for playing!</h3>
                    <div className="reset-section">
                        <h4>Get a new set of questions by clicking the Reset button</h4>
                        <button id="reset-button" onClick={() => setFormDefaultState(defaultFormState)}>Reset the Game</button>
                    </div>
                </div>
            }
        </>
    )
}

export default QuestionForm;

QuestionForm.propTypes = {
    data: PropTypes.object,
    setFormDefaultState: PropTypes.func,
    defaultFormState: PropTypes.string,
}
