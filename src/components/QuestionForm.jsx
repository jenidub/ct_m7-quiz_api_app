// import { useState } from "react";

function QuestionForm () {
    return (
        <div>
            <h3>Question Display Component</h3>
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
