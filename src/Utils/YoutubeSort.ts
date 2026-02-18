const API_KEY = "AIzaSyCuA3cCx6lJiEDIQQFS1N-ZYYqWE-whff8";
const CHANNEL_ID = "UCOWVNgOPuluzdSYjO-BXgYQ";

export const fetchYouTubeVideos=async()=> {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`
  );
  const data = await response.json();
  return data.items; // array of videos
}
