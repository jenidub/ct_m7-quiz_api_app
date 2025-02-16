import { useState, useEffect } from 'react';
import QuestionForm from './components/QuestionForm';
import './App.css';

// CONSTANTS
const TRIVIA_CATEGORY_MAP = {
  "General": 9,
  "Television": 14,
  "Music": 12,
  "Computers": 18,
  "Math": 19,
}

const DEFAULT_API_URL = "https://opentdb.com/api.php?amount=10&type=multiple"

function App() {
  // STATE VARIABLES and METHODS
  const [ formData, setFormData ] = useState({
    firstName: "",
    category: "",
    difficulty: "",
    triviaData: [],
  });

  // API RELATED FUNCTIONS
  const getApiData = async function() {
    try {
      const response = await fetch(`${DEFAULT_API_URL}&category=${TRIVIA_CATEGORY_MAP[formData.category]}&difficulty=${formData.difficulty}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const triviaDataResults = await response.json();
      setFormData(prevData => ({
        ...prevData,
        triviaData: triviaDataResults.results,
      }))
      
      document.querySelector(".form-toggle").style.display = "none";
    } catch (e) {
      console.log("error code: ", e);
    }
  }

  // STATE HANDLER FUNCTIONS
  const handleNameEntry = (e) => {
      setFormData(prevFormData => ({
        ...prevFormData,
        firstName: e.target.value
      }))
  }

  const handleCategory = (e) => {
      setFormData(prevFormData => ({
        ...prevFormData,
        category: e.target.value
      }))
  }

  const handleDifficulty = (e) => {
      setFormData(prevFormData => ({
        ...prevFormData,
        difficulty: e.target.value
      }))
  }

  // SUBMIT FORM FUNCTIONS
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (document.querySelector(".quiz-end-display")) {
      document.querySelector(".quiz-end-display").style.display = "none";
    }

    // Form Validation
    if (!validateForm()) {
      alert("Please make sure you fill out all fields below")
      return; // If validation fails, exit
    }

    await getApiData(formData)
  }

  const validateForm = () => {
    return formData.firstName && formData.category && formData.difficulty;
  }

  // COMPONENT RENDERING
	useEffect(() => {
		if (formData.triviaData) {
      setFormData(prevFormData => ({
        ...prevFormData,
        triviaData: formData.triviaData
      }))
		}
	}, [formData.triviaData]);

  return (
    <>
      {/* Welcome message | Title of the Page | Instructions */}
      {/* => Figure out a way to give the user instructions so they know exactly what to do */}
      <h1>The Ultimate Trivia Quiz App</h1>
      <h2>Brought to you by the JeniDub Team</h2>
      <p>Powered by the <a href="https://opentdb.com/">Open Trivia Database API</a></p>

      {/* Form Section */}
      <div>
        <form className='form-toggle'>
          {/* // A text box and label for the user's first name */}
          <div>
            <label htmlFor="firstName">Welcome! What&apos;s your name? </label>
            <input type="text" id="firstName" placeholder="* Required" onChange={handleNameEntry}></input>
          </div>

          {/* A dropdown and label for the question category - the user must have at least 4 choices that the API supports */}
          <div>
            <label htmlFor="category">What question category would you like to see?</label>
            <select id="category" name="category" value={formData.category} onChange={handleCategory}>
              <option value="">Select an option</option>
              <option value="General">General</option>
              <option value="Television">TV</option>
              <option value="Music">Music</option>
              <option value="Computers">Computers</option>
              <option value="Math">Math</option>
            </select>            
          </div>

          {/* A dropdown and label for the question difficulty - use all three choices the API supports */}
          <div>
            <label htmlFor="difficulty">What level of difficulty would you like?</label>
            <select id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleDifficulty}>
              <option value="">Select an option</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>    
          </div>

          {/* // A submit button
            // An error message, stopping the form submit, if any of these inputs aren't filled out or selected. 
            // => They are all required.
          */}
          <button type="submit" onClick={handleSubmit}>Submit Request</button>
        </form>
      </div>

      <div>
        {formData.triviaData.length > 0 && <QuestionForm data={formData} />}
      </div>

      <div>
        <hr />
        <footer>
          <p>Created by JeniDub</p>
        </footer>
      </div>
      
    </>
  )
}

export default App
