const myKey = process.env.REACT_APP_API_KEY;

export const YT_HOMEPAGE =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=30&regionCode=IN&key=" +
  myKey;

export const YT_CATEGORIES =
  "https://youtube.googleapis.com/youtube/v3/videoCategories?hl=en&regionCode=IN&key=" +
  myKey;

export const YT_FILTER_DATA = [
  { title: "Music", id: "ox1" },
  { title: "Sports", id: "ox2" },
  { title: "Gaming", id: "ox3" },
  { title: "Entertainment", id: "ox4" },
  { title: "Comedy", id: "ox5" },
  { title: "News", id: "ox6" },
  { title: "Anime", id: "ox7" },
  { title: "News", id: "ox8" },
  { title: "Classic", id: "ox9" },
  { title: "Documentary", id: "ox10" },
  { title: "Thriller", id: "ox11" },
  { title: "Science", id: "ox12" },
  { title: "Horror", id: "ox13" },
  { title: "Sci-Fi", id: "ox14" },
  { title: "Vlogging", id: "ox15" },
  { title: "Fantasy", id: "ox16" },
  { title: "Adventure", id: "ox17" },
  { title: "Movies", id: "ox18" },
  { title: "Action", id: "ox19" },
  { title: "Education", id: "ox20" },
];
