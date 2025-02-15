import { useState, useEffect } from "react";

function QuestionForm (formData) {
    const [ answer, setAnswer ] = useState("")
    const [ correctAnswer, setCorrectAnswer ] = useState("")
    
    const { firstName, category, difficulty, triviaData } = formData.data;

    //USE EFFECT to prevent too many re-renders
    useEffect(() => {
        if (answer || correctAnswer) {
            setAnswer(setAnswer)
            setCorrectAnswer(correctAnswer)
        }
    }, [answer, correctAnswer]);

    // RENDER QUIZ ITEM COMPONENT
    const renderQuestion = (currentQuestion) => {
        let answerOptions = []

        // console.log("question pre-replace: ", currentQuestion.question)
        let quizQuestion = convertEntities(currentQuestion.question)
        // console.log("question after replace: ", quizQuestion)
        answerOptions.push(
            <h2>{quizQuestion}</h2>
        )

        let answerArray = currentQuestion.incorrect_answers
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
                    <input type="radio" id={i} name="answer_option" value={answerArray[i]} onChange={handleAnswer}/>
                    <label htmlFor={i}>{convertEntities(answerArray[i])}</label>
                </div>
            )
        }

        return answerOptions
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
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("User Answer, correctAnswer: ", answer, correctAnswer)
    }

    // COMPONENT RENDERING
    return (
        <div>
            <br />
            <hr />
            <br />
            <h3> *********** </h3>
            <h3>You selected the {category} category with a {difficulty[0].toUpperCase() + difficulty.slice(1)} level of difficulty</h3>
            <h3>Good Luck {firstName}!</h3>
            <h3> *********** </h3>
            <div>
                <div>
                    <div className="multiple-choice">
                        {renderQuestion(triviaData[0])}
                    </div>
                    <div>
                        <button type="submit" onClick={handleSubmit}>Submit Answer</button>
                        <button type="submit" disabled>Next Question</button>
                    </div>
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
