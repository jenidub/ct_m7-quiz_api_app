// import { useState, useEffect } from "react";

function Results (props) {
    // console.log(props)
    let { correct, incorrect, correctAnswer, handleSubmit, getNext } = props
    
    return (
        <div>
            <div>
                {(!props.correct && !props.incorrect) && <button type="submit" onClick={props.handleSubmit}>Submit Answer</button>}
                {(props.correct || props.incorrect) && 
                    <button type="submit" onClick={props.getNext}>Next Question</button>
                }
            </div>
            <div>
                {props.correct && <h3 style={{color: "green"}}>You got the answer correct! Nice job</h3>}
                {props.incorrect && <h3 style={{color: "red"}}>Sorry you got the answer wrong! The correct answer is {props.correctAnswer}.</h3>}
            </div>
        </div>
    )
}

export default Results;

// RESULTS COMPONENT
// When the user submits their answer, another section should appear 
// with the following:
// * A message containing the user's name, telling them whether they answered 
// the question wrong or right
// * A message telling them the correct answer if they answered incorrectly
// * A button that will allow them to start over and get another question
