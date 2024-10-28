import axios from 'axios';

const API_URL = 'http://localhost:9090/blog';

const fetchBlogs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const addBlog = async (eventData) => {
  const response = await axios.post(API_URL, eventData);
  return response.data;
};

const deleteBlog = async (uri) => {
  await axios.delete(API_URL, { params: { URI: uri } });
};

const fetchReviewsByBlog = async (blogURI) => {
  return await axios.get(`${API_URL}/reviews?URI=${encodeURIComponent(blogURI)}`);
};


export { fetchBlogs, addBlog, deleteBlog , fetchReviewsByBlog };