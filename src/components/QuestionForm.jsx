import { useEffect, useState } from "react";
import Results from "./Results";

function QuestionForm (formData) {
    console.log("formData: ", formData)
    const { firstName, category, difficulty, triviaData } = formData.data;

    const [ questionIndex, setQuestionIndex ] = useState(0)
    const [ answer, setAnswer ] = useState("")
    const [ correctAnswer, setCorrectAnswer ] = useState("")
    const [ correct, setCorrect ] = useState(false)
    const [ incorrect, setIncorrect ] = useState(false)
    const [ score, setScore ] = useState(0)
    const [ gameOver, setGameOver ] = useState(false)

    //USE EFFECT to prevent too many re-renders
    useEffect(() => {
        setGameOver(false)
        // resetState()
    }, [gameOver])

    // RENDER QUIZ ITEM COMPONENT
    const renderQuestion = (currentQuestion) => {
        console.log("index/questionObject", questionIndex, currentQuestion)
        if (!currentQuestion) {
            setGameOver(true)
            resetState()
            return 
        }

        let answerOptions = []
        let answerArray = []

        let quizQuestion = convertEntities(currentQuestion.question)
        answerOptions.push(
            <h2>{quizQuestion}</h2>
        )

        answerArray = currentQuestion.incorrect_answers
        let currentCorrectAnswer = currentQuestion.correct_answer
        if (currentCorrectAnswer !== correctAnswer) {
            setCorrectAnswer(currentCorrectAnswer)
        }

        if (answerArray.length < 4) {
            answerArray.push(currentCorrectAnswer)
        }

        for (let i = 0; i < answerArray.length; i++) {
            answerOptions.push(
                <div key={i}>
                    <input type="radio" id={i} name="answer_option" value={answerArray[i]} onChange={handleAnswer} checked={answer === answerArray[i]} />
                    <label htmlFor={i}>{convertEntities(answerArray[i])}</label>
                </div>
            )
        }

        return answerOptions
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (answer === correctAnswer) {
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
        document.querySelector(".form-toggle").style.display = "block";
        document.querySelector(".quiz-display").style.display = "none";
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
                <br />
                <h3> *********** </h3>
                <h3>You selected the {category} category with a {difficulty[0].toUpperCase() + difficulty.slice(1)} level of difficulty</h3>
                <h3>Good Luck {firstName}!</h3>
                <h3> *********** </h3>

                    <div className="quiz-display">
                        <div className="multiple-choice">
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
                    <h3>End of Game</h3>
                    <h2>{firstName}, your final score was {score}</h2>
                    <h3>Thank you for playing!</h3>
                    <h4>Get a new set of questions by submitting the form again</h4>
                </div>
            }
        </>
    )
}

export default QuestionForm;

// QUESTION FORM COMPONENT
// When the user submits the form to get the question, another form should appear with the following:
// * The question - the type will always be multiple choice
// * The answers as a radio button group with labels 
//    => these must be looped through and displayed, not pulled individually

// * A submit button
// * A conditional render that will show a message if the API call 
// encounters an error
// * An error message, stopping the form submit, if an answer isn't chosen.  
