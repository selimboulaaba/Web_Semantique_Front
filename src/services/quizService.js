import axios from 'axios';

const API_URL = 'http://localhost:9090/quiz';

const fetchQuizs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const addQuiz = async (eventData) => {
  const response = await axios.post(API_URL, eventData);
  return response.data;
};

const deleteQuiz = async (URI) => {
  await axios.delete(API_URL, {
    params: { URI }
  });
};

const searchQuizs = async (search) => {
  const response = await axios.get(`${API_URL}${search ? '/' + search : ''}`);
  return response.data;
};

const fetchQuizsByTuto = async (URI) => {
  return await axios.get(`${API_URL}/tuto?URI=${encodeURIComponent(URI)}`);
}

export { fetchQuizs, addQuiz, deleteQuiz, searchQuizs, fetchQuizsByTuto };
