import React, { useEffect, useState } from 'react'
import { addQuiz } from '../../services/quizService'
import { useNavigate } from 'react-router-dom'

function AddQuiz() {

  const [quiz, setQuiz] = useState({
    question: "",
    answer: ""
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz({
      ...quiz,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addQuiz(quiz)
    .then(response => {
      navigate("/quiz")
    })
  }

  return (
    <div className="container mt-4">
      <div className='d-flex justify-content-between mt-5 mb-5'>
        <h1 className='ps-5'>Add Quiz</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor='question' className="col-2 col-form-label">Question</label>
          <div className="col-10">
            <input
              id='question'
              type="text"
              name="question"
              value={quiz.question}
              onChange={handleChange}
              placeholder='Enter Question'
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor='answer' className="col-2 col-form-label">Reponse</label>
          <div className='col-10'>
            <input
              id='answer'
              type="text"
              name="answer"
              value={quiz.answer}
              onChange={handleChange}
              placeholder='Enter Response'
              required
              className="form-control"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">Add Quiz</button>
      </form>
    </div>
  )
}

export default AddQuiz