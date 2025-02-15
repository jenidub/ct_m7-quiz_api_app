import { useState, useEffect } from "react";

function QuestionForm (formData) {
    const { firstName, category, difficulty, triviaData } = formData.data;

    const [ questionIndex, setQuestionIndex ] = useState(0)
    const [ answer, setAnswer ] = useState("")
    const [ correctAnswer, setCorrectAnswer ] = useState("")
    const [ correct, setCorrect ] = useState(false)
    const [ incorrect, setIncorrect ] = useState(false)

    //USE EFFECT to prevent too many re-renders
    useEffect(() => {
        if (answer || correctAnswer) {
            setAnswer(setAnswer)
            setCorrectAnswer(correctAnswer)
        } else if (questionIndex) {
            // setAnswer("")
            // setCorrectAnswer("")
            // setCorrect(false)
            // setIncorrect(false)
            setQuestionIndex(questionIndex)
        }
    }, [answer, correctAnswer, questionIndex]);

    // RENDER QUIZ ITEM COMPONENT
    const renderQuestion = (currentQuestion) => {
        console.log("currentQuestion: ", currentQuestion)
        let answerOptions = []
        let answerArray = []

        // console.log("question pre-replace: ", currentQuestion.question)
        let quizQuestion = convertEntities(currentQuestion.question)
        // console.log("question after replace: ", quizQuestion)
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
        <div>
            <br />
            <h3> *********** </h3>
            <h3>You selected the {category} category with a {difficulty[0].toUpperCase() + difficulty.slice(1)} level of difficulty</h3>
            <h3>Good Luck {firstName}!</h3>
            <h3> *********** </h3>
            <div>
                <div className="multiple-choice">
                    <h2>Question #{questionIndex + 1} of 10</h2>
                    {renderQuestion(triviaData[questionIndex])}
                </div>
                <div>
                    {(!correct && !incorrect) && <button type="submit" onClick={handleSubmit}>Submit Answer</button>}
                    {(correct || incorrect) && 
                        <button type="submit" onClick={getNextQuestion}>Next Question</button>
                    }
                </div>
                <div>
                    {correct && <h3 style={{color: "green"}}>You got the answer correct! Nice job</h3>}
                    {incorrect && <h3 style={{color: "red"}}>Sorry you got the answer wrong! The correct answer is {correctAnswer}.</h3>}
                </div>
            </div>
        </div>
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
