import axios from 'axios';

const API_URL = 'http://localhost:9090/review';

const fetchReviews = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const addReview = async (eventData) => {
  const response = await axios.post(API_URL, eventData);
  return response.data;
};

const deleteReview = async (uri) => {
  await axios.delete(API_URL, { params: { URI: uri } });
};

const addReviewToBlog = async (reviewURI, blogURI) => {
  await axios.put(`${API_URL}?reviewURI=${encodeURIComponent(reviewURI)}&blogURI=${encodeURIComponent(blogURI)}`);
};
export { fetchReviews, addReview, deleteReview  , addReviewToBlog };