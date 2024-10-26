import axios from 'axios';

const API_URL = 'http://localhost:8080/quiz';

const fetchQuizs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const addQuiz = async (eventData) => {
  const response = await axios.post(API_URL, eventData);
  return response.data;
};

const deleteQuiz = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export { fetchQuizs, addQuiz, deleteQuiz };
