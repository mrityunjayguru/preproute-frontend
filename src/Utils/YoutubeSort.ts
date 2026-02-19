const API_KEY = "AIzaSyCKz-8HDvqIlDlAeN9C2GNMVTfH5_ygFJw";
const CHANNEL_ID = "UCVggB-6tzozUdHAJqzWsQBQ";

export const fetchYouTubeVideos=async()=> {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`
  );
  const data = await response.json();
  return data.items; // array of videos
}
