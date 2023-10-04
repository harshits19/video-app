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