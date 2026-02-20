const API_KEY = "AIzaSyCK2nchWZvUJvBwCNOVw10BO1GVxpSTuBI";
const CHANNEL_ID = "UCVggB-6tzozUdHAJqzWsQBQ";

export const fetchYouTubeVideos=async()=> {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`
  );
  const data = await response.json();
  console.log(data,"datadata")
  return data.items; // array of videos
}
