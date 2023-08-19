const apiKey = process.env.REACT_APP_API_KEY;
const useFetch = async (
  options,
  baseURL = "https://youtube.googleapis.com/youtube/v3"
) => {
  const response = await fetch(`${baseURL}/${options}&key=${apiKey}`);
  const data = await response.json();
  return data;
};

export default useFetch;

/* import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: {
    maxResults: "50",
  },
  headers: {
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}

export const fetchAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};
 */
