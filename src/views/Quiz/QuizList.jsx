import React, { useEffect, useState } from 'react'
import { deleteQuiz, fetchQuizs, searchQuizs } from '../../services/quizService'
import { useNavigate } from 'react-router-dom'
import { fetchTutos } from '../../services/tutorialService';

function QuizList() {
    const [quizs, setQuizs] = useState([])
    const navigate = useNavigate();
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [response, setResponse] = useState("")
    const [result, setResult] = useState({
        completed: false,
        correct: false,
    })
    const [search, setSearch] = useState('')
    const [tutos, setTutos] = useState([])

    useEffect(() => {
        loadQuizs();
    }, []);

    const loadQuizs = async () => {
        try {
            const data = await fetchQuizs();
            setQuizs(data);

            const tutosResponse = await fetchTutos();
            setTutos(tutosResponse)
        } catch (error) {
            console.error("Error fetching quizs:", error);
        }
    };

    const handleCreate = () => {
        navigate("/quiz/add")
    }

    const handleDelete = (id) => {
        deleteQuiz(id)
            .then(() => {
                loadQuizs();
            })
    }

    const handleResponse = (e) => {
        setResponse(e.target.value)
    }

    const checkResponse = () => {
        if (response === selectedQuiz.reponse) {
            setResult({
                completed: true,
                correct: true,
            })
        } else {
            setResult({
                completed: true,
                correct: false,
            })
        }
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleNewSearch = async (e) => {
        e.preventDefault();
        try {
            const data = await searchQuizs(search);
            setQuizs(data);
        } catch (error) {
            console.error("Error fetching quizs:", error);
        }
    }

    return (
        <div className="container mt-4">
            <div className='d-flex justify-content-between mt-5 mb-5'>
                <h1 className='ps-5'>Quiz List</h1>
                <button className="me-5 w-25 btn btn-success mb-3" onClick={handleCreate}>Add Quiz</button>
            </div>


            <form className='row mb-3'>
                <input
                    id='search'
                    type="text"
                    name="search"
                    value={search}
                    onChange={handleSearch}
                    placeholder='Search by Title'
                    required
                    className="offset-1 form-control w-50"
                />
                <button className='btn btn-success offset-2 col-2' onClick={(e) => handleNewSearch(e)}>Search</button>
            </form>
            <table className="table table-hover table-bordered">
                <thead className="table-success text-center">
                    <tr>
                        <th>Question</th>
                        <th>Information</th>
                        <th>Take Quiz</th>
                        <th>Delete Quiz</th>
                    </tr>
                </thead>
                <tbody>
                    {quizs.length !== 0 && quizs.map((quiz, index) => (
                        <tr key={index}>
                            <td className='text-center align-middle'>{quiz.question.value}</td>
                            <td className='text-center'>
                                <button
                                    className="btn btn-info"
                                    data-bs-toggle="modal"
                                    data-bs-target="#viewInformation"
                                    onClick={() => {
                                        setSelectedQuiz(quiz);
                                        setResult({
                                            completed: false,
                                            correct: false,
                                        });
                                        setResponse('')
                                    }}
                                >
                                    View Information
                                </button>
                                <div className="modal fade" id="viewInformation" tabIndex="-1" role="dialog" aria-labelledby="viewInformationLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="viewInformationLabel">View Information</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            {selectedQuiz &&
                                                <div className="modal-body">
                                                    <p><strong>Question:</strong> {selectedQuiz.question.value}</p>
                                                    <p><strong>Reponse:</strong> {selectedQuiz.answer.value}</p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className='text-center'>
                                <button
                                    className="btn btn-success"
                                    data-bs-toggle="modal"
                                    data-bs-target="#startQuiz"
                                    onClick={() => {
                                        setSelectedQuiz(quiz);
                                        setResult({
                                            completed: false,
                                            correct: false,
                                        });
                                        setResponse('')
                                    }}
                                >
                                    Take Quiz
                                </button>
                                <div className="modal fade" id="startQuiz" tabIndex="-1" aria-labelledby="startQuizLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="startQuizLabel">Take Quiz</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            {selectedQuiz &&
                                                <div className="modal-body">
                                                    <p><strong>Question:</strong> {selectedQuiz.question.value}</p>
                                                    <input
                                                        type="text"
                                                        name="response"
                                                        value={response}
                                                        onChange={handleResponse}
                                                        placeholder='Enter Your Response'
                                                        required
                                                        className="form-control"
                                                    />
                                                    <div className={!result.completed && "d-none"}>
                                                        {result.correct ?
                                                            <p className='text-success mt-3 mb-0'>You are Correct</p> :
                                                            <p className='text-danger mt-3 mb-0'>You are Wrong</p>
                                                        }
                                                        <p className={result.correct ? "text-success" : "text-danger"}><strong>Reponse:</strong> {selectedQuiz.answer.value}</p>
                                                    </div>
                                                </div>
                                            }
                                            <div className="modal-footer">
                                                <button type="button" onClick={checkResponse} className="btn btn-success">Answer</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className='text-center'>
                                <button className="btn btn-danger" onClick={() => handleDelete(quiz.quiz.value)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default QuizList