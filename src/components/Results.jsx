import PropTypes from "prop-types";

function Results (props) {
    let { correct, incorrect, correctAnswer, handleSubmit, getNext } = props
    
    return (
        <div>
            <div>
                {(!correct && !incorrect) && <button type="submit" onClick={handleSubmit}>Submit Answer</button>}
                {(correct || incorrect) && 
                    <button type="submit" onClick={getNext}>Next Question</button>
                }
            </div>
            <div>
                {correct && <h3 className="correct-text">You got the answer correct! Nice job</h3>}
                {incorrect && <h3 className="incorrect-text">Sorry you got the answer wrong! The correct answer is {correctAnswer}.</h3>}
            </div>
        </div>
    )
}

export default Results;

Results.propTypes = {
    correct: PropTypes.bool,
    incorrect: PropTypes.bool, 
    correctAnswer: PropTypes.string, 
    handleSubmit: PropTypes.func, 
    getNext: PropTypes.func,
}
