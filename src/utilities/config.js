const myKey = process.env.REACT_APP_API_KEY;

export const YT_HOMEPAGE =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=30&regionCode=IN&key=" +
  myKey;

export const YT_CATEGORIES =
  "https://youtube.googleapis.com/youtube/v3/videoCategories?hl=en&regionCode=IN&key=" +
  myKey;

/* export const YT_CHANNEL =
  "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UCZSNzBgFub_WWil6TOTYwAg&key=" +
  myKey; */
